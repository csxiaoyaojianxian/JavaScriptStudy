// 添加静态方法
$.extend({

    // 获取样式，已经处理了兼容性
    getStyle: function( dom, style ) {

        // 优先判断支不支持现代样式的获取方式
        if( window.getComputedStyle ) {
            return window.getComputedStyle( dom )[ style ];
        }

        // IE8兼容处理
        else {
            return dom.currentStyle[ style ];
        }
    }
});

// 给原型扩展属性和样式操作方法，这样jQ实例就可以使用了
$.fn.extend( {

    // 设置或者获取元素的属性节点值
    attr: function( attr, val ) {
        /*
         * 实现思路：
         * 1、判断attr是不是字符串或者对象，不是直接return this。
         * 2、如果是字符串，那么继续判断arguments的length
         * 3、length为1，则获取第一个元素指定的属性节点值返回
         * 4、length>=2，则遍历所有元素，分别给他们设置新的属性节点值( setAttribute )
         * 5、如果不是字符串(是对象)，那么遍历这个对象，得到所有的属性节点值，
         * 然后遍历所有的元素，把所有的属性节点分别添加到这些元素中。
         * 6、return this。
         * */

        // 不是字符串也不是对象，直接返回this
        if( !jQuery.isString( attr ) && !jQuery.isObject( attr ) ) {
            return this;
        }

        // 如果是字符串
        if( jQuery.isString( attr ) ) {

            // 如果length为1，则直接返回第一个元素的属性节点值
            if( arguments.length === 1 ) {
                return this.get( 0 ).getAttribute( attr );
            }

            // 如果length为多个(2和及2个以上)
            // 则遍历所有的元素，分别设置属性节点值
            else {
                for( var i = 0, len = this.length; i < len; i++ ) {
                    this[ i ].setAttribute( attr, val );
                }
            }
        }

        // 如果是对象
        // 遍历这个对象，和所有的元素，分别添加遍历到的属性节点值
        else {

            // 遍历得到所有的属性节点和属性节点值
            for( var key in attr ) {

                // 遍历得到所有的元素
                for( var i = 0, len = this.length; i < len; i++ ) {
                    this[ i ].setAttribute( key, attr[ key ] );
                }

            }
        }

        // 链式编程
        return this;
    },

    // 设置或者获取元素的属性节点值
    _attr: function( attr, val ) {
        /*
         * 实现思路：
         * 1、判断arguments.length
         * 2、如果为1
         * 3、继续判断attr是不是字符串，如果是获取第一个元素指定的属性节点值返回
         * 4、如果不是继续判断是不是对象，如果是遍历这个对象，得到所有的属性节点值，
         * 然后遍历所有的元素，把所有的属性节点分别添加到这些元素中。
         * 5、如果为多个(2及以上)，遍历所有元素分别设置属性节点值。
         * 6、return this。
         * */

        // 把实例使用别称存储一下，为了在其他地方使用
        var self = this;

        // 如果参数个数为1
        if( arguments.length === 1 ) {

            // 如果是字符串,获取第一个元素指定的属性节点值返回
            if( jQuery.isString( attr ) ) {
                return this[ 0 ].getAttribute( attr );
            }

            // 如果是对象,把对象中所有的属性节点添加到所有的元素中
            else if( jQuery.isObject( attr ) ) {

                // 使用jQ静态each方法遍历attr对象
                jQuery.each( attr, function( key, val ) {
                    // 这里遍历到的val不是对象类型，是基本数据类型，
                    // 我们要使用的就是基本数据类型，而this是基本数据类型的包装类型()，
                    // 所以这里不能使用this。

                    // 遍历所有的元素
                    self.each( function() {

                        // 给遍历到的每一个元素分别设置外面遍历到的属性节点
                        this.setAttribute( key, val );
                    } );
                } );
            }
        }

        // 如果参数个数为多个
        else if( arguments.length >= 2 ) {

            // 遍历所有元素分别设置对应的属性节点值
            this.each( function() {
                this.setAttribute( attr, val );
            });
        }

        // 链式编程
        return this;
    },

    // 设置或者获取属性
    prop: function( attr, val ) {
        /*
         * 实现思路：
         * 1、判断attr是不是字符串或者对象，不是直接return this。
         * 2、如果是字符串，那么继续判断arguments的length
         * 3、length为1，则获取第一个元素指定的属性节点值返回
         * 4、length>=2，则遍历所有元素，分别给他们设置新的属性节点值( setAttribute )
         * 5、如果不是字符串(是对象)，那么遍历这个对象，得到所有的属性节点值，
         * 然后遍历所有的元素，把所有的属性节点分别添加到这些元素中。
         * 6、return this。
         * */

        // 不是字符串也不是对象，那么就走吧
        if( !jQuery.isString( attr ) && !jQuery.isObject( attr ) ) {
            return this;
        }

        if( jQuery.isString( attr ) ) {

            // 如果只有一个参数为字符串，那么返回第一个元素指定的属性值
            if( arguments.length === 1 ) {
                return this[ 0 ][ attr ];
            }

            // 如果多个参数，那么给所有元素设置指定的属性值
            else if( arguments.length >= 2 ){
                for( var i = 0, len = this.length; i < len; i++ ) {
                    this[ i ][ attr ] = val;
                }
            }
        }

        // 如果传入的attr是对象
        else {

            // 遍历attr得到所有的属性
            for( var key in attr ) {

                // 遍历所有的元素
                for( var i = 0, len = this.length; i < len; i++ ) {

                    // 给每一个元素设置属性
                    this[ i ][ key ] = attr[ key ];
                }
            }
        }

        // 链式编程
        return this;
    },

    // 设置或者获取属性
    _prop: function( attr, val ) {
        /*
         * 实现思路：
         * 1、如果arguments.length为1
         * 2、那么判断attr是不是字符串，是则获取第一个元素的属性
         * 3、判断attr是不是对象。是则遍历这个对象得到所有的属性分别设置给所有的元素
         * 4、如果arguments.length>=2,遍历所有元素分别设置指定的属性
         * 5、链式编程返回this
         * */

        var self = this;

        // arguments.length为1
        if( arguments.length === 1 ) {

            // 如果为字符串
            if( jQuery.isString( attr ) ) {
                return this[ 0 ][ attr ];
            }

            // 如果是对象
            else if( jQuery.isObject( attr ) ) {

                // 遍历存储所有属性的对象
                jQuery.each( attr, function( key, val ) {

                    // 遍历所有的元素
                    self.each( function() {

                        // 给每一个元素设置遍历到的属性
                        this[ key ] = val;
                    });

                });
            }
        }

        // arguments.length>=2
        else if( arguments.length >= 2 ) {

            // 遍历所有的元素，以attr为键，val为值，设置属性
            this.each( function() {
                this[ attr ] = val;
            });
        }

        // 链式编程
        return this;
    },

    // 设置或者获取样式
    css: function( styleName, style ) {
        /*
         * 实现思路：
         * 1、如果arguments.length为1
         * 2、那么判断styleName是不是字符串，是则获取第一个元素指定的样式
         * 3、判断styleName是不是对象。是则遍历这个对象得到所有的样式分别设置给所有的元素
         * 4、如果arguments.length>=2,遍历所有元素分别设置指定的样式
         * 5、链式编程返回this
         * */
        if( arguments.length === 1 ) {

            if( jQuery.isString( styleName ) ) {
                return jQuery.getStyle( this[ 0 ], styleName );
            }

            else if( jQuery.isObject( styleName ) ) {

                // 遍历styleName得到所有的样式
                for( var key in styleName ) {

                    // 遍历得到所有的元素
                    for( var i = 0, len = this.length; i < len; i++ ) {

                        // 给所有的元素设置遍历到的所有样式
                        this[ i ][ 'style' ][ key ] = styleName[ key ];

                    }

                }

            }

        }

        else if( arguments.length >= 2 ) {

            // 给所有元素设置指定的样式
            for( var i = 0, len = this.length; i < len; i++ ) {
                this[ i ][ 'style' ][ styleName ] = style;
            }
        }

        // 链式编程
        return this;
    },

    _css: function() {

    },

    // 设置或者获取元素的value属性值
    val: function( value ) {
        /*
         * 实现思路：
         * 1、如果arguments.length === 0,则直接返回第一个元素的value属性值
         * 2、否则，遍历所有的元素，分别设置对应的value属性值
         * 3、链式编程返回this
         * */

        // 没有传参，返回第一个元素的value属性值
        if( arguments.length === 0 ) {
            return this[ 0 ].value;
        }

        // 否则给所有元素分别设置value值
        else {
            for( var i = 0, len = this.length; i < len; i++ ) {
                this[ i ].value = value;
            }
        }

        // 链式编程
        return this;
    },

    // 设置或者获取元素的value属性值
    _val: function( value ) {
        /*
         * 实现思路：
         * 1、如果arguments.length === 0,则直接返回第一个元素的value属性值
         * 2、否则，遍历所有的元素，分别设置对应的value属性值
         * 3、链式编程返回this
         * */

        // 没有传参，返回第一个元素的value属性值
        if( arguments.length === 0 ) {
            return this[ 0 ].value;
        }

        // 否则给所有元素分别设置value值
        else {
            this.each( function() {
                this.value = value;
            });
        }

        // 链式编程
        return this;
    },

    // 设置或者获取元素的value属性值
    __val: function( value ) {

        // 没有传参，借用prop获取第一个元素的value属性值
        if( arguments.length === 0 ) {
            return this.prop( 'value' );
        }
        // 传参了，借用prop给所有元素设置新的value属性值
        else {
            return this.prop( 'value', value );
        }
    },

    // 判断元素中是否含有指定的class
    hasClass: function( className ) {
        /*
         * 实现思路：
         * 1、遍历所有的元素
         * 2、依次获取每一个元素的className，为了方便判断，首尾加空格
         * 3、利用处理过的className字符串的indexOf方法判断有没有指定的className(这个className首尾也加空格)
         * 4、如果有一个元素的判断结果不为-1，就返回true
         * 5、否则返回false。
         * */
        for( var i = 0, len = this.length; i < len; i++ ) {

            // 只要有一个元素存在指定的className，那么就可以true了
            if ( (' ' + this[ i ].className + ' ').indexOf(' ' + className + ' ') > -1 ) {
                return true;
            }
        }

        // 所有的元素都没有，那么返回false
        return false;
    },

    // 判断元素中是否含有指定的class
    _hasClass: function( className ) {
        /*
         * 实现思路：
         * 1、遍历所有的元素
         * 2、依次获取每一个元素的className，为了方便判断，首尾加空格
         * 3、利用处理过的className字符串的indexOf方法判断有没有指定的className(这个className首尾也加空格)
         * 4、如果有一个元素的判断结果不为-1，就返回true
         * 5、否则返回false。
         * */

        // 用来记录元素有没有指定的className，默认为没有
        var has = false;

        this.each( function() {

            // 只要有一个元素存在指定的className，那么就修改has变量的值为true
            if ( (' ' + this.className + ' ').indexOf(' ' + className + ' ') > -1 ) {
                has = true;
            }
        });

        // 返回has
        return has;
    },

    // 判断元素中是否含有指定的class
    __hasClass: function( className ) {
        /*
         * 实现思路：
         * 1、遍历所有的元素
         * 2、依次获取每一个元素的className，为了方便判断，首尾加空格
         * 3、利用处理过的className字符串的indexOf方法判断有没有指定的className(这个className首尾也加空格)
         * 4、如果有一个元素的判断结果不为-1，就返回true
         * 5、否则返回false。
         * */

        // 用来记录元素有没有指定的className，默认为没有
        var has = false;

        this.each( function() {

            // 只要有一个元素存在指定的className，那么就修改has变量的值为true
            if ( (' ' + this.className + ' ').indexOf(' ' + className + ' ') > -1 ) {
                has = true;

                // 中断each的遍历
                return false;
            }
        });

        // 返回has
        return has;
    },

    // 给所有的元素添加指定的class
    addClass: function( className ) {
        /*
         * 实现思路：
         * 1、遍历所有的元素
         * 2、依次判断每一个元素有没有要添加的className，
         * 3、有则忽略(防止重复)，没有则添加( className += ' ' + classNames )
         * 4、处女座最后可以考虑trim一下
         * 5、链式编程返回this
         * */
        this.each( function() {

            // 包装遍历到的每一个元素，
            // 然后复用hasClass判断这个元素有没有要添加的class
            // 没有则添加，有则忽略
            if( !jQuery( this ).hasClass( className ) ) {
                this.className += ' ' + className;
            }
        });

        // 链式编程返回this
        return this;
    },

    // 给所有的元素添加指定的class
    _addClass: function( classNames ) {
        /*
         * 实现思路：
         * 1、先把classNames首尾空格去掉，然后使用split(' ')劈成数组
         * 2、外层遍历所有的元素
         * 3、内层遍历所有要添加的class
         * 4、依次判断遍历到的每一个元素有没有遍历到的每一个要添加的class
         * 5、有则忽略(防止重复)，没有则添加( className += ' ' + classNames )
         * 6、处女座最后可以考虑trim一下
         * 7、链式编程返回this
         * */

        // 参数转化为存储所有class的数组
        classNames = jQuery.trim( classNames ).split(' ');

        // 遍历所有的元素
        this.each( function() {

            // 这里的this是遍历到的每一个原生DOM，
            // 为了复用hasClasss，所以先包装一下
            var $self = jQuery( this );

            // 遍历所有要添加的class
            jQuery.each( classNames, function( i, val ) {

                // 如果元素没有相应的class则进行添加
                if( !$self.hasClass( val ) ) {

                    // jQ实例没有className属性，
                    // 得先通过实例得到原生DOM，再获取
                    $self[ 0 ].className += ' ' + val;
                }
            });
        });

        // 链式编程返回this
        return this;
    },

    // 删除所有的元素指定的class
    removeClass: function( className ) {
        /*
         * 实现思路：
         * 1、没有参数，遍历所有的元素，设置他们的className为空
         * 2、有参数，遍历所有的元素，删除指定的className(删除方式和hasClass类似)
         * 3、链式编程返回this
         * */

        // 没有传参，遍历所有元素清除他们的class
        if( arguments.length === 0 ) {
            this.each( function() {
                this.className = '';
            });
        }

        // 传参，遍历所有元素分别删除指定的class
        else {
            this.each( function() {
                this.className = (' ' + this.className + ' ').replace(' ' + className  + ' ', ' ');
            });
        }

        // 链式编程
        return this;
    },

    // 删除所有的元素指定的class
    _removeClass: function( classNames ) {
        /*
         * 实现思路：
         * 1、没有参数，遍历所有的元素，设置他们的className为空
         * 2、有参数，把classNames首尾空格去掉，然后使用split(' ')劈成数组
         * 3、外层遍历所有的元素
         * 4、内层遍历所有要删除的class
         * 5、遍历到的每一个元素删除遍历到的class( 删除方式和hasClass类似 )
         * 6、链式编程返回this
         * */

        if( arguments.length === 0 ) {
            this.each( function() {
                this.className = '';
            });
        }

        else {

            // 参数转化为存储所有class的数组
            classNames = jQuery.trim( classNames ).split(' ');

            // 遍历所有的元素
            this.each( function() {
                var self = this;

                // 遍历所有要删除的class
                jQuery.each( classNames, function( i, val ) {

                    // 元素删除指定的class
                    //self.className = (' ' + self.className + ' ').replace(' ' + val + ' ', ' ');
                    self.className = self.className.replace(new RegExp( '\\b' + val + '\\b' ), '');
                });
            });
        }

        // 链式编程
        return this;
    },

    // 有则删除，没有则添加
    toggleClass: function( className ) {
        /*
         * 实现思路：
         * 1、遍历所有的元素
         * 2、判断每一个元素有则删除，没有则添加
         * 3、链式编程返回this
         * */
        this.each( function() {
            // 这里的this是遍历到的每一个原生DOM，
            // 先包装成JQ对象，就可以复用之前写好的方法了
            var $this = jQuery( this );

            // 有则删除，没有则添加
            if( $this.hasClass( className ) ) {
                $this.removeClass( className );
            }else {
                $this.addClass( className );
            }
        });

        // 链式编程
        return this;
    },

    // 有则删除，没有则添加
    _toggleClass: function( classNames ) {
        /*
         * 实现思路：
         * 1、先把classNames首尾空格去掉，然后使用split(' ')劈成数组
         * 2、外层遍历所有的元素
         * 3、内层遍历所有的class
         * 4、遍历到的每一个元素判断有没有遍历到的每一个class，有则删除，没有则添加
         * 5、链式编程返回this
         * */

        // 参数转化为存储所有class的数组
        classNames = jQuery.trim( classNames ).split(' ');

        // 遍历所有的元素
        this.each( function() {

            // 这里的this是原生DOM，
            // 为了复用前面封装好的方法，
            // 所以包装成JQ对象
            var $self = jQuery( this );

            // 遍历所有的class
            jQuery.each( classNames, function( i, val ) {

                // 有则删除，没有则添加
                if( $self.hasClass( val ) ){
                    $self.removeClass( val );
                }else {
                    $self.addClass( val );
                }
            });
        });

        // 链式编程
        return this;
    }
} );