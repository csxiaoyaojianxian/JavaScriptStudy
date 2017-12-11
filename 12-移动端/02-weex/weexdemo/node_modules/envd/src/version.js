;(function(win, lib) {

    lib.env = lib.env || {};
    /**
     * 版本好
     * @class lib.env~Version
     * @param {String} v - 版本号字符串
     */
    function Version(v){

        Object.defineProperty(this, 'val', {
            value: v.toString(),
            enumerable: true
        });

        /**
         * 判断是否大于某个版本
         * @method gt
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否大于
         * @instance
         * @memberof Version
         */
        this.gt = function(v) {
            return Version.compare(this, v) > 0;
        };

        /**
         * 判断是否大于等于某个版本
         * @method gte
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否大于等于
         * @instance
         * @memberof Version
         */
        this.gte = function(v) {
            return Version.compare(this, v) >= 0;
        };

        /**
         * 判断是否小于某个版本
         * @method lt
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否小于
         * @instance
         * @memberof Version
         */
        this.lt = function(v) {
            return Version.compare(this, v) < 0;
        };

        /**
         * 判断是否小于等于某个版本
         * @method lte
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否小于等于
         * @instance
         * @memberof Version
         */
        this.lte = function(v) {
            return Version.compare(this, v) <= 0;
        };

        /**
         * 判断是否等于某个版本
         * @method eq
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否等于
         * @instance
         * @memberof Version
         */
        this.eq = function(v) {
            return Version.compare(this, v) === 0;
        };
    };

    /**
     * 返回当前版本字符串
     * @method toString
     * @return {String} 当前版本字符串
     * @instance
     * @memberof Version
     */
    Version.prototype.toString = function() {
        return this.val;
    }

    /**
     * 返回当前版本
     * @method valueOf
     * @return {Boolean} 当前版本
     * @instance
     * @memberof Version
     */
    Version.prototype.valueOf = function(){
        var v = this.val.split('.');
        var r = [];
        for(var i = 0; i < v.length; i++) {
            var n = parseInt(v[i],10);
            if (isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if (s.length < 5) {
                s = Array(6 - s.length).join('0') + s;
            }
            r.push(s);
            if(r.length === 1) {
                r.push('.');
            }
        }
        return parseFloat(r.join(''));
    };

    /**
     * 返回当前版本字符串
     * @method compare
     * @param {String} v1 - 需要比较的版本1
     * @param {String} v2 - 需要比较的版本2
     * @return {Number} 0表示相等，-1表示小于，1表示大于
     * @memberof Version
     */
    Version.compare = function (v1,v2){
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');
        
        for(var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i],10),  n2 = parseInt(v2[i],10);
            
            if(window.isNaN(n1)) {
                n1 = 0;
            }
            if(window.isNaN(n2)) {
                n2 = 0;
            }
            if( n1 < n2 ) {
                return -1;
            }
            else if( n1 > n2) {
                return 1;
            }
        }
        return 0;
    }


    /**
     * 解析和操作版本号
     * @method version
     * @param {string} v - 需要解析的版本号
     * @return {lib.env~Version} Verson实例
     * @memberof lib
     */
    lib.version = function(v) {
        return new Version(v);
    };
})(window, window['lib'] || (window['lib'] = {}));