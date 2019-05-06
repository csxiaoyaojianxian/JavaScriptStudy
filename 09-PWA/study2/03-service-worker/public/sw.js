/**
 * service worker
 */
var cacheName = 'cache-v1';
var apiCacheName = 'api-v1';
var cacheFiles = [
    '/',
    './index.html',
    './base64util.js',
    './index.js',
    './style.css',
    './img/book.png',
    './img/loading.svg',
    'https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js'
];

// 监听install事件，安装完成后，进行文件缓存
self.addEventListener('install', function (e) {
    // 安装时首先触发
    console.log('01 - Service Worker 状态： install');
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cacheOpenPromise);
});

// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', function (e) {
    console.log('03 - Service Worker 状态： activate');
    var cachePromise = caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            if (key !== cacheName && key !== apiCacheName) {
                // 删除旧的cache
                return caches.delete(key);
            }
        }));
    })
    e.waitUntil(cachePromise);
    // 注意不能忽略这行代码，否则第一次加载会导致fetch事件不触发
    return self.clients.claim();
});

// 监听请求
self.addEventListener('fetch', function (e) {
    // 是否是需要缓存的XHR请求数据
    var cacheRequestUrls = [
        '/movie'
    ];
    console.log('现在正在请求：' + e.request.url);
    // 判断当前请求是否需要缓存
    var needCache = cacheRequestUrls.some(function (url) {
        return e.request.url.indexOf(url) > -1;
    });
    if (needCache) {
        // 需要缓存
        // 使用fetch请求数据，并将请求结果clone一份缓存到cache
        // 此部分缓存后在browser中使用全局变量caches获取
        caches.open(apiCacheName).then(function (cache) {
            return fetch(e.request).then(function (response) {
                cache.put(e.request.url, response.clone());
                return response;
            });
        });
    } else {
        // 非api请求，直接查询cache
        // 如果有cache则直接返回，否则通过fetch请求
        e.respondWith(
            caches.match(e.request).then(function (cache) {
                return cache || fetch(e.request);
            }).catch(function (err) {
                console.log(err);
                return fetch(e.request);
            })
        );
    }
});

/* ============== */
/* push处理相关部分 */
/* ============== 
浏览器发起订阅，并将订阅信息发送至后端；
将订阅信息保存在服务端，以便今后推送使用；
服务端推送消息，向Push Service发起请求；
浏览器接收Push信息并处理。
*/
// 添加service worker对push的监听
self.addEventListener('push', function (e) {
    var data = e.data;
    if (e.data) {
        data = data.json();
        console.log('push的数据为：', data);
        self.registration.showNotification(data.text);        
    } 
    else {
        console.log('push没有任何数据');
    }
});
/* ============== */