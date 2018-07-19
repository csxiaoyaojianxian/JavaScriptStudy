//弹窗
function TGDialogS(e) {
    need("biz.dialog-min", function (Dialog) {
        Dialog.show({
            id: e,
            bgcolor: '#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity: 50 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}
function closeDialog() {
    need("biz.dialog-min", function (Dialog) {
        Dialog.hide();
    });
}