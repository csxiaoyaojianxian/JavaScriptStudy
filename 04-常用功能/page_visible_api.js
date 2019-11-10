/**
 * 【 page visible api 】
 * 可以用于控制页面元素，如后台停止音乐播放等
 * - hidden: document存储的页面状态的属性名
 * - visibilityChange: 监听事件名
 */
(function (show, hide) {
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    } else if (typeof document.onfocusin !== "undefined") {
        document.onfocusin = document.onfocusout = onchange;
    } else {
        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
    }
    if (hidden) {
        document.addEventListener(visibilityChange, onchange, false);
    }
    function onchange () {
        console.log("当前页面是否被隐藏：" + document[hidden]);
        if (document[hidden]) {
            pageHide();
        } else {
            pageShow();
        }
    }
})(pageShow, pageHide);

function pageShow () {
    console.log("page is show");
}
function pageHide () {
    console.log("page is hide");
}
