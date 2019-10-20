/**
 * 安装 jquery 操作 dom
 * $ npm install jquery --save
 */

import { jsdom } from 'jsdom';

import $ from 'jquery'


const addDivToBody = () => {
	$('body').append('<div/>')
};

export default addDivToBody