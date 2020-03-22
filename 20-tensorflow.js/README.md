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

【 speech model 】
https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

【 converter 】
https://github.com/tensorflow/tfjs/tree/master/tfjs-converter

```

## 3. 模型转换

Python版模型：Tensorflow Saved Model / Keras HDF5 Model

JavaScript版模型：tfjs_layers_model / tfjs_graph_model


【1】安装 Tensorflow.js Converter 先 Conda mini 创建 python 虚拟环境
```
$ conda create -n tfjs python=3.6.8
$ conda active tfjs
$ conda deactive
$ pip install tensorflowjs
```

【2】Python模型 => JavaScript模型
执行转换 /data/mobilenet/keras.h5 从 HDF5 格式 为 tfjs_layers_model / tfjs_graph_model
```
$ tensorflowjs_converter --input_format=keras --output_format=tfjs_layers_model data/mobilenet/keras.h5 data/mobilenet/web_model2
```

【3】JavaScript模型 => Python模型
执行转换 从 tfjs_layers_model 格式转换为 HDF5 格式
```
$ tensorflowjs_converter --input_format=tfjs_layers_model --output_format=keras data/mobilenet/web_model2/model.json data/mobilenet/keras2.h5
```

【4】JavaScript模型 => JavaScript模型 : 分片/量化/加速

1. 分片：单位为 byte，本例为100kb

```
$ tensorflowjs_converter --input_format=tfjs_layers_model --output_format=tfjs_layers_model --weight_shared_size_bytes=100000 data/mobilenet/web_model/model.json data/mobilenet/shared_model/
```
2. 量化：压缩减少权重文件

```
$ tensorflowjs_converter --input_format=tfjs_layers_model --output_format=tfjs_layers_model --quantization_bytes=2 data/mobilenet/web_model/model.json data/mobilenet/quantized_model/
```
3. 加速：输出为 graph_model，执行预测更快

```
$ tensorflowjs_converter --input_format=tfjs_layers_model --output_format=tfjs_graph_model --weight_shared_size_bytes=100000 data/mobilenet/web_model/model.json data/mobilenet/graph_model/
```