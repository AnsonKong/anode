'use strict';

const fs = require('fs');
const gm = require('gm');
const path = require('path');
const crypto = require('crypto');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');
const avatarOriginFolder = '/public/avatar/';
const avatarCropFolder = '/public/avatar/crop/';
const topicImgFolder = '/public/topic/img/';
const Stream = require('stream').Stream;
// 成功
const SUCCESS = 0;
// 不知名错误
const ERROR_UNKNOWN = 1;
class UploadAjaxController extends Controller {
  // post /upload/topic/img
  async topicImg() {
    const readStream = await this.ctx.getFileStream();
    const extname = path.extname(readStream.filename).toLowerCase();
    this.ctx.body = await this.validateStream(readStream, topicImgFolder, extname);
  }
  /** 检测文件是否已经存在，不存在则写入并返回路径 */
  async validateStream(source, publicDir, extname) {
    let code = ERROR_UNKNOWN;
    let data;
    let msg;
    let buf;
    let readStream;
    if (source instanceof Stream) {
      readStream = source;
      try {
        const parts = await toArray(readStream);
        buf = Buffer.concat(parts);
      } catch (err) {
        await sendToWormhole(readStream);
        msg = err.toString();
      }
    } else {
      buf = source;
    }

    if (buf) {
      try {
        const hash = crypto.createHash('md5');
        hash.update(buf);
        // 根据文件内容生成md5 digest文件摘要作为文件名
        const filename = hash.digest('hex') + extname;
        let targetFile = path.join(this.config.baseDir, 'app', publicDir, filename);
        if (!fs.existsSync(targetFile)) {
          fs.writeFileSync(targetFile, buf);
        }
        code = SUCCESS;
        data = publicDir + filename;
      } catch (err) {
        msg = err.toString();
      }
    }
    return { code, msg, data };
  }
  /** 验证需要裁剪的头像图片的合法性 */
  // post /upload/avatar/validate
  async avatarValidate() {
    const readStream = await this.ctx.getFileStream();
    const extname = path.extname(readStream.filename).toLowerCase();
    this.ctx.body = await this.validateStream(readStream, avatarOriginFolder, extname);
  }
  /** 裁剪后的头像上传 */
  // post /upload/avatar/upload
  async avatarUpload() {
    const rb = this.ctx.request.body;
    const avatarUrl = rb.avatarUrl;
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
        const result = await this.validateStream(buf, avatarCropFolder, extname);
        code = result.code;
        msg = result.msg;
        data = result.data;
      }
    }
    // 写入数据库
    if (data) await this.ctx.model.User.findByIdAndUpdate(this.ctx.user.id, { avatar: data });
    this.ctx.body = { code, msg, data };
  }
}

module.exports = UploadAjaxController;