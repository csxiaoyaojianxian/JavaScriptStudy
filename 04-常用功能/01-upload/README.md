# 上传功能实现整理
## 1. upload
* **upload0.html**
原生和jquery实现
* **upload1.html**
基本单选和多选上传功能的实现
* **upload2.html**
1、支持H5进度显示、文件详情、预览图
2、FormData模拟表单数据
3、如果图片上传前要修改(裁剪/旋转等)，一般是转化为canvas处理，随后把canvas转成base64字符串或blob对象上传
* **图片居中、上传预览.html**
1、水平垂直居中的两种实现：CSS-table & js计算
2、图片的max宽高的两种实现：CSS & js计算
3、判断文件类型
4、文件大小限制
5、预览图的实现的三种方式：
 【file -> base64】、【file -> blob】、【canvas】 
4、FileReader 读取文件常见属性
* **拖拽事件.html**
1、拖拽事件的判断
2、识别文件/文件夹
* **js图片压缩.html**
利用canvas压缩图片
* **download.html**
多文件下载，支持DataURL和Blob

## 2. webuploader-demo

## 3. dropzone-demo