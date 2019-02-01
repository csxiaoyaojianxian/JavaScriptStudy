// 添加静态方法
$.extend({

    // 默认的配置
    ajaxSettings: {
        url: location.href,    // 默认的url为本地地址
        type: "GET",           // 默认请求的方法为GET
        async: true,           // 默认为异步请求
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",   // POST发送数据时设置头信息时候要使用
        timeout: null,         // 默认不看延迟事件
        dataType: 'JSON',      // 默认认为请求的数据是JSON
        success: function(){},
        error: function(){},
        complete: function(){},
    },

    // 把对象转换为url参数形式的字符串
    urlStringify: function( data ) {
        var result = '', key;

        // 传入的不是对象，就直接返回空字符串
        if( !jQuery.isObject( data ) ) {
            return result;
        }

        for( key in data ) {
            // 为了防止IE发送的汉字路乱码，所以需要统一编码一下
            result += window.encodeURIComponent( key ) + '=' + window.encodeURIComponent( data[ key ] ) + '&';
        }

        // 从0截取到倒数第一个字符串返回
        return result.slice( 0, -1 );
    },

    // 加工options
    processOptions: function( options ) {
        var optionsNew = {};

        // 合并用户和默认的配置项，得到一份新的
        optionsNew = {};
        jQuery.extend( optionsNew, jQuery.ajaxSettings, options );

        // 对data进行加工处理
        optionsNew.data = jQuery.urlStringify( optionsNew.data );

        // 把type统一转换为大写，防止意外
        optionsNew.type = optionsNew.type.toUpperCase();

        // 如果是GET请求，把数据加到URL中
        if( optionsNew.type === 'GET' ) {
            optionsNew.url += '?' + optionsNew.data;
            optionsNew.data = null;
        }

        // 返回加工后的配置
        return optionsNew;
    },

    // ajax封装
    ajax: function( options ) {

        var optionsNew, xhr, result, timer;

        // 加工得到一份处理好的配置项
        optionsNew = jQuery.processOptions( options );

        // 创建xhr对象，发送请求
        xhr = new XMLHttpRequest();
        xhr.open( optionsNew.type, optionsNew.url, optionsNew.async );

        // 如果为post请求，添加一个请求头
        if( optionsNew.type === 'POST' ) {
            xhr.setRequestHeader( 'Content-Type', optionsNew.contentType );
        }

        xhr.onreadystatechange = function() {

            // 先判断请求是否完成，完成就执行complate方法
            if( xhr.readyState === 4 ) {

                // 在指定时间内完成了请求，那么清除定时器
                clearTimeout( timer );

                optionsNew.complete();

                // 判断请求是否成功，成功过就执行successs方法，失败执行error方法
                if( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status === 304 ) {

                    // 根据预期的dataType对数据进行处理
                    switch ( optionsNew.dataType ) {
                        case 'JSON':
                            result = JSON.parse( xhr.responseText );
                            break;
                        case 'script':
                            eval( xhr.responseText );
                            result = xhr.responseText;
                            break;
                        case 'style':
                            $('<style></style>').html( xhr.responseText ).appendTo( 'head' );
                            result = xhr.responseText;
                            break;
                        default:
                            result = xhr.responseText;
                            break;
                    }
                    optionsNew.success( result );
                }else {
                    optionsNew.error( xhr.status );
                }
            }
        };

        // 如果设置了超时，那么开始一个定时器
        if( optionsNew.timeout ) {

            // 在指定的时间内，请求还没有完成，
            // 那么直接调用error方法报错
            timer = setTimeout( function() {

                // 超时执行error
                optionsNew.error( '超时' );

                // error执行了，事件回调就没有必要执行了
                xhr.onreadystatechange = null;

            }, optionsNew.timeout);
        }

        xhr.send( optionsNew.data );
    },

    get: function( url, data, fn ) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function(){};
        jQuery.ajax({
            url: url,
            data: data,
            success: fn
        });
    },

    post: function( url, data, fn ) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function(){};
        jQuery.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: fn
        });
    },

    // 加载JSON数据
    getJSON: function( url, data, fn ) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function(){};
        jQuery.ajax({
            dataType: 'JSON',
            url: url,
            data: data,
            success: fn
        });
    },

    // 加载js脚本
    getScript: function( url, data, fn ) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function(){};
        jQuery.ajax({
            dataType: 'script',
            url: url,
            data: data,
            success: fn
        });
    },

    // 加载样式
    getCss: function( url, data, fn ) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function(){};
        jQuery.ajax({
            dataType: 'style',
            url: url,
            data: data,
            success: fn
        });
    }
});