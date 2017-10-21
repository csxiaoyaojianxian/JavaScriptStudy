'use strict'

var queryString = require('query-string');
var _ = require('lodash');
var request = {};
var config = require('./config');
var Mock = require('mockjs');

request.get = function(url, params){
	if(params){
		url += '?' + queryString.stringify(params)
	}
	return fetch(url)
		.then((response) => response.json())
		.then((response) => Mock.mock(response))
}

request.post = function(url, body){
	var options = _.extend(config.header,{
		body: JSON.stringify(body)
	});
	return fetch(url,options)
		.then((response) => response.json())
		.then((response) => Mock.mock(response))
}

module.exports = request;