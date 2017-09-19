/*
* @Author: SUNSHINE
* @Date:   2017-03-22 16:09:57
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-29 17:15:13
*/

'use strict';

(function(window, undefined){

	var csxiaoyao = (function() {
		// 构建csxiaoyao对象
		var csxiaoyao = function( selector, context ) {
			return new csxiaoyao.fn.init( selector, context, root );
		}

		// csxiaoyao对象原型
		csxiaoyao.fn = csxiaoyao.prototype = {
			constructor: csxiaoyao,
			init: function( selector, context, root ) {
				if ( !selector ) {
					return this;
				}
				// 其他分支 ……
			}
		}

		// csxiaoyao.fn.init原型赋值，便于实例化
		csxiaoyao.fn.init.prototype = csxiaoyao.fn;

		// 在csxiaoyao上扩展静态方法
		csxiaoyao.extend = csxiaoyao.fn.extend = function(options) {
			var target = this;
	        var copy;
	        for(name in options) {
	            copy = options[name];
	            target[name] = copy;
	        }
	        return target;
		};

		// 直接添加在构造函数上，工具方法
	    csxiaoyao.extend({
	        isFunction: function() {},
	        type: function() {},
	        parseHTML: function() {},
	        parseJSON: function() {},
	        ajax: function() {}
	        // ...
	    })

	    // 添加到原型上
	    csxiaoyao.fn.extend({
	        queue: function() {},
	        promise: function() {},
	        attr: function() {},
	        prop: function() {},
	        addClass: function() {},
	        removeClass: function() {},
	        val: function() {},
	        css: function() {}
	        // ...
	    })
    
		return csxiaoyao;
	})();

	window.csxiaoyao = window.$$ = csxiaoyao;

})(window);