/**
 * @file app.js
 * @author lavas
 */

var ACTIVE_CLASS_NAME = 'active';
var DEFAULT_TYPE = 'index';
var SKELETON_SHOW_CLASS_NAME = 'show';
var $navItems = document.querySelectorAll('.nav-item');
var $article = document.querySelector('#article');
var $skeleton = document.querySelector('.skeleton');

var data = {

    index: [
        'App Shell 架构是构建 Progressive Web App 的一种方式，这种应用能可靠且即时地加载到您的用户屏幕上，',
        '与本机应用相似。App“shell”是支持用户界面所需的最小的 HTML、CSS 和 JavaScript，如果离线缓存，可确保在用户重复访问时提供即时、',
        '可靠的良好性能。这意味着并不是每次用户访问时都要从网络加载 App Shell。 只需要从网络中加载必要的内容。',
        '对于使用包含大量 JavaScript 的架构的单页应用来说，App Shell 是一种常用方法。这种方法依赖渐进式缓存 Shell（使用服务工作线程）',
        '让应用运行。接下来，为使用 JavaScript 的每个页面加载动态内容。App Shell 非常适合用于在没有网络的情况下',
        '将一些初始 HTML 快速加载到屏幕上。换个说法，App Shell 就类似于您在开发本机应用时需要向应用商店发布的一组代码。',
        '它是 UI 的主干以及让您的应用成功起步所需的核心组件，但可能并不包含数据。'
    ].join(''),

    recommend: [
        '随着 Web 的快速发展，用户对站点的体验期望值越来越高，前端工程师有时候为了几十毫秒的速度优化而费劲心思，消耗大量时间。',
        '想要让自己的产品在无数产品中脱颖而出，就必须提升产品的性能和体验。在时间成本高昂的今天，响应速度的提升是开发者不得不面对的话题。',
        '前端工程师有很多性能优化的手段，包括 CDN、CSS Sprite、文件的合并压缩、异步加载、资源缓存等等。其实我们绝大部分情况是在干一件事情，',
        '那就是尽量降低一个页面的网络请求成本从而缩短页面加载资源的时间并降低用户可感知的延时。当然减少用户可感知的延时也不仅仅',
        '是在网络请求成本层面，还有浏览器渲染效率，代码质量等等。那么到了今天，如果有人告诉你：“我们的站点可以秒开，',
        '离线的情况下也能浏览，不是 file:// 协议的哦！”，你是不是要送他一个大大的问号脸？',
        '我们这里要讲到的是一个叫做 Service Worker 的东东。'
    ].join(''),

    discovery: [
        'W3C 组织早在 2014 年 5 月就提出过 Service Worker 这样的一个 HTML5 API ，主要用来做持久的离线缓存。当然这个 API 不是凭空而来，',
        '至于其中的由来我们可以简单的捋一捋：浏览器中的 javaScript 都是运行在一个单一主线程上的，在同一时间内只能做一件事情。',
        '随着 Web 业务不断复杂，我们逐渐在 js 中加了很多耗资源、耗时间的复杂运算过程，这些过程导致的性能问题在 WebApp 的复杂化过程中',
        '更加凸显出来。W3C 组织早早的洞察到了这些问题可能会造成的影响，这个时候有个叫 Web Worker 的 API 被造出来了，',
        '这个 API 的唯一目的就是解放主线程，Web Worker 是脱离在主线程之外的，将一些复杂的耗时的活交给它干，完成后通过 postMessage ',
        '方法告诉主线程，而主线程通过 onMessage 方法得到 Web Worker 的结果反馈。一切问题好像是解决了，但 Web Worker 是临时的，',
        '我们能不能有一个东东是一直持久存在的，并且随时准备接受主线程的命令呢？基于这样的需求推出了最初版本的 Service Worker ，',
        'Service Worker 在 Web Worker 的基础上加上了持久离线缓存能力。当然在 Service Worker 之前也有在 HTML5 上做离线缓存',
        '的 API 叫 AppCache, 但是 AppCache 存在很多 不能忍受的缺点。'
    ].join(''),

    user: [
        '我们进入正题，首先介绍针对离线存储数据的建议：对于网址可寻址的资源，使用 Cache API（服务工作线程的一部分）。 对于所有其他数据，',
        '使用 IndexedDB（具有一个 Promise 包装器）。 下面介绍基本原理：上述两个 API 都是异步的（IndexedDB 基于事件的，而 Cache API ',
        '基于 Promise）。 它们也使用网页工作线程、窗口和服务工作线程。 IndexedDB 在每个位置都可用。 服务工作线程（和 Cache API）目前在',
        ' Chrome、Firefox、Opera 中可用，并正在针对 Edge 进行开发。IndexedDB 的 Promise 包装器隐藏了 IndexedDB 库自带的一些强大但',
        '同时也非常复杂的 machinery（例如，事务处理、架构版本）。IndexedDB 将支持 observers，其让您可以轻松实现标签之间的同步。',
        'Safari 10 在其最新的技术预览版中修复了许多长期存在的 IndexedDB 错误。注：一些用户发现 Safari 10 的 IndexedDB 和 PouchDB ',
        '存在稳定性问题，并发现其速度有些慢。在对此问题进行更多研究之前，您的情况可能有所不同。请进行测试并提交浏览器错误，以便 @webkit ',
        '工作任意和相关的 OSS 库作者可以查看。默认情况下，LocalForage、PouchDB、YDN 和 Lovefield 在 Safari 中使用 WebSQL（',
        '因为缺少有效的方法对损坏的 IndexedDB 进行功能测试）。这意味着这些库无需任何额外操作即可在 Safari 10 中使用（只是不直接使用 ',
        'IndexedDB）。对于 PWA，您可以缓存静态资源，从而使用 Cache API 编写您的应用 Application Shell（JS/CSS/HTML 文件），',
        '并从 IndexedDB 填充离线页面数据。针对 IndexedDB 的调试支持目前在 Chrome（Application 标签）、Opera、Firefox',
        '(Storage Inspector) 和 Safari（请参阅 Storage 标签）中可用。'
    ].join('')
};

/**
 * 模拟获取数据
 *
 * @param  {string} type 类型
 * @return {Promise}      promise
 */
function getData(type) {

    var promise = new Promise(function (resolve) {
        setTimeout(function () {
            resolve(data[type]);
        }, 500);
    });

    return promise;

}

function renderData(data) {
    $article.innerHTML = data;
}

function fillPageData(type) {
    showSkeleton();
    getData(type).then(function (data) {
        hideSkeleton();
        renderData(data);
    });
}

function showSkeleton() {
    $skeleton.classList.add(SKELETON_SHOW_CLASS_NAME);
}

function hideSkeleton() {
    $skeleton.classList.remove(SKELETON_SHOW_CLASS_NAME);
}


function bindEvent() {
    document.querySelector('.nav').onclick = function (event) {
        var target = event.target;

        if (target.className.indexOf('nav-item') !== -1) {

            $navItems.forEach(function (navItem) {
                navItem.classList.remove(ACTIVE_CLASS_NAME);
            });
            target.classList.add(ACTIVE_CLASS_NAME);

            var type = target.dataset.id;
            fillPageData(type);

        }
    };
}

function initPage() {
    fillPageData(DEFAULT_TYPE);
    bindEvent();
}

initPage();

