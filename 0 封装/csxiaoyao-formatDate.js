/*
* @Author: SUNSHINE
* @Date:   2017-03-17 15:28:39
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-17 18:00:39
*/

'use strict';
// 时间格式化
Date.prototype.format = function(data){ 
	// 星期转换
	var convertWeek = function(day, language){
		var data;
		switch(language){
			case "ch":
				data = ["日","一","二","三","四","五","六"];
				return data[day];
			case "en":
				data = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
				return data[day];
			default:
				return day;
		}
	}
	var o = {
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"S": this.getMilliseconds(), //millisecond 3位
		"T": convertWeek(this.getDay(),"ch"), //week 中文
		"t": convertWeek(this.getDay(),"en"), //week 英文
		"w": this.getDay(), //week number
	}
	// 单独处理年份
	if (/(y+)/.test(data)) {
		// RegExp.$1 第一个子匹配
		data = data.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	// 处理其他属性
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(data)) {
			// 按长度赋值
			data = data.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return data;
}

//使用方法
console.log(new Date().format("yy-MM-dd hh:mm:ss S 星期T t w 第qq季度")); // 17-03-17 17:57:40 749 星期五 Friday 5 第01季度
console.log(new Date().format("M/dd/yyyy")); // 3/17/2017
console.log(new Date(1489559523256).format("yyyy-MM-dd")); // 2017-03-15
console.log(new Date("Fri Feb 10 2017 02:00:33 GMT+0800 (中国标准时间)").format("yyyy-MM-dd")); // 2017-03-15