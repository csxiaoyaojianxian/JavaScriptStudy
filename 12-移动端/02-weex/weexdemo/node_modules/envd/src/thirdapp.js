;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;
    
    if (!!ua.match(/Weibo/i)) {
        /**
         * @type {Object}
         * @memberof lib.env
         * @property {String} appname - 操作系统名称，比如Weibo/Weixin/unknown等
         * @property {Boolean} isWeibo - 是否是微博
         * @property {Boolean} isWeixin - 是否是微信
         */
        lib.env.thirdapp = {
            appname: 'Weibo',
            isWeibo: true
        }
    } else if(!!ua.match(/MicroMessenger/i)) {
        lib.env.thirdapp = {
            appname: 'Weixin',
            isWeixin: true
        }
    } else {
        lib.env.thirdapp = false;
    }
})(window, window['lib'] || (window['lib'] = {}));