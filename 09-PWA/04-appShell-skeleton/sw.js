var cacheName = 'shell-content';
var filesToCache = [
    '/style.css',
    '/index.html',
    '/' // index.html
];

// 预缓存部分资源
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
            if (response) {
                return response;
            }
            // 如果 service worker 没有返回，那就得直接请求真实远程服务
            var request = event.request.clone(); // 把原始请求拷过来
            return fetch(request).then(function (httpRes) {
                // 请求失败了，直接返回失败的结果就好了。。
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }
                // 请求成功的话，将请求缓存起来。
                var responseClone = httpRes.clone();
                caches.open(cacheName).then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return httpRes;
            });
        })
    );
});
