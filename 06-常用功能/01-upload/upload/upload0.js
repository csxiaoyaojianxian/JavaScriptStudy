
'use strict';
const express = require('express');

const expressArtTemplate = require('express-art-template');

const app = express();

const formidable = require('formidable');
const router = express.Router();
const path = require('path');


//配置模板引擎
app.engine('html', expressArtTemplate);
//express查找的时候也需要后缀名,
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    extname: '.html', //自动补充后缀名的字符串
});
//告知express使用该引擎
app.set('view engine', 'html');


router.get('/', (req, res, next) => {
     res.render('index');
});
router.post('/upload', (req, res, next) => {
    var form = new formidable.IncomingForm();
    //为了能更好的保存文件在本地服务器目录
    form.uploadDir = path.join(__dirname,'files');
    //解析请求
    form.parse(req, function(err, fields, files) {
        if(err) next(err);
        console.log('上传文件完毕')
    });
})


app.use(router);
// 返回jquery
app.use('/node_modules',express.static('./node_modules'));

//监听端口
app.listen(80, () => {
    console.log('服务器启动了');
})