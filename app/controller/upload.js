'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');
const folder = '/public/avatar/';

class UploadAjaxController extends Controller {
  async upload() {
    const readStream = await this.ctx.getFileStream();
    let buf;
    try {
      // concatenate a readable stream'data into a single array of Buffer 
      const parts = await toArray(readStream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(readStream);
      throw err;
    }
    const hash = crypto.createHash('md5');
    hash.update(buf);
    // 根据文件内容生成md5 digest文件摘要作为文件名
    const filename = hash.digest('hex') + path.extname(readStream.filename).toLowerCase();
    // /public路径
    const publicPath = folder + filename;
    const targetFile = path.join(this.config.baseDir, 'app', publicPath);
    if (!fs.existsSync(targetFile) && buf) {
      await fs.writeFile(targetFile, buf);
    }
    // 写入数据库
    await this.ctx.model.User.findByIdAndUpdate(this.ctx.user.id, { avatar: publicPath });
    this.ctx.body = { url: publicPath };
  }
}

module.exports = UploadAjaxController;
