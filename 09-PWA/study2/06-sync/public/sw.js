/**
 * service worker
 */
var cacheName = 'bs-0-2-0';
var apiCacheName = 'api-0-1-1';
var cacheFiles = [
    '/',
    './index.html',
    './base64util.js',
    './index.js',
    './style.css',
    './img/book.png',
    './img/loading.svg'
];

// 监听install事件，安装完成后，进行文件缓存
self.addEventListener('install', function (e) {
    console.log('Service Worker 状态： install');
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cacheOpenPromise);
});

// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', function (e) {
    console.log('Service Worker 状态： activate');
    var cachePromise = caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            if (key !== cacheName && key !== apiCacheName) {
                return caches.delete(key);
            }
        }));
    })
    e.waitUntil(cachePromise);
    // 注意不能忽略这行代码，否则第一次加载会导致fetch事件不触发
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    // 需要缓存的xhr请求
    var cacheRequestUrls = [
        '/book?'
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
    }
    else {
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

/* ======================================= */
/* push处理相关部分，已添加对notification的调用 */
/* ======================================= */
self.addEventListener('push', function (e) {
    var data = e.data;
    if (e.data) {
        data = data.json();
        console.log('push的数据为：', data);
        var title = 'PWA即学即用';
        var options = {
            body: data,
            icon: '/img/icons/book-128.png',
            image: '/img/icons/book-521.png', // no effect
            actions: [{
                action: 'show-book',
                title: '去看看'
            }, {
                action: 'contact-me',
                title: '联系我'
            }],
            tag: 'pwa-starter',
            renotify: true
        };
        self.registration.showNotification(title, options);        
    } 
    else {
        console.log('push没有任何数据');
    }
});
/* ======================================= */
/* ================= fin ================= */
/* ======================================= */

/* ======================== */
/* notification demo相关部分 */
/* ======================= */
self.addEventListener('notificationclick', function (e) {
    var action = e.action;
    console.log(`action tag: ${e.notification.tag}`, `action: ${action}`);
    
    switch (action) {
        case 'show-book':
            console.log('show-book');
            break;
        case 'contact-me':
            console.log('contact-me');
            break;
        default:
            console.log(`未处理的action: ${e.action}`);
            action = 'default';
            break;
    }
    e.notification.close();

    e.waitUntil(
        // 获取所有clients
        self.clients.matchAll().then(function (clients) {
            if (!clients || clients.length === 0) {
                self.clients.openWindow && self.clients.openWindow('http://127.0.0.1:8085');
                return;
            }
            clients[0].focus && clients[0].focus();
            clients.forEach(function (client) {
                // 使用postMessage进行通信
                client.postMessage(action);
            });
        })
    );
});
/* ======================= */
/* ========= fin ========= */
/* ======================= */



/* =========================== */
/* background sync demo相关部分 */
/* =========================== */
class SimpleEvent {
    constructor() {
        this.listenrs = {};
    }

    once(tag, cb) {
        this.listenrs[tag] || (this.listenrs[tag] = []);
        this.listenrs[tag].push(cb);
    }

    trigger(tag, data) {
        this.listenrs[tag] = this.listenrs[tag] || [];
        let listenr;
        while (listenr = this.listenrs[tag].shift()) {
            listenr(data)
        }
    }
}

const simpleEvent = new SimpleEvent();
self.addEventListener('sync', function (e) {
    console.log(`service worker需要进行后台同步，tag: ${e.tag}`);
    var init = {
        method: 'GET'
    };
    if (e.tag === 'sample_sync') {
        var request = new Request(`sync?name=AlienZHOU`, init);
        e.waitUntil(
            fetch(request).then(function (response) {
                response.json().then(console.log.bind(console));
                return response;
            })
        );
    }

    // sample_sync_event同步事件，使用postMessage来进行数据通信
    else if (e.tag === 'sample_sync_event') {
        let msgPromise = new Promise(function (resolve, reject) {
            // 监听message事件中触发的事件通知
            simpleEvent.once('bgsync', function (data) {
                resolve(data);
            });
            // 五秒超时
            setTimeout(resolve, 5000);
        });

        e.waitUntil(
            msgPromise.then(function (data) {
                var name = data && data.name ? data.name : 'anonymous';
                var request = new Request(`sync?name=${name}`, init);
                return fetch(request)
            }).then(function (response) {
                response.json().then(console.log.bind(console));
                return response;
            })
        );
    }

    // sample_sync_db同步事件，使用indexedDB来获取需要同步的数据
    else if (e.tag === 'sample_sync_db') {
        // 将数据库查询封装为Promise类型的请求
        var dbQueryPromise = new Promise(function (resolve, reject) {
            var STORE_NAME = 'SyncData';
            // 连接indexedDB
            openStore(e.tag).then(function (db) {
                try {
                    // 创建事务进行数据库查询
                    var tx = db.transaction(STORE_NAME, 'readonly');
                    var store = tx.objectStore(STORE_NAME);
                    var dbRequest = store.get(e.tag);
                    dbRequest.onsuccess = function (e) {
                        resolve(e.target.result);
                    };
                    dbRequest.onerror = function (err) {
                        reject(err);
                    };
                }
                catch (err) {
                    reject(err);
                }
            });
        });

        e.waitUntil(
            // 通过数据库查询获取需要同步的数据
            dbQueryPromise.then(function (data) {
                console.log(data);
                var name = data && data.name ? data.name : 'anonymous';
                var request = new Request(`sync?name=${name}`, init);
                return fetch(request)
            }).then(function (response) {
                response.json().then(console.log.bind(console));
                return response;
            })
        );
    }
});

self.addEventListener('message', function (e) {
    var data = JSON.parse(e.data);
    var type = data.type;
    var msg = data.msg;
    console.log(`service worker收到消息 type：${type}；msg：${JSON.stringify(msg)}`);

    simpleEvent.trigger(type, msg);
});

/**
 * 连接并打开存储
 * @param {string} storeName 存储的名称
 * @return {Promise}
 */
function openStore(storeName) {
    return new Promise(function (resolve, reject) {
        var request = indexedDB.open('PWA_DB', 1);
        request.onerror = function(e) {
            console.log('连接数据库失败');
            reject(e);
        }
        request.onsuccess = function(e) {
            console.log('连接数据库成功');
            resolve(e.target.result);
        }
    });
}
/* =========================== */
/* =========== fin =========== */
/* =========================== */
