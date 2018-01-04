;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;
    
    if ((matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))) {
        /**
         * @type {Object}
         * @memberof lib.env
         * @property {String} name - 操作系统名称，比如Android/AndroidPad/iPhone/iPod/iPad/Windows Phone/unknown等
         * @property {lib.env~Version} version - 操作系统版本号
         * @property {Boolean} isWindowsPhone - 是否是Windows Phone
         * @property {Boolean} isIPhone - 是否是iPhone/iTouch
         * @property {Boolean} isIPad - 是否是iPad
         * @property {Boolean} isIOS - 是否是iOS
         * @property {Boolean} isAndroid - 是否是Android手机
         * @property {Boolean} isAndroidPad - 是否是Android平板
         */
        lib.env.os = {
            name: 'Windows Phone',
            isWindowsPhone: true,
            version: matched[1]
        }
    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        lib.env.os = {
            version: matched[1]
        }

        if ((!!ua.match(/Mobile\s+Safari/))) {
            lib.env.os.name = 'Android';
            lib.env.os.isAndroid = true;
        } else {
            lib.env.os.name = 'AndroidPad';
            lib.env.os.isAndroidPad = true;
        }
    } else if((matched = ua.match(/(iPhone|iPad|iPod)/))) {
        var name = matched[1];

        matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);

        lib.env.os = {
            name: name,
            isIPhone: (name === 'iPhone' || name === 'iPod'),
            isIPad: name === 'iPad',
            isIOS: true,
            version: matched[1].split('_').join('.')
        }
    } else {
        lib.env.os = {
            name:'unknown',
            version:'0.0.0'
        }
    }
    
    if (lib.version) {
        lib.env.os.version = lib.version(lib.env.os.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));