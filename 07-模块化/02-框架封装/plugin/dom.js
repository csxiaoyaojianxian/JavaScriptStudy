// 给原型扩展DOM操作方法，这样jQ实例就可以使用了
$.fn.extend( {

    // 清空所有元素的内容
    empty: function() {
        /*
         * 实现思路：
         * 1、遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 2、遍历到的每一个元素清除其内容（ 元素.innerHTML = '' ）
         * */
        for ( var i = 0, len = this.length; i < len; i++ ) {
            this[ i ].innerHTML = '';
        }

        // 为了链式编程
        return this;
    },

    // 清空所有元素的内容
    _empty: function() {
        /*
         * 实现思路：
         * 1、遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 2、遍历到的每一个元素清除其内容（ 元素.innerHTML = '' ）
         * */
        this.each( function() {
            // 这里面的this指向遍历到的每一个元素
            this.innerHTML = '';
        } );

        // 为了链式编程
        return this;
    },

    // 删除所有的元素
    remove: function() {
        /*
         * 实现思路：
         * 1、遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 2、遍历到的每一个元素要删除掉
         * （ 通过parentNode获取该元素的父元素，然后父元素.removeChild( 被删除元素 ) ）
         * */
        for( var i = 0, len = this.length; i < len; i++ ) {
            this[ i ].parentNode.removeChild( this[ i ] );
        }

        // 为了链式编程
        return this;
    },

    // 删除所有的元素
    _remove: function() {
        /*
         * 实现思路：
         * 1、遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 2、遍历到的每一个元素要删除掉
         * （ 通过parentNode获取该元素的父元素，然后父元素.removeChild( 被删除元素 ) ）
         * */
        this.each( function() {
            // 这里面的this指向遍历到的每一个元素
            this.parentNode.removeChild( this );
        });

        // 为了链式编程
        return this;
    },


    // 设置所有元素的内容，获取第一个元素的内容
    html: function( html ) {
        /*
         * 实现思路：
         * 1、先通过arguments.length判断有没有传参
         * 2、没有传，则获取第一个元素，然后返回这个元素的innnerTHML内容
         * 3、如果传了，则遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 4、再设置每一个元素的innerTHML为传入的参数。
         * */

        // 如果没有传参，那么就直接返回第一个元素的innerHTML
        if ( arguments.length === 0 ) {
            return this[ 0 ].innerHTML;
        }

        // 如果传参了，那么遍历所以元素，分别设置其innerTHML值为传入的html
        else if( arguments.length >= 1 ) {

            for ( var i = 0, len = this.length; i < len; i++ ) {
                this[ i ].innerHTML = html;
            }

        }

        // 为了链式编程
        return this;
    },

    // 设置所有元素的内容，获取第一个元素的内容
    _html: function( html ) {
        /*
         * 实现思路：
         * 1、先通过arguments.length判断有没有传参
         * 2、没有传，则获取第一个元素，然后返回这个元素的innnerTHML内容
         * 3、如果传了，则遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 4、再设置每一个元素的innerTHML为传入的参数。
         * */

        // 如果没有传参，那么就直接返回第一个元素的innerHTML
        if ( arguments.length === 0 ) {
            return this.get(0).innerHTML;
        }

        // 如果传参了，那么遍历所以元素，分别设置其innerTHML值为传入的html
        else {
            this.each( function() {
                // 这里面的this指向遍历到的每一个元素
                this.innerHTML = html;
            });
        }

        // 为了链式编程
        return this;
    },

    // 设置所有元素的文本内容，获取所有元素的文本内容
    text: function( text ) {
        /*
         * 实现思路：
         * 1、先通过arguments.length判断有没有传参
         * 2、没有传，则遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 3、把每一个元素的innerText加在一起返回
         * 4、则遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 5、再设置每一个元素的innerText为传入的参数。
         * */

        var result = '';

        // 没有传参，获取所有元素的所有文本，然后返回
        if ( arguments.length === 0 ) {

            for ( var i = 0, len = this.length; i < len; i++ ) {
                result += this[ i ].innerText;
            }

            return result;
        }

        // 如果传参数了，那么设置所有元素的文本
        else {
            for ( var i = 0, len = this.length; i < len; i++ ) {
                this[ i ].innerText = text;
            }
        }

        // 为了链式编程
        return this;
    },

    // 设置所有元素的文本内容，获取所有元素的文本内容
    _text: function( text ) {
        /*
         * 实现思路：
         * 1、先通过arguments.length判断有没有传参
         * 2、没有传，则遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 3、把每一个元素的innerText加在一起返回
         * 4、则遍历likeArray（ 可以考虑使用for遍历，也可以考虑使用each遍历 ）
         * 5、再设置每一个元素的innerText为传入的参数。
         * */

        var result = '';

        // 没有传参，获取所有元素的所有文本，然后返回
        if ( arguments.length === 0 ) {

            this.each( function() {
                result += this.innerText;
            });

            return result;
        }

        // 如果传参数了，那么设置所有元素的文本
        else {
            this.each( function() {
                this.innerText = text;
            });
        }

        // 为了链式编程
        return this;
    },

    // 把所有的元素添加到指定的元素中
    appendTo: function( selector ) {
        /*
         * 实现思路：
         * 1、定义一个数组，用来存储将来所有被添加的元素
         * 2、使用jQuery包装一下selector，把不同的参数统一为jQ实例。
         * 3、在外层遍历所有的元素(this)
         * 4、在内层遍历所有的目标(包装后的jQ实例)
         * 5、在内层判断，如果是第一次，则把外面遍历的元素本体添加到内层遍历的元素，
         * 如果不是第一次，则把外面遍历的元素clone版本添加到内层遍历的元素。
         * 6、最后把存储被添加元素的数组使用jQ包装一下，然后返回。
         * */

        // 存储被添加的元素
        var result = [], tempNode = null;

        // 无论传入的是DOM还是jQ对象还是选择器，
        // 统一包装成新的JQ实例，这样就可以统一处理了
        var $selector = $( selector );

        // 遍历每一项元素( this )
        for ( var i = 0, len = this.length; i < len; i++ ) {

            // 遍历每一个目的地( $selector )
            for ( var j = 0, jLen = $selector.length; j < jLen; j++ ) {

                // 如果第一次，给遍历到的目的地添加本体
                if ( j === 0 ) {

                    // 存储被添加的元素
                    tempNode = this[ i ];

                    // 把元素添加到目的地
                    $selector[ j ].appendChild(  this[ i ] );

                    // append啥，就把啥存储到result数组中，最后包装成JQ对象返回
                    // 把元素存储到result数组中
                    result.push(  this[ i ] );

                }else {

                    // 存储被添加的元素
                    tempNode = this[ i ].cloneNode( true );

                    // 把元素添加到目的地
                    $selector[ j ].appendChild( tempNode );

                    // append啥，就把啥存储到result数组中，最后包装成JQ对象返回
                    // 把元素存储到result数组中
                    result.push( tempNode );
                }
            }

        }

        // 把所有被添加的元素保证成新实例返回，
        // 这样可以对所有被添加的元素进行链式编程。
        return jQuery( result );
    },

    // 把所有的元素添加到指定的元素中
    _appendTo: function( selector ) {
        /*
         * 实现思路：
         * 1、定义一个数组，用来存储将来所有被添加的元素
         * 2、使用jQuery包装一下selector，把不同的参数统一为jQ实例。
         * 3、在外层遍历所有的元素(this)
         * 4、在内层遍历所有的目标(包装后的jQ实例)
         * 5、在内层判断，如果是第一次，则把外面遍历的元素本体添加到内层遍历的元素，
         * 如果不是第一次，则把外面遍历的元素clone版本添加到内层遍历的元素。
         * 6、最后把存储被添加元素的数组使用jQ包装一下，然后返回。
         * */

        // 存储被添加的元素
        var result = [], tempNode = null;

        // 无论传入的是DOM还是jQ对象还是选择器，
        // 统一包装成新的JQ实例，这样就可以统一处理了
        var $selector = $( selector );

        // 遍历每一项元素( this )
        this.each( function() {

            // 这里的this指向每一个被添加的元素
            var self = this;

            // 遍历每一个目的地( $selector )
            $selector.each( function( i ) {

                // 如果第一次，给遍历到的目的地添加本体
                // 先把被添加的元素得到
                tempNode = i === 0? self: self.cloneNode( true );

                // 这里的this指向每一个目的地，给目的地添加外面遍历的元素
                this.appendChild( tempNode );
                result.push( tempNode );
            });
        });

        // 把所有被添加的元素保证成新实例返回，
        // 这样可以对所有被添加的元素进行链式编程。
        return jQuery( result );
    },

    // 把所有的元素添加到指定元素的最前面
    prependTo: function( selector ) {
        /*
         * 实现思路：
         * 1、定义一个数组，用来存储将来所有被添加的元素
         * 2、使用jQuery包装一下selector，把不同的参数统一为jQ实例。
         * 3、在外层遍历所有的元素(this)
         * 4、在内层遍历所有的目标(包装后的jQ实例)
         * 5、在内层判断，如果是第一次，则把外面遍历的元素本体添加到内层遍历元素的最前面，
         * 如果不是第一次，则把外面遍历的元素clone版本添加到内层遍历元素的最前面。
         * 6、最后把存储被添加元素的数组使用jQ包装一下，然后返回。
         * */
        var result = [], tempNode;

        // 无论传入的是DOM还是jQ对象还是选择器，
        // 统一包装成新的JQ实例，这样就可以统一处理了
        var $selector = jQuery( selector );

        // 遍历每一项被添加的元素( this )
        for ( var i = 0, len = this.length; i < len; i++ ) {

            // 遍历每一项被添加元素的目的地( $selector )
            for ( var j = 0, jLen = $selector.length; j < jLen; j++ ) {

                // 先得到被添加的元素
                tempNode = j === 0? this[ i ]: this[ i ].cloneNode( true );

                // 添加到指定元素的最前面
                $selector[ j ].insertBefore( tempNode, $selector[ j ].firstChild );

                // 把被添加的元素存储起来
                result.push( tempNode );
            }

        }

        // 把所有被添加的元素保证成新实例返回，
        // 这样可以对所有被添加的元素进行链式编程。
        return jQuery( result );
    },

    // 把所有的元素添加到指定元素的最前面
    _prependTo: function( selector ) {
        /*
         * 实现思路：
         * 1、定义一个数组，用来存储将来所有被添加的元素
         * 2、使用jQuery包装一下selector，把不同的参数统一为jQ实例。
         * 3、在外层遍历所有的元素(this)
         * 4、在内层遍历所有的目标(包装后的jQ实例)
         * 5、在内层判断，如果是第一次，则把外面遍历的元素本体添加到内层遍历元素的最前面，
         * 如果不是第一次，则把外面遍历的元素clone版本添加到内层遍历元素的最前面。
         * 6、最后把存储被添加元素的数组使用jQ包装一下，然后返回。
         * */
        var result = [], tempNode;

        // 无论传入的是DOM还是jQ对象还是选择器，
        // 统一包装成新的JQ实例，这样就可以统一处理了
        var $selector = jQuery( selector );

        // 这里this谁调用指向谁，即实例(实例存储了所有被添加元素的本体)
        this.each( function() {
            // 这里this指每一个被添加的元素
            var self = this;

            $selector.each( function( i ) {
                // 这里this指每一个被添加元素的目的地

                // 先得到被添加的元素
                tempNode = i === 0? self: self.cloneNode( true );

                // 添加到指定元素的最前面
                this.insertBefore( tempNode, this.firstChild );

                // 把被添加的元素存储起来
                result.push( tempNode );
            })
        });

        // 把所有被添加的元素保证成新实例返回，
        // 这样可以对所有被添加的元素进行链式编程。
        return jQuery( result );
    },

    // 给所有元素添加html内容，或者其他元素
    append: function( context ) {
        /*
         * 实现思路：
         * 1、判断context是不是字符串
         * 2、如果是，则把这个字符串累加给所有的元素
         * 3、如果不是，则先把context包装成jQ对象统一处理
         * 4、外层遍历
         * 5、内层遍历  4、5、6完全可以考虑复用appendTo
         * 6、添加元素
         * 7、返回this
         * */

        var $context = $( context );

        // 如果是字符串，则累加给所有的元素
        if( jQuery.isString( context ) ) {
            for( var i = 0, len = this.length; i < len; i++ ) {
                this[ i ].innerHTML += context;
            }
        }

        // 如果不是字符串，则把$context的每一项添加this的每一项中
        else {
            $context.appendTo( this );
        }

        // 返回this，链式编程
        return this;
    },

    // 给所有元素添加html内容，或者其他元素
    _append: function( context ) {
        /*
         * 实现思路：
         * 1、判断context是不是字符串
         * 2、如果是，则把这个字符串累加给所有的元素
         * 3、如果不是，则先把context包装成jQ对象统一处理
         * 4、外层遍历
         * 5、内层遍历  4、5、6完全可以考虑复用appendTo
         * 6、添加元素
         * 7、返回this
         * */

        var $context = $( context );

        // 如果是字符串，则累加给所有的元素
        if( jQuery.isString( context ) ) {

            // 遍历所有的元素( this )
            this.each( function() {

                // 把得到的每一个元素进行innerHTML累加
                this.innerHTML += context;
            });
        }

        // 如果不是字符串，则把$context的每一项添加到this的每一项中
        else {
            $context.appendTo( this );
        }

        // 返回this，链式编程
        return this;
    },

    // 给所有元素的最前面添加html内容，或者其他元素
    prepend: function( context ) {
        /*
         * 实现思路：
         * 1、判断context是不是字符串
         * 2、如果是，则把这个字符串累加给所有元素的最前面
         * 3、如果不是，则先把context包装成jQ对象统一处理
         * 4、外层遍历
         * 5、内层遍历  4、5、6完全可以考虑复用preppendTo
         * 6、添加元素
         * 7、返回this
         * */

        var $context = jQuery( context );

        // 如果是字符串，则累加给所有元素的最前面
        if ( jQuery.isString( context ) ) {
            for ( var i = 0, len = this.length; i < len; i++ ) {
                this[i].innerHTML = context + this[i].innerHTML;
            }
        }

        // 如果不是字符串，则把$context的每一项添加到this每一项的最前面
        else {
            $context.prependTo( this );
        }

        // 返回this，链式编程
        return this;
    },

    // 给所有元素的最前面添加html内容，或者其他元素
    _prepend: function( context ) {
        /*
         * 实现思路：
         * 1、判断context是不是字符串
         * 2、如果是，则把这个字符串累加给所有元素的最前面
         * 3、如果不是，则先把context包装成jQ对象统一处理
         * 4、外层遍历
         * 5、内层遍历  4、5、6完全可以考虑复用preppendTo
         * 6、添加元素
         * 7、返回this
         * */

        var $context = jQuery( context );

        // 如果是字符串，则累加给所有元素的最前面
        if ( jQuery.isString( context ) ) {

            // 这里的this，指的是调用者( 即存储N多元素的实例 )
            this.each( function() {

                // 这里的this，指遍历到的每一个元素
                this.innerHTML = context + this.innerHTML;
            });
        }

        // 如果不是字符串，则把$context的每一项添加到this每一项的最前面
        else {
            $context.prependTo( this );
        }

        // 返回this，链式编程
        return this;
    }
} );