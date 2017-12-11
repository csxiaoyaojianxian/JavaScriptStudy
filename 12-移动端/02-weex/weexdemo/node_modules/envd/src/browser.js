;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;

    if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
        /**
         * @type {Object}
         * @memberof lib.env
         * @property {String} name - 浏览器名称，比如UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown等
         * @property {lib.env~Version} version - 浏览器版本号
         * @property {Boolean} isUC - 是否是UC浏览器
         * @property {Boolean} isQQ - 是否是QQ浏览器
         * @property {Boolean} isIE - 是否是IE浏览器
         * @property {Boolean} isIEMobile - 是否是IE移动版浏览器
         * @property {Boolean} isIELikeWebkit - 是否是IE兼容了Webkit特性的浏览器
         * @property {Boolean} isChrome - 是否是Chrome浏览器
         * @property {Boolean} isAndroid - 是否是Android的原生浏览器
         * @property {Boolean} isSafari - 是否是Safari浏览器
         * @property {Boolean} isWebview - 是否是iOS下的Webview或Android下Chrome的Webview
         */
        lib.env.browser = {
            name: 'UC',
            isUC: true,
            version: matched[1]
        }
    } else if((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'QQ',
            isQQ: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/Firefox\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Firefox',
            isFirefox: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) || 
                    (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

        lib.env.browser = {
            version: matched[1]
        }

        if (ua.match(/IEMobile/)) {
            lib.env.browser.name = 'IEMobile';
            lib.env.browser.isIEMobile = true;
        } else {
            lib.env.browser.name = 'IE';
            lib.env.browser.isIE = true;
        }

        if (ua.match(/Android|iPhone/)) {
            lib.env.browser.isIELikeWebkit = true;
        }
    } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Chrome',
            isChrome: true,
            version: matched[1]
        }

        if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
            lib.env.browser.name = 'Chrome Webview';
            lib.env.browser.isWebview = true;
        }
    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Android',
            isAndroid: true,
            version: matched[1]
        }
    } else if(ua.match(/iPhone|iPad|iPod/)) {
        if(ua.match(/Safari/)) {
            matched = ua.match(/Version\/([\d\.]+)/)
            lib.env.browser = {
                name: 'Safari',
                isSafari: true,
                version: matched[1]
            }
        } else {
            matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
            lib.env.browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: matched[1].replace(/\_/g, '.')
            }
        }
    } else {
        lib.env.browser = {
            name:'unknown',
            version:'0.0.0'
        }
    }
    
    if (lib.version) {
        lib.env.browser.version = lib.version(lib.env.browser.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));