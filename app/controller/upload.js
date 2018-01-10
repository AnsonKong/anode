'use strict';

const fs = require('fs');
const gm = require('gm');
const path = require('path');
const crypto = require('crypto');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');
const originFolder = '/public/avatar/';
const cropFolder = '/public/avatar/crop/';

class UploadAjaxController extends Controller {
  async upload() {
    let readStream = await this.ctx.getFileStream();
    // 后缀名
    let extname = path.extname(readStream.filename).toLowerCase();
    // 字段
    let fields = readStream.fields;
    // 是否经过裁剪
    const doCrop = fields.hasOwnProperty('cropW');
    let buf;
    // 如果需要裁剪
    if (doCrop) {
      const resizeW = fields.resizeW;
      const resizeH = fields.resizeH;
      const cropX = fields.cropX;
      const cropY = fields.cropY;
      const cropW = fields.cropW;
      const cropH = fields.cropH;
      try{
        buf = await (async function() {
          return new Promise((resolve, reject) => {
            gm(readStream)
              .resize(resizeW, resizeH, '!')
              .crop(cropW, cropH, cropX, cropY)
              .toBuffer(function(err, bb) {
                if (err) {
                  reject(null);
                } else {
                  resolve(bb);
                }
              });
          });
        })();
      } catch(e) {
        console.log("catch")
      }
    } 

    if (!buf) {
      try {
        // concatenate a readable stream'data into a single array of Buffer 
        const parts = await toArray(readStream);
        buf = Buffer.concat(parts);
      } catch (err) {
        await sendToWormhole(readStream);
        throw err;
      }
    }
    
    const hash = crypto.createHash('md5');
    hash.update(buf);
    // 根据文件内容生成md5 digest文件摘要作为文件名
    const filename = hash.digest('hex') + extname;
    // /public路径
    const publicPath = (doCrop ? cropFolder : originFolder) + filename;
    let targetFile = path.join(this.config.baseDir, 'app', publicPath);
    if (!fs.existsSync(targetFile) && buf) {
      await fs.writeFile(targetFile, buf);
    }
    // 写入数据库
    await this.ctx.model.User.findByIdAndUpdate(this.ctx.user.id, { avatar: publicPath });
    this.ctx.body = { url: publicPath };
  }
}

module.exports = UploadAjaxController;