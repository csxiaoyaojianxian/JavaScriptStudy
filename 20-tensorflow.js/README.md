<!--
 * @Author: victorsun
 * @Date: 2020-03-16 01:49:12
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 12:14:14
 * @Description: sunjianfeng@csxiaoyao.com
 -->
# tensorflow.js
## 1. 安装
### 1.1 browser
通过cdn引入script标签
### 1.2 node
```
$ npm i @tensorflow/tfjs
$ npm install -g parcel-bundler
$ parcel 01-setup/index2.html
# or
$ parcel 01-setup/*html
```
### 1.3 安装底层为c++的版本
@tensorflow/tfjs => @tensorflow/tfjs-node
```
$ npm i node-gyp
$ npm i @tensorflow/tfjs-node
$ node 01-setup/node.js
```
### 1.4 安装可视化库
```
$ npm i @tensorflow/tfjs-vis -S
```

### 1.5 安装启动静态资源服务器
```
$ npm i http-server -g
# data作为根目录，cors允许跨域
$ hs data --cors
```

## 2. 资料
```
【 api 】
https://js.tensorflow.org/api_vis/latest/#render.scatterplot

【 study 】
https://developers.google.cn/machine-learning/crash-course/

【 playground 】
http://playground.tensorflow.org/

【 卷积神经网络 】
https://setosa.io/ev/image-kernels/
http://cs231n.github.io/convolutional-networks/

```