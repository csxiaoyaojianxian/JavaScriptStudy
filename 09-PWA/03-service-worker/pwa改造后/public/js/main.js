/**
 * @file main.js
 */

define(function (require) {
    'use strict';
    let axios = require('axios');
    let render = require('./render');
    let ui = require('./ui');
    // 异步请求数据，并在前端渲染
    axios.get('/api/movies').then(function (response) {
        let $movieList = document.querySelector('.movie-list');
        if (response.status !== 200) {
            $movieList.innerHTML = '网络错误';
            return;
        }
        $movieList.innerHTML = render(response.data);
    });
    /**
     * 注册 service worker 流程
     */
    // 判断是否能使用 service worker
    if ('serviceWorker' in navigator) {
        // 等待页面加载完成后再执行 service worker 注册
        window.addEventListener('load', function (event) {
            // 注册 service worker
            navigator.serviceWorker.register('/sw.js', {
                    // 作用域，只能比当前service worker的域小，例如：/a/b/sw.js，scope可以为/a/b/c/，若为/a会报错
                    scope: '/'
                })
                .then(function (registeration) {
                    // 注册成功回调
                    console.log('Service worker register success with scope ' + registeration.scope);
                });
        });

        // 页面更新
        navigator.serviceWorker.oncontrollerchange = function (event) {
            ui.showToast('页面已更新', 'info');
        };

        // 如果用户处于断网状态进入页面，用户可能无法感知内容是过期，需要提示用户断网了，并在重新连接后告诉用户
        if (!window.navigator.onLine) {
            ui.showToast('网络断开，内容可能已过期', 'info');

            window.addEventListener('online', function () {
                ui.showToast('已连接网络', 'info');
            });

        }
    }
});
