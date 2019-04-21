/**
 * @file sw.js
 */

let VERSION = 0;
let CACHE_NAME = 'cache_v' + VERSION;
let CACHE_URLS = [
    '/',
    '/api/movies',
    '/css/main.css',
    '/js/main.js',
    '/js/ui.js',
    '/js/render.js',
    '/img/logo.png'
];

/**
 * 可以在 install 的时候进行静态资源缓存
 * 也可以通过 fetch 事件处理回调来代理页面请求从而实现动态资源缓存
 * 
 * on install 的优点是第二次访问即可离线，缺点是需要将需要缓存的 URL 在编译时插入到脚本中，增加代码量和降低可维护性
 * on fetch 的优点是无需更改编译过程，也不会产生额外的流量，缺点是需要多一次访问才能离线可用
 */

// 监听 service worker 的 install 事件
// 下载新的缓存
self.addEventListener('install', function (event) {
    // 如果监听到 service worker 已经安装会调用 event.waitUntil 回调函数
    // event.waitUntil 可以确保 Service Worker 不会在 waitUntil() 里面的代码执行完毕之前安装完成
    event.waitUntil(
        // Service Worker 被载入后立即激活可以保证每次 /sw.js 为最新的
        // 更新后进入 waiting 状态，此时新旧sw并存，需要 skipWaiting 才能执行新sw
        precache().then(self.skipWaiting)
    );
});

// 删除旧的缓存
self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([
            // Clients 接口的 claim() 方法允许一个激活的 service worker 将自己设置为其 scope 内所有 clients 的 controller
            // 这会在由此service worker 控制的任何 clients 中触发 navigator.serviceWorker 上的  "controllerchange"  事件
            //（触发页面更新回调）
            // 更新客户端
            self.clients.claim(),
            // 清理旧版本
            clearStaleCache()
        ])
    );
});

self.addEventListener('fetch', function (event) {
    // 只对同源的资源走 sw，cdn 上的资源利用 http 缓存策略
    if (new URL(event.request.url).origin !== self.origin) {
        return;
    }
    // 限制url
    if (event.request.url.includes('/api/movies')) {
        // event.respondWith(data)
        event.respondWith(
            // 获取数据并更新缓存，获取失败则直接读缓存
            fetchAndCache(event.request)
                .catch(function () {
                    return caches.match(event.request);
                })
        );
        return;
    }
    event.respondWith(
        // 获取数据失败则取缓存
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});

/**
 * cache api
 */
// caches.open(name) 创建了一个名为name的新的缓存
// cache.addAll(Array) 缓存列表资源，传入相对于 origin 的 URL 组成的数组
// cache.put(key, value)
// caches.keys()
// caches.delete(key)
// Cache.match() 返回一个 Promise 解析为(resolve to)与 Cache 对象中的第一个匹配请求相关联的Response，如果没有找到匹配，Promise 解析为 undefined

/**
 * 缓存到 cacheStorage 里
 *
 * @param {Request} req 请求对象
 * @param {Response} res 响应对象
 */
function saveToCache(req, res) {
    // 操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间
    return caches
        .open(CACHE_NAME)
        .then(cache => cache.put(req, res));
}

/**
 * 预缓存
 *
 * @return {Promise} 缓存成功的promise
 */
function precache() {
    return caches.open(CACHE_NAME).then(function (cache) {
        // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
        return cache.addAll(CACHE_URLS);
    });
}

/**
 * 清除过期的 cache
 * 删除非 CACHE_NAME 的缓存数据
 *
 * @return {Promise} promise
 */
function clearStaleCache() {
    return caches.keys().then(keys => {
        keys.forEach(key => {
            if (CACHE_NAME !== key) {
                caches.delete(key);
            }
        });
    });
}

/**
 * 发起请求并缓存内容
 *
 * @param {Request} req request
 * @return {Promise}
 */
function fetchAndCache(req) {
    // fetch 发起请求，res为返回结果
    return fetch(req)
        .then(function (res) {
            // http请求已返回
            // 请求失败则直接返回失败结果，不进行缓存
            if (!res || res.status !== 200) {
                return res
            }
            // 请求成功，缓存克隆的请求 res.clone
            saveToCache(req, res.clone())
            return res
        });
}
