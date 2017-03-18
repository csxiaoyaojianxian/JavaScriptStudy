/*
* @Author: SUNSHINE
* @Date:   2017-03-18 19:03:26
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-18 19:15:31
*/

'use strict';
// 【canvas ---> dataURL】 (从canvas获取dataURL)
// var dataurl = canvas.toDataURL('image/png');
// var dataurl = canvas.toDataURL('image/jpeg', 0.8);

// 【File/Blob ---> dataURL】
function readBlobAsDataURL(blob, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {callback(e.target.result);};
    reader.readAsDataURL(blob);
}
// readBlobAsDataURL(blob, function (dataurl){
//     console.log(dataurl);
// });
// readBlobAsDataURL(file, function (dataurl){
//     console.log(dataurl);
// });

// 【dataURL ---> Blob】
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
var blob = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==');

// 【dataURL ---> canvas】
// 先构造Image对象，src为dataURL，onload后绘制到canvas
var img = new Image();
img.onload = function(){
    canvas.drawImage(img);
};
img.src = dataurl;

// 【File/Blob ---> canvas】
// 先转换成url，然后构造Image对象，src为dataURL，图片onload后绘制到canvas
// 利用上面的 readBlobAsDataURL 函数，由File,Blob对象得到dataURL格式的url，再参考 dataURL图片数据绘制到canvas
readBlobAsDataURL(file, function (dataurl){
    var img = new Image();
    img.onload = function(){
        canvas.drawImage(img);
    };
    img.src = dataurl;
});

// 【Canvas ---> Blob】Ajax发送
// 先从canvas获取dataurl, 再将dataurl转换为Blob对象
var dataurl = canvas.toDataURL('image/png');
var blob = dataURLtoBlob(dataurl);
// 使用ajax发送
var fd = new FormData();
fd.append("image", blob, "image.png");
var xhr = new XMLHttpRequest();
xhr.open('POST', '/server', true);
xhr.send(fd);