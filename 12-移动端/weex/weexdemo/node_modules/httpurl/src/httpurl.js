;(function(win, lib) {
    var PROTOCAL = [
        'http', 'https'];

    /**
     * 解析和操作url
     * @class HttpURL
     * @param {string} url - 需要解析和操作的url
     */
    function HttpURL(url){
        var params = {};

        /**
         * 查询串键值对
         * @prop {Object} params
         * @memberof HttpURL
         * @instance
         */
        Object.defineProperty(this, 'params', {
            set: function(v){
                if (typeof v === 'object'){
                    for(var p in params) {
                        delete params[p];
                    }
                    for(var p in v) {
                        params[p] = v[p];
                    }
                }
            },
            get: function() {
                return params;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'search', {
            set: function(v) {
                if(typeof v === 'string') {
                    if (v.indexOf('?') === 0) {
                        v = v.substr(1);
                    }
                    var search = v.split('&');
                    for(var p in params) {
                        delete params[p];
                    }
                    for(var i = 0 ; i < search.length; i++) {
                        var pair = search[i].split('=');
                        // pair[1] 可能为 0/false/null 等非空但直接运算会返回 false 的值
                        if (pair[1] !== undefined) {
                            pair[1] = pair[1].toString();
                        }
                        if (pair[0]) {
                            try {
                                params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                            } catch(e) {
                                params[pair[0]] = pair[1];
                            }
                        }
                    }
                }
            },
            get: function(){
                var search = [];
                for(var p in params) {
                    if (params[p] === undefined) {
                        continue;
                    }
                    if (params[p] !== '') {
                        try {
                            search.push(encodeURIComponent(p) +'=' + encodeURIComponent(params[p]));
                        } catch(e) {
                            search.push(p +'=' + params[p]);
                        }
                    } else {
                        try {
                            search.push(encodeURIComponent(p));
                        } catch(e) {
                            search.push(p);
                        }
                    }
                }
                if (search.length) {
                    return '?' + search.join('&');
                } else {
                    return '';
                }
            },
            enumerable: true
        });

        var hash;
        Object.defineProperty(this, 'hash', {
            set: function(v) {
                if(typeof v === 'string') {
                    if (v && v.indexOf('#') < 0) {
                        v = '#' + v;
                    }
                    hash = v || '';
                }
            },
            get: function() {
                return hash;
            },
            enumerable: true
        });

        this.set = function(v) {
            v = v || '';
            var matchArr;
            if((matchArr = v.match(new RegExp('^([a-z0-9-]+\:)?' +    //protocol
                    '[/]{2}' +                            //slash x 2
                    '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' +  //username:password@
                    '([^:/?#]+)' +                        //hostname
                    '(?:[:]([0-9]+))?' +                  //port
                    '([/][^?#;]*)?' +                     //pathname
                    '(?:[?]([^#]*))?' +                   //search
                    '([#][^?]*)?$'                          //hash
                    , 'i')))){
                /**
                 * 协议头
                 * @member {String} protocol
                 * @memberof HttpURL
                 * @instance
                 */
                this.protocol = matchArr[1] || (typeof location === 'object' ? location.protocol : '');
                /**
                 * 用户名
                 * @member {String} username
                 * @memberof HttpURL
                 * @instance
                 */
                this.username = matchArr[2] || '';
                /**
                 * 密码
                 * @member {String} password
                 * @memberof HttpURL
                 * @instance
                 */
                this.password = matchArr[3] || '';
                /**
                 * 主机名
                 * @member {String} hostname
                 * @memberof HttpURL
                 * @instance
                 */
                /**
                 * 主机名
                 * @member {String} host
                 * @memberof HttpURL
                 * @instance
                 */
                this.hostname = this.host = matchArr[4];
                /**
                 * 端口
                 * @member {String} port
                 * @memberof HttpURL
                 * @instance
                 */
                this.port = matchArr[5] || '';
                /**
                 * 路径
                 * @member {String} pathname
                 * @memberof HttpURL
                 * @instance
                 */
                this.pathname = matchArr[6] || '/';
                /**
                 * 查询串
                 * @member {String} search
                 * @memberof HttpURL
                 * @instance
                 */
                this.search = matchArr[7] || '';
                /**
                 * 锚点串
                 * @member {String} hash
                 * @memberof HttpURL
                 * @instance
                 */
                this.hash = matchArr[8] || '';
                /**
                 * 地址源
                 * @member {String} origin
                 * @memberof HttpURL
                 * @instance
                 */
                this.origin = this.protocol + '//' + this.hostname;
            } else {
                throw new Error('Wrong uri scheme.');
            }
        }

        /**
         * 查询串键值对
         * @method toString
         * @return {String} 完整URL地址
         * @memberof HttpURL
         * @instance
         */
        this.toString = function(){
            var string = this.protocol + '//';
            if(this.username) {
                string += this.username;
                if(this.password) {
                    string += ':' + this.password;
                }
                string += '@';
            }
            string += this.host;
            if(this.port && this.port !== '80') {
                string += ':' + this.port;
            }
            if(this.pathname) {
                string += this.pathname;
            }
            if(this.search) {
                string += this.search;
            }
            if(this.hash) {
                string += this.hash;
            }
            return string;
        }

        if (url) {
            this.set(url.toString());
        }
    }

    /**
     * @namespace lib
     */

    /**
     * 解析和操作url
     * @method httpurl
     * @param {string} url - 需要解析和操作的url
     * @return {HttpURL} HttpURL实例
     * @memberof lib
     */
    lib.httpurl = function(url) {
        return new HttpURL(url);
    }
})(window, window['lib'] || (window['lib'] = {}));
