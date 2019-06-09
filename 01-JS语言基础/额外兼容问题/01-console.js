// 兼容ie10及以下，创建空console对象避免报错
(function () {
    if(!window.console)
        window.console = {};
    var console = window.console;
    var funcs = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml',
                 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd',
                 'info', 'log', 'markTimeline', 'profile', 'profileEnd',
                 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    for(var i=0;i<funcs.length;i++) {
        var func = funcs[i];
        if(!console[func])
            console[func] = function(){};
    }
    if(!console.memory)
        console.memory = {};
})();