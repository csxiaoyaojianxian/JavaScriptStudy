/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 18:30:52
* @Last Modified by:   csxiaoyaojianxian
* @Last Modified time: 2017-02-16 18:32:26
*/

'use strict';
var App = angular.module('app', []);
// 自定义服务
App.factory('format', ['$filter', function ($filter) {
    function format(arg) {
        var s = '';
        for(var key in arg) {
            s += key + '=' + arg[key] + '&';
        }
        s = s.slice(0, -1);
        return s;
    }
    function author() {
        alert('by CS逍遥剑仙');
    }
    return {
        format: format,
        author: author
    }
}]);