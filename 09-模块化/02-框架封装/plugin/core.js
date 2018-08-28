(function( w ) {

    var version = '1.0.0';

    // 工厂
    function jQuery( selector ) {
        return new jQuery.fn.init( selector );
    }

    // 替换原型 + 原型简称
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        // 获取版本号
        jquery: version,

        // 代表所有实例默认的选择器，也代表实例是一个jQuery类型的对象
        selector: '',

        // 代表所有实例默认的长度
        length: 0,

        // 把实例转换为数组返回
        toArray: function() {
            return [].slice.call( this );
        },

        // 获取指定下标的元素，获取的是原生DOM
        get: function( i ) {
            /*
             * 1、如果传入null或undefined，那么转换为数组返回
             * 2、如果传入的是正数，按照指定的下标获取元素返回
             * 3、如果传入的是负数，按照下标倒着( this.length + 负数 )获取元素返回
             * */

            // null、undeinfed
            if ( i == null ) {
                return this.toArray();
            }

            // 其他
            if ( i >= 0 ) {
                return this[ i ];
            }else {
                return this[ this.length + i ];
            }
        },

        _get: function( i ) {
            return i == null?
                this.toArray() :
                ( i >= 0? this[ i ] : this[ this.length + i ] );
        },

        // 遍历实例
        each: function( fn ) {
            return jQuery.each( this, fn );
        },

        // 通过实例得到一个新数组
        map: function( fn ) {
            return jQuery.map( this, fn );
        },

        // 截取实例的部分元素，构成一个新的jQuery实例返回
        slice: function() {
            /*
             * 1、通过数组的slice截取部分元素(slice返回的是数组)，
             * 2、把截取到的元素转换为实例对象返回。
             * */

            // 因为slice的参数会有变化，所以需要是arguments，
            // 我们要把arguments中的每一项传给数组的slice，所以需要借用apply平铺传递过去，
            // 最后把slice返回数组，通过jQuery工厂保证成实例返回。
            var nodes = [].slice.apply( this, arguments );
            return jQuery( nodes );
        },

        _slice: function() {
            // 因为slice的参数会有变化，所以需要是arguments，
            // 我们要把arguments中的每一项传给数组的slice，所以需要借用apply平铺传递过去，
            // 最后把slice返回数组，通过jQuery工厂保证成实例返回。
            return jQuery( [].slice.apply( this, arguments ) );
        },

        // 获取指定下标的元素，获取的是jQuery类型的实例对象。
        eq: function( i ) {
            /*
             * 1、如果传入null或undefined，返回一个新实例，
             * 2、如果传入的是正数，按照指定的下标获取元素，再包装成新实例返回
             * 3、如果传入的是负数，按照下标倒着( this.length + 负数 )获取元素，再包装成新实例返回
             * */

            // null、undefined得到新实例
            if( i == null ) {
                return jQuery();
            }

            if( i >= 0 ) {
                return jQuery( this[ i ] );
            }else {
                return jQuery( this[ this.length + i ] );
            }
        },

        _eq: function( i ) {
            return i == null? jQuery() : jQuery( this.get( i ) );
        },

        // 获取实例中的第一个元素，是jQuery类型的实例对象。
        first: function() {
            return this.eq( 0 );
        },

        // 获取实例中的最后一个元素，是jQuery类型的实例对象。
        last: function() {
            return this.eq( -1 );
        },

        // 原型上的方法供实例调用，
        // 即实例.push，在调用过程中，push内的this就指向了实例，
        // 所以这里不需要通过call和apply改变this指向即可借用数组的方法
        push: [].push,
        sort: [].sort,
        splice: [].splice
    }

    // 给jQuery和原型分别添加extend方法
    jQuery.extend = jQuery.fn.extend = function( obj ) {
        var i = 1, key,
            arg = arguments,
            target = arg[ 0 ],
            argLen = arg.length;

        if( argLen === 1 ) {
            target = this;
            i = 0;
        }

        // 遍历得到后面所有的对象
        for( ; i < argLen; i++ ) {

            // 遍历每一个对象所有的属性
            for( key in arg[ i ] ) {
                target[ key ] = arg[ i ][ key ];
            }
        }

        // 给谁混入返回谁
        return target;
    }

    // 给jQuery添加一些静态方法
    jQuery.extend({

        // 遍历对象或类数组
        each: function( obj, fn ) {
            var i, len, key;

            if ( jQuery.isLikeArray( obj ) ) {
                for ( i = 0, len = obj.length; i < len; i++ ) {
                    if ( fn.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            }else {
                for ( key in obj ) {
                    if ( fn.call( obj[ key ], key, obj[ key ] ) === false ) {
                        break;
                    }
                }
            }

            return obj;
        },

        // map实现
        map: function( obj, fn ) {

            /*
             * 1、先判断obj是不是数组或者伪数组，
             * 2、如果是，则通过i的方式遍历这个对象
             * 3、如果不是，则通过for in的方式遍历这个对象
             * 4、在遍历的过程中，把每一次遍历到key和val分别传给回调。
             * 5、在给回调传参的时候，需要收集回调的返回值，最后把所有的返回值构成新数组返回。
             * */
            var i, len, key, result = [];

            if( 'length' in obj ) {
                for ( i = 0, len = obj.length; i < len; i++ ) {
                    result.push( fn.call( obj[ i ], obj[ i ], i ) );
                }
            }else {
                for ( key in obj ) {
                    result.push( fn.call( obj[ key ], obj[ key ], key ) );
                }
            }

            return result;
        },

        // 去掉首尾空白字符
        trim: function( str ) {

            // null、undefined、NaN、0、false、''
            if ( !str ) {
                return str;
            }

            // 优先使用原生的
            if ( str.trim ) {
                return str.trim();
            }

            return str.replace( /^\s+|\s+$/g, '');

        },

        // 判断是不是html片段
        isHTML: function( html ) {

            // null、undefined、NaN、0、false、''
            if ( !html ) {
                return false;
            }

            // <.>
            if( html.charAt(0) === '<' &&
                html.charAt( html.length - 1 ) === '>' &&
                html.length >= 3 ) {
                return true;
            }

            return false;
        },

        // 判断是不是html片段
        _isHTML: function( html ) {
            return !!html &&
                html.charAt(0) === '<' &&
                html.charAt( html.length - 1 ) === '>' &&
                html.length >= 3;
        },

        // 判断是不是函数
        isFunction: function( fn ) {
            if ( typeof fn === 'function' ) {
                return true;
            }
            return false;
        },

        // 判断是不是函数
        _isFunction: function( fn ) {
            return typeof fn === 'function';
        },

        // 判断是不是window
        isWindow: function( w ) {

            // null、undefined、NaN、0、false、''
            if( !w ) {
                return false;
            }

            if( w.window === w ) {
                return true;
            }

            return false;
        },

        // 判断是不是window
        _isWindow: function( w ) {
            return !!w && w.window === w;
        },

        // 判断是不是对象
        isObject: function( obj ) {

            // 防止typeof对null的误判
            if ( obj === null ) {
                return false;
            }

            // 如果是object或function，那就是对象
            if ( typeof obj === 'object' || typeof obj === 'function' ) {
                return true;
            }

            return false;
        },

        // 判断是不是字符串
        isString: function( str ) {
            if ( typeof str === 'string' ) {
                return true;
            }
            return false;
        },

        // 判断是不是字符串
        _isString: function( str ) {
            return typeof str === 'string';
        },

        // 判断是不是真数组或伪数组
        isLikeArray: function( arr ) {

            // Function、window、!Object
            if ( jQuery.isFunction( arr ) || jQuery.isWindow( arr ) || !jQuery.isObject( arr ) ) {
                return false;
            }

            // 判断是不是真数组
            if ( ({}).toString.call( arr ) === '[object Array]' ) {
                return true;
            }

            // 判断是不是伪数组
            if ( 'length' in arr && ( arr.length === 0 || arr.length - 1 in arr ) ) {
                return true;
            }

            return false;
        },

        ready: function( fn ) {

            // 先统一判断DOMContentloaded有没有触发，
            // 通过document.readyState === 'complete'判断
            // 如果为true，fn可以直接调用。

            // 如果为false，那么判断支不支持addEventListener，
            // 如果支持，绑定DOMContentLoaded事件

            // 如果不支持，使用attchEvent绑定onreadystatechang事件,
            // 注意，需要在里面判断document.readyState === 'complete'才执行fn。
            // 防止fn多次执行。

            // DOM已经构造完毕，fn可以直接执行
            if ( document.readyState === 'complete' ) {
                fn();
            }

            // 如果DOM没有构造完毕，那么判断addEventListener是否兼容
            else if( document.addEventListener ) {
                document.addEventListener( 'DOMContentLoaded', fn );
            }

            // 如果不兼容addEventListener，那么采取attachEvent的方式，
            // 同时事件变为了onreadystatechange，为了防止这个事件多次触发造成的fn多次执行，
            // 所以需要一个包装函数来进行过滤。
            else {
                document.attachEvent( 'onreadystatechange', function() {
                    if( document.readyState === 'complete' ) {
                        fn();
                    }
                } );
            }
        }
    });

    // 这是真正的构造函数，同时把构造函数放在了原型中
    var init = jQuery.fn.init = function( selector ) {

        // null、undefined、NaN、0、false、''
        if ( !selector ) {
            return this;
        }

        // function
        if ( jQuery.isFunction( selector ) ) {

            // 打包给ready静态方法处理
            jQuery.ready( selector );
        }

        // string ==> ( html || selector )
        else if( jQuery.isString( selector ) ) {

            // 为了用户友好体验，先去掉首尾空白字符
            selector = jQuery.trim( selector );

            // html
            if( jQuery.isHTML( selector ) ) {

                // 利用一个临时的div来创建DOM，
                // 然后把创建好的DOM依次push给实例。
                var tempDiv = document.createElement( 'div' );
                tempDiv.innerHTML = selector;
                [].push.apply( this, tempDiv.childNodes );

            }

            // selector
            else {

                try {
                    [].push.apply( this, document.querySelectorAll( selector ) );
                }catch(e) {
                    // 如果报错了，那么手动补一个length属性，代表没有获取到任何元素
                    this.length = 0;
                }
            }
        }

        // array || likeArray
        else if( jQuery.isLikeArray( selector ) ) {
            [].push.apply( this, [].slice.call( selector ) );
        }

        // 其它
        else {
            this[0] = selector;
            this.length = 1;
        }
    };

    // 替换init的原型为工厂的原型，这样外界就可以通过工厂给实例扩展方法
    init.prototype = jQuery.fn;

    // 暴露工厂和工厂的简称
    w.jQuery = w.$ = jQuery;

}( window ));