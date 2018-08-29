/*
* @Author: csxiaoyao
* @Date:   2017-08-24 15:00:22
* @Last Modified by:   csxiaoyao
* @Last Modified time: 2017-08-24 15:59:38
*/
// main.js
// alert("加载成功！");

/**
 * 【 加载方式1 】 参数
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
	// some code here
});
 */

/**
 * 【 加载方式2 】 config
require.config({
	paths: {
		"jquery": "js/jquery.min",
		"underscore": "js/underscore.min",
		"backbone": "js/backbone.min"
	}
});
 */

/**
 * 【 加载方式3 】 config 含 baseUrl
require.config({
	baseUrl: "js/lib",
	paths: {
		"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
		"underscore": "underscore.min",
		"backbone": "backbone.min"
	}
});
 */

/**
 * 【 加载非规范的模块 】
 * shim属性，专门用来配置不兼容的模块，定义
 * 1. exports值（输出的变量名）
 * 2. deps数组，表明该模块的依赖性
require.config({
	shim: {
		'underscore':{
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});
// jQuery的插件可以这样定义：
shim: {
	'jquery.scroll': {
		deps: ['jquery'],
		exports: 'jQuery.fn.scroll'
	}
}
 */

/**
 * 【 require.js插件 】
// domready插件，让回调函数在页面DOM结构加载完成后再运行
require(['domready!'], function (doc){
	// called once the DOM is ready
});
// text和image插件，允许require.js加载文本和图片文件
define([
		'text!review.txt',
		'image!cat.jpg'
	],
	function(review,cat){
		console.log(review);
		document.body.appendChild(cat);
	}
);
 */

require.config({
	baseUrl: "js",
	paths: {
		"mylib": "mylib"
	}
});
require(['mylib'], function (mylib){
	alert(mylib.foo(1,2));
});
