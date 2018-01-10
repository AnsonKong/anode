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

// 成功
const SUCCESS = 0;
// 尺寸不得大于10000 x 10000
const ERROR_SIZE = 1;
// 不知名错误
const ERROR_UNKNOWN = 2;
class UploadAjaxController extends Controller {
  /** 验证需要裁剪的头像图片的合法性 */
  async validate() {
    let readStream = await this.ctx.getFileStream();
    // 后缀名
    let extname = path.extname(readStream.filename).toLowerCase();
    let code;
    let data;
    let msg;
    let buf;
    try {
      const parts = await toArray(readStream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(readStream);
      code = ERROR_UNKNOWN;
      msg = err.toString();
    }

    if (!code && buf) {
      try {
        const hash = crypto.createHash('md5');
        hash.update(buf);
        // 根据文件内容生成md5 digest文件摘要作为文件名
        const filename = hash.digest('hex') + extname;
        // /public路径
        const publicPath = originFolder + filename;
        let targetFile = path.join(this.config.baseDir, 'app', publicPath);
        if (!fs.existsSync(targetFile) && buf) {
          await fs.writeFileSync(targetFile, buf);
        }
        code = SUCCESS;
        data = publicPath;
      } catch (err) {
        code = ERROR_UNKNOWN;
        msg = err.toString();
      }
    }
    this.ctx.body = { code, msg, data };
  }
  /** 裁剪后的头像上传 */
  async upload() {
    const rb = this.ctx.request.body;
    const avatarUrl = rb.avatarUrl;
    // 后缀名
    const extname = path.extname(avatarUrl).toLowerCase();
    // 是否需要裁剪
    const doCrop = rb.hasOwnProperty('cropW');
    let code;
    let data;
    let msg;
    let buf;
    // 如果不需要裁剪
    if (!doCrop) {
      code = SUCCESS;
      data = avatarUrl;
    } else {
      const baseDir = this.config.baseDir;
      const resizeW = rb.resizeW;
      const resizeH = rb.resizeH;
      const cropX = rb.cropX;
      const cropY = rb.cropY;
      const cropW = rb.cropW;
      const cropH = rb.cropH;
      try{
        buf = await (async function() {
          return new Promise((resolve, reject) => {
            const localUrl = path.join(baseDir, 'app', avatarUrl);
            gm(localUrl)
              .resize(resizeW, resizeH, '!')
              .crop(cropW, cropH, cropX, cropY)
              .toBuffer(function(err, bb) {
                if (err) {
                  reject(err);
                } else {
                  resolve(bb);
                }
              });
          });
        })();
      } catch(err) {
        code = ERROR_UNKNOWN;
        msg = err.toString();
      }

      if (buf) {
        try {
          const hash = crypto.createHash('md5');
          hash.update(buf);
          // 根据文件内容生成md5 digest文件摘要作为文件名
          const filename = hash.digest('hex') + extname;
          // /public路径
          const publicPath = cropFolder + filename;
          let targetFile = path.join(baseDir, 'app', publicPath);
          await fs.writeFileSync(targetFile, buf);
          code = SUCCESS;
          data = publicPath;
        } catch (err) {
          code = ERROR_UNKNOWN;
          msg = err.toString();
        }
      }
    }
    // 写入数据库
    if (data) await this.ctx.model.User.findByIdAndUpdate(this.ctx.user.id, { avatar: data });
    this.ctx.body = { code, msg, data };
  }
}

module.exports = UploadAjaxController;