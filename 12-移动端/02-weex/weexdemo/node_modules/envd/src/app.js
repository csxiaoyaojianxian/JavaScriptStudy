//@require version
//@require params
//@require os

;(function(window, lib) {
    lib.env = lib.env || {};
    
    var ua = window.navigator.userAgent;

    var windvane;
    var matched;
    if ((matched = ua.match(/WindVane[\/\s]([\d\.\_]+)/))) {
        windvane = matched[1];
    }

    var aliapp = false;
    var appname = '';
    var platform = '';
    var version = '';
    if ((matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i))) {
        aliapp = true;
        appname = matched[1];
        version = matched[2];
        if (appname.indexOf('-PD') > 0) {
            if (lib.env.os.isIOS) {
                platform = 'iPad';
            } else if (lib.env.os.isAndroid) {
                platform = 'AndroidPad';
            } else {
                platform = lib.env.os.name;
            }
        } else {
            platform = lib.env.os.name;
        }
    }

    // 兼容手淘的一个bug，在webview初始化异常时，在ua中只包含TBIOS字样，也认为是手淘webview。
    if (!appname && ua.indexOf('TBIOS') > 0) {
        appname = 'TB';
    }

    if (aliapp) {
        /**
         * @type {Object}
         * @memberof lib.env
         * @property {lib.env~Version} windavne - windvane的版本
         * @property {String} appname - App的名称，比如TB/TM等
         * @property {lib.env~Version} version - 客户端的版本
         * @property {String} platform - 平台名称，比如iPhone/iPad/Android/AndroidPad等
         */
        lib.env.aliapp = {
            windvane: lib.version(windvane || '0.0.0'),
            appname: appname || 'unkown',
            version: lib.version(version || '0.0.0'),
            platform: platform || lib.env.os.name
        }
    } else {
        lib.env.aliapp = false;
    }

    // 向下兼容老版本
    lib.env.taobaoApp = lib.env.aliapp;

})(window, window['lib'] || (window['lib'] = {}));