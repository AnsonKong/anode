# ANode
ANode 社区是一款基于[egg.js](https://eggjs.org/)，以CNode 社区为原型进行开发的作品，仅供学习交流。


## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Pre-Installation

安装MongoDB v3.4
1. 创建数据库egg;
2. 创建用户用于远程访问，让其对数据库db拥有readWrite角色；

安装GraphicsMagick用于在服务端对用户上传图片进行裁剪并保存操作。

安装Alinode运行时并设置egg-alinode配置
https://github.com/eggjs/egg-alinode

以下私有配置应当由您自己创建：
1. {app}/config/alinode.js // 记录Alinode的appid以及secret
2. {app}/config/github.prod.passport.js
3. {app}/config/github.local.passport.js
4. {app}/config/db.js // 记录访问MongoDB/egg的username以及password

因ANode默认开启--https=true，所以您需要申请一个数字证书，并把.key和.pem文件存放在服务器某安全处，用于在npm start时加载。

### Development

```bash
$ gulp // uglify js files & minify cs files & revision them for cache control
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ sudo service mongod start // 开启MongoDB
$ npm start // 默认开启--https=true --key=fullPath.key --cert=fullPath.pem 
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org
