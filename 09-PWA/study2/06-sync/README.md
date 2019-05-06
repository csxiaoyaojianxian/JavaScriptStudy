## 1. 引言
生活中经常会有这样的场景：

用户拿出手机，浏览着我们的网站，发现了一个很有趣的信息，点击了“提交”按钮。然而不幸的是，这时用户到了一个网络环境极差的地方，或者是根本没有网络。他能够做的只有看着页面上的提示框和不断旋转的等待小圆圈。1s、5s、30s、1min……无尽的等待后，用户将手机放回了口袋，而这一次的请求也被终止了——由于当下极差的网络终止在了客户端。

上面的场景其实暴露了两个问题：

1. 普通的页面发起的请求会随着浏览器进程的结束/或者Tab页面的关闭而终止；
2. 无网环境下，没有一种机制能“维持”住该请求，以待有网情况下再进行请求。

然而，Service Worker的后台同步功能规避了这些缺陷。下面就让我们先来了解下后台同步（Background Sync）的工作原理。

## 2. 后台同步是如何工作的？

后台同步应该算是Service Worker相关功能（API）中比较易于理解与使用的一个。

其大致的流程如下：

![](https://user-gold-cdn.xitu.io/2018/5/13/1635905056b125a7?w=573&h=129&f=png&s=8623)

1. 首先，你需要在Service Worker中监听sync事件；
2. 然后，在浏览器中发起后台同步sync（图中第一步）；
3. 之后，会触发Service Worker的sync事件，在该监听的回调中进行操作，例如向后端发起请求（图中第二步）
4. 最后，可以在Service Worker中对服务端返回的数据进行处理。

由于Service Worker在用户关闭该网站后仍可以运行，因此该流程名为“后台同步”实在是非常贴切。

怎么样，在我们已经有了一定的Service Worker基础之后，后台同步这一功能相比之前的功能，是不是非常易于理解？

## 3. 如何使用后台同步功能？

既然已经理解了该功能的大致流程，那么接下来就让我们来实际操作一下吧。

### 3.1 client触发sync事件

```javascript
// index.js
navigator.serviceWorker.ready.then(function (registration) {
    var tag = "sample_sync";
    document.getElementById('js-sync-btn').addEventListener('click', function () {
        registration.sync.register(tag).then(function () {
            console.log('后台同步已触发', tag);
        }).catch(function (err) {
            console.log('后台同步触发失败', err);
        });
    });
});
```
由于后台同步功能需要在Service Worker注册完成后触发，因此较好的一个方式是在`navigator.serviceWorker.ready`之后绑定相关操作。例如上面的代码中，我们在ready后绑定了按钮的点击事件。当按钮被点击后，会使用`registration.sync.register()`方法来触发Service Worker的sync事件。

`registration.sync`返回一个[`SyncManager`对象](https://developer.mozilla.org/en-US/docs/Web/API/SyncManager)，其上包含`register`和`getTags`两个方法：

> `register()` Create a new sync registration and return a Promise. 

> `getTags()` Return a list of developer-defined identifiers for SyncManager registration.

`register()`方法可以注册一个后台同步事件，其中接收的参数`tag`用于作为这个后台同步的唯一标识。

当然，如果想要代码更健壮的话，我们还需要在调用前进行特性检测：

```javascript
// index.js
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    // ……
}
```

### 3.2 在Service Worker中监听sync事件
当client触发了sync事件后，剩下的就交给Service Worker。理论上此时就不需要client（前端站点）参与了。例如另一个经典场景：用户离开时页面（unload）时在client端触发sync事件，剩下的操作交给Service Worker，Service Worker的操作可以在离开页面后正常进行。

像添加fetch和push事件监听那样，我们可以为Service Worker添加sync事件的监听：

```javascript
// sw.js
self.addEventListener('sync', function (e) {
    // ……
});
```

在sync事件的event对象上可以取到tag值，该值就是我们在上一节注册sync时的唯一标识。通过这个tag就可以区分出不同的后台同步事件。例如，当该值为'sample_sync'时我们向后端发送一个请求：

```javascript
// sw.js
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
});
```
这里我通过`e.tag`来判断client触发的不同sync事件，并在监听到tag为'sample_sync'的sync事件后，构建了一个request对象，使用fetch API来进行后端请求。

需要特别注意的是，fetch请求一定要放在`e.waitUntil()`内。因为我们要保证“后台同步”，将Promise对象放在`e.waitUntil()`内可以确保在用户离开我们的网站后，Service Worker会持续在后台运行，等待该请求完成。

### 3.3 完善我们的后端服务
实际上，经过上面两小节，我们的大致工作已经完成。不过还缺少一个小环节：我们的KOA服务器上还没有sync路由和接口。添加一下，以保证demo可以正常运行：

```javascript
// app.js
router.get('/sync', async (ctx, next) => {
    console.log(`Hello ${ctx.request.query.name}, I have received your msg`);
    ctx.response.body = {
        status: 0
    };
});
```

### 3.4 Demo效果展示

下面就来看一下这个demo的运行效果：

![](https://user-gold-cdn.xitu.io/2018/5/13/1635975104e68836?w=800&h=499&f=gif&s=1947627)

可以看到，在网络环境正常的情况下，点击“同步”按钮会立即触发Service Worker中的sync事件监听，并向服务端发送请求；而在断网情况下，点击“同步”按钮，控制台虽然显示注册了同步事件，但是并不会触发Service Worker的sync监听回调，指到恢复网络连接，才会在后台（Service Worker）中进行相关处理。

下面再来看一下触发sync事件后，关闭网站的效果：

![](https://user-gold-cdn.xitu.io/2018/5/13/163598ca174364ed?w=800&h=499&f=gif&s=2269837)

可以看到，即使在关闭网站后再重新连接网络，服务端依然可以收到来自客户端的请求（说明Service Worker在后台进行了相关处理）。

## 4. 如何在后台同步时获取所需的数据？

其实上一节结束，我们就已经可以了解最基础的后台同步功能了。而这部分则会进一步探讨后台同步中的一个重要问题：如何在后台同步时获取并发送client中的数据？

例如在我们的上一个Demo中，用户的姓名name是硬编码在Service Worker中的，而实际上，我们希望能在页面上提供一个输入框，将用户的输入内容在后台同步中进行发送。

实现的方式有两种：使用postMessage或使用indexedDB。

### 4.1 使用postMessage

我们知道，在浏览器主线程与Web Worker线程之间可以通过postMessage来进行通信。因此，我们也可以使用这个方法来向Service Worker“传输”数据。

大致思路如下：

1. client触发sync事件；
2. 在sync注册完成后，使用postMessage和Service Worker通信；
3. 在Service Worker的sync事件回调中等待message事件的消息；
4. 收到message事件的消息后，将其中的信息提交到服务端。

```javascript
// index.js
// 使用postMessage来传输sync数据
navigator.serviceWorker.ready.then(function (registration) {
    var tag = 'sample_sync_event';

    document.getElementById('js-sync-event-btn').addEventListener('click', function () {
        registration.sync.register(tag).then(function () {
            console.log('后台同步已触发', tag);

            // 使用postMessage进行数据通信
            var inputValue = document.querySelector('#js-search-input').value;
            var msg = JSON.stringify({type: 'bgsync', msg: {name: inputValue}});
            navigator.serviceWorker.controller.postMessage(msg);
        }).catch(function (err) {
            console.log('后台同步触发失败', err);
        });
    });
});
```

在`registration.sync.register`完成后，调用`navigator.serviceWorker.controller.postMessage`来向Service Worker Post数据。

为了提高代码的可维护性，我在sw.js中创建了一个`SimpleEvent`类，你可以把它看做一个最简单的EventBus。用来解耦Service Worker的message事件和sync事件。

```javascript
// sw.js
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
```

在message事件中监听client发来的消息，并通过SimpleEvent通知所有监听者。

```javascript
// sw.js
const simpleEvent = new SimpleEvent();
self.addEventListener('message', function (e) {
    var data = JSON.parse(e.data);
    var type = data.type;
    var msg = data.msg;
    console.log(`service worker收到消息 type：${type}；msg：${JSON.stringify(msg)}`);

    simpleEvent.trigger(type, msg);
});
```

在sync事件中，使用SimpleEvent监听bgsync来获取数据，然后再调用fetch方法。注意，由于`e.waitUntil()`需要接收Promise作为参数，因此需要对`SimpleEvent.once`进行Promisfy。

```javascript
// sw.js
self.addEventListener('sync', function (e) {
    if (e.tag === xxx) {
        // ……
    }

    // sample_sync_event同步事件，使用postMessage来进行数据通信
    else if (e.tag === 'sample_sync_event') {
        // 将SimpleEvent.once封装为Promise调用
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
});
```

是不是非常简单？

![](https://user-gold-cdn.xitu.io/2018/5/14/1635a5723bed476c?w=800&h=499&f=gif&s=2772919)

进行后台同步时，使用postMessage来实现client向Service Worker的传输数据，方便与直观，是一个不错的方法。

### 4.2 使用indexedDB

在client与Servcie Worker之间同步数据，还有一个可行的思路：client先将数据存在某处，待Servcie Worker需要时再读取使用即可。

为此需要找一个存数据的地方。你第一个想到的可能就是localStorage了。

然而，不知道你是否还记得我在最开始介绍Service Worker时所提到的，为了保证性能，实现部分操作的非阻塞，在Service Worker中我们经常会碰到异步操作（因此大多数API都是Promise形式的）。那么像localStorage这样的同步API会变成异步化么？答案很简单：不会，并且localStorage在Servcie Worker中无法调用。

不过不要气馁，我们还另一个强大的数据存储方式——indexedDB。它是可以在Service Worker中使用的。对于indexedDB的使用方式，本系列后续会有文章具体介绍，因此在这里的就不重点讲解indexedDB的使用方式了。

首先，需要一个方法用于连接数据库并创建相应的store：

```javascript
// index.js
function openStore(storeName) {
    return new Promise(function (resolve, reject) {
        if (!('indexedDB' in window)) {
            reject('don\'t support indexedDB');
        }
        var request = indexedDB.open('PWA_DB', 1);
        request.onerror = function(e) {
            console.log('连接数据库失败');
            reject(e);
        }
        request.onsuccess = function(e) {
            console.log('连接数据库成功');
            resolve(e.target.result);
        }
        request.onupgradeneeded = function (e) {
            console.log('数据库版本升级');
            var db = e.srcElement.result;
            if (e.oldVersion === 0) {
                if (!db.objectStoreNames.contains(storeName)) {
                    var store = db.createObjectStore(storeName, {
                        keyPath: 'tag'
                    });
                    store.createIndex(storeName + 'Index', 'tag', {unique: false});
                    console.log('创建索引成功');
                }
            }
        }
    });
}
```

然后，在`navigator.serviceWorker.ready`中打开该数据库连接，并在点击按钮时，先将数据存入indexedDB，再注册sync：

```javascript
// index.js
navigator.serviceWorker.ready.then(function (registration) {
    return Promise.all([
        openStore(STORE_NAME),
        registration
    ]);
}).then(function (result) {
    var db = result[0];
    var registration = result[1];
    var tag = 'sample_sync_db';

    document.getElementById('js-sync-db-btn').addEventListener('click', function () {
        // 将数据存储进indexedDB
        var inputValue = document.querySelector('#js-search-input').value;
        var tx = db.transaction(STORE_NAME, 'readwrite');
        var store = tx.objectStore(STORE_NAME);
        var item = {
            tag: tag,
            name: inputValue
        };
        store.put(item);

        registration.sync.register(tag).then(function () {
            console.log('后台同步已触发', tag);
        }).catch(function (err) {
            console.log('后台同步触发失败', err);
        });
    });
});
```

同样的，在Service Worker中也需要相应的数据库连接方法：

```javascript
// sw.js
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
```

并且在sync事件的回调中，get到indexedDB中对应的数据，最后再向后端发送请求：

```javascript
// index.js
self.addEventListener('sync', function (e) {
    if (e.tag === xxx) {
        // ……
    }
    else if (e.tag === yyy) {
        // ……
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
```

相比于postMessage，使用indexedDB的方案要更复杂一点。它比较适用于一些需要数据持久化的场景。

![](https://user-gold-cdn.xitu.io/2018/5/14/1635a579ba845ce7?w=800&h=499&f=gif&s=953776)

## 5. 兼容性

依照惯例，我们还是来简单看一下文中相关功能的兼容性。

先是[Background Sync](https://caniuse.com/#search=Background%20Sync%20API)：

![](https://user-gold-cdn.xitu.io/2018/5/13/16359f504955c8b8?w=1240&h=592&f=png&s=134469)

令人悲伤的是，基本只有Google自家的Chrome可用。

然后是[indexedDB](https://caniuse.com/#search=indexedDB)：

![](https://user-gold-cdn.xitu.io/2018/5/13/16359f671e79ba6b?w=1240&h=580&f=png&s=155435)

相较于Background Sync还是有着不错的兼容性的。而且在safari（包括iOS safari）中也得到了支持。

## 6. 写在最后
从文中的内容以及[google developer中的一些实例](https://developers.google.com/web/updates/2015/12/background-sync#the_solution)来看，Background Sync是一个非常有潜力的API。然而令人堪忧的兼容性在一定程度上限制了它的发挥空间。不过，作为一项技术，还是非常值得我们学习与了解的。

本文中所有的代码示例均可以在[learn-pwa/sync](https://github.com/alienzhou/learning-pwa/tree/sync)上找到。

如果你喜欢或想要了解更多的PWA相关知识，欢迎关注我，关注[《PWA学习与实践》](https://juejin.im/user/59ad5377518825244d206d2d/posts)系列文章。我会总结整理自己学习PWA过程的遇到的疑问与技术点，并通过实际代码和大家一起实践。

到目前为止，我们已经学习了PWA中的多个知识点，在其基础上，已经可以帮助我们进行原有站点的PWA升级。学习是一方面，实践是另一方面。在下一篇文章里，我会整理一些在业务中升级PWA时碰到的问题，以及对应的解决方案。

## 参考资料
- [Web Background Synchronization](https://wicg.github.io/BackgroundSync/spec/)
- [MDN: SyncManager](https://developer.mozilla.org/en-US/docs/Web/API/SyncManager)
- [MDN: SyncManager.register()](https://developer.mozilla.org/en-US/docs/Web/API/SyncManager/register)
- [MDN: SyncRegistration](https://developer.mozilla.org/en-US/docs/Web/API/SyncRegistration)
- [Introducing Background Sync](https://developers.google.com/web/updates/2015/12/background-sync)
