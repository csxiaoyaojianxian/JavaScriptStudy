## 1. 引言
在第五篇文章[《Web中进行服务端消息推送》](https://juejin.im/post/5accd1355188252b0b201fb9)中，我介绍了如何使用Push API进行服务端消息推送。提到Push就不得不说与其联系紧密的另一个API——Notification API。它让我们可以在“网站外”显示消息提示：

![](https://user-gold-cdn.xitu.io/2018/5/1/1631a562ba773ddd?w=1275&h=762&f=gif&s=384884)

即使当你切换到其他Tab，也可以通过提醒交互来快速让用户回到你的网站；甚至当用户离开当前网站，仍然可以收到系统的提醒消息，并且可以通过消息提醒快速打开你的网站。

![](https://user-gold-cdn.xitu.io/2018/5/1/1631b52052cccb59?w=1270&h=676&f=gif&s=2317289)

Notification的功能本身与Push并不耦合，你完全可以只使用Notification API或者Push API来构建Web App的某些功能。因此，本文会先介绍如何使用Notification API。然后，作为Notification的“黄金搭档”，本文还会介绍如何组合使用Push & Notification（消息推送与提醒）。

## 2. 使用Notification API
在这第二节里，我们先来了解如何独立使用Notification功能。相较于第五篇中的Push功能，Notification API更加简洁易懂。

### 2.1. 获取提醒权限

首先，进行调用消息提醒API需要获得用户的授权。

在调用Notification相关API之前，需要先使用`Notification`对象上的静态方法`Notification.requestPermission()`来获取授权。由于`Notification.requestPermission()`在某些版本浏览器中会接收一个回调函数（`Notification.requestPermission(callback)`）作为参数，而在另一些浏览器版本中会返回一个promise，因此将该方法进行包装，统一为promise调用：

```javascript
// index.js
function askPermission() {
    return new Promise(function (resolve, reject) {
        var permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });
  
        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    }).then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        }
    });
}


registerServiceWorker('./sw.js').then(function (registration) {
    return Promise.all([
        registration,
        askPermission()
    ])
 })
```
我们创建了一个`askPermission()`方法来统一`Notification.requestPermission()`的调用形式，并在Service Worker注册完成后调用该方法。调用`Notification.requestPermission()`获取的`permissionResult`可能的值为：

- denied：用户拒绝了通知的显示
- granted：用户允许了通知的显示
- default：因为不知道用户的选择，所以浏览器的行为与denied时相同

chrome中，可以在`chrome://settings/content/notifications`里进行通知的设置与管理。

### 2.2. 设置你的提醒内容
获取用户授权后，我们就可以通过`registration.showNotification()`方法进行消息提醒了。

当我们注册完Service Worker后，`then`方法的回调函数会接收一个`registration`参数，通过调用其上的`showNotification()`方法即可触发提醒：

```javascript
// index.js
registerServiceWorker('./sw.js').then(function (registration) {
    return Promise.all([
        registration,
        askPermission()
    ])
}).then(function (result) {
    var registration = result[0];
    /* ===== 添加提醒功能 ====== */
    document.querySelector('#js-notification-btn').addEventListener('click', function () {
        var title = 'PWA即学即用';
        var options = {
            body: '邀请你一起学习',
            icon: '/img/icons/book-128.png',
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
        registration.showNotification(title, options);
    });
    /* ======================= */
})
```

上面这段代码为页面上的button添加了一个click事件监听：当点击后，调用`registration.showNotification()`方法来显示消息提醒，该方法接收两个参数：`title`与`option`。`title`用来设置该提醒的主标题，`option`中则包含了一些其他设置。

- body：提醒的内容
- icon：提醒的图标
- actions：提醒可以包含一些自定义操作
- tag：相当于是ID，通过该ID标识可以操作特定的notification
- renotify：是否允许重复提醒，默认为false。当不允许重复提醒时，同一个tag的notification只会显示一次

![](https://user-gold-cdn.xitu.io/2018/5/1/1631a6c6007ffec9?w=800&h=300&f=jpeg&s=114296)

![](https://user-gold-cdn.xitu.io/2018/5/1/1631a6f12cc17f0c?w=800&h=161&f=jpeg&s=66563)

> 注意，由于不同浏览器中，对于`option`属性的支持情况并不相同。部分属性在一些浏览器中并不支持。

### 2.3. 捕获用户的点击
在上一部分中，我们已经为Web App添加了提醒功能。点击页面中的“提醒”按钮，系统就会弹出提醒框，并展示相关提醒消息。

然而更多的时候，我们并不仅仅希望只展示有限的信息，更希望能引导用户进行交互。例如推荐一本新书，让用户点击阅读或购买。在上一部分我们设置的提醒框中，包含了“去看看”和“联系我”两个按钮选项，那么怎么做才能捕获用户的点击操作，并且知道用户点击了哪个呢？这一小节，就会告诉你如何实现。

还记的上一部分里我们定义的actions么？

```javascript
…
actions: [{
    action: 'show-book',
    title: '去看看'
    }, {
    action: 'contact-me',
    title: '联系我'
}]
…
```
为了能够响应用户对于提醒框的点击事件，我们需要在Service Worker中监听`notificationclick`事件。在该事件的回调函数中我们可以获取点击的相关信息：

```javascript
// sw.js
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
});
```

`e.action`获取的值，就是我们在`showNotification()`中定义的actions里的action。因此，通过`e.action`就可以知道用户点击了哪一个操作选项。注意，当用户点击提醒本身时，也会触发`notificationclick`，但是不包含任何action值，所以在代码中将其置于default默认操作中。

现在试一下，我们就可以捕获用户对于不同选项的点击了。点击后在Console中会有不同的输出。

![](https://user-gold-cdn.xitu.io/2018/5/1/1631a855e6ac1712?w=1120&h=188&f=png&s=52210)

### 2.4. Service Worker与client通信
到目前为止，我们已经可以顺利得给用户展示提醒，并且在用户操作提醒后准确捕获到用户的操作。然而，还缺最重要的一步——针对不同的操作，触发不同的交互。例如，
- 点击提醒本身会弹出书籍简介；
- 点击“看一看”会给用户展示本书的详情；
- 点击“联系我”会向应用管理者发邮件等等。

这里有个很重要的地方：我们在Service Worker中捕获用户操作，但是需要在client（这里的client是指前端页面的脚本环境）中触发相应操作（调用页面方法/进行页面跳转…）。因此，这就需要让Service Worker与client进行通信。通信包括下面两个部分：

1. 在Service Worker中使用Worker的`postMessage()`方法来通知client：

```javascript
// sw.js
self.addEventListener('notificationclick', function (e) {
    …… // 略去上一节内容
    
    e.waitUntil(
        // 获取所有clients
        self.clients.matchAll().then(function (clients) {
            if (!clients || clients.length === 0) {
                return;
            }
            clients.forEach(function (client) {
                // 使用postMessage进行通信
                client.postMessage(action);
            });
        })
    );
});
```

2. 在client中监听`message`事件，判断`data`，进行不同的操作：

```javascript
// index.js
navigator.serviceWorker.addEventListener('message', function (e) {
    var action = e.data;
    console.log(`receive post-message from sw, action is '${e.data}'`);
    switch (action) {
        case 'show-book':
            location.href = 'https://book.douban.com/subject/20515024/';
            break;
        case 'contact-me':
            location.href = 'mailto:someone@sample.com';
            break;
        default:
            document.querySelector('.panel').classList.add('show');
            break;
    }
});
```

当用户点击提醒后，我们在`notificationclick`监听中，将action通过`postMessage()`通信给client；然后在client中监听`message`事件，基于action（`e.data`）来进行不同的操作（跳转到图书详情页/发送邮件/显示简介面板）。

至此，一个比较简单与完整的消息提醒（Notification）功能就完成了。

然而目前的消息提醒还存在一定的局限性。例如，只有在用户访问网站期间才能有机会触发提醒。正如本文一开始所说，Push & Notification的结合将会帮助我们构筑一个强大推送与提醒功能。下面就来看下它们的简单结合。

## 3. 消息推送与提醒
在第五篇[《Web中进行服务端消息推送》](https://juejin.im/post/5accd1355188252b0b201fb9)最后，我们通过监听`push`事件来处理服务端推送：

```javascript
// sw.js
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
```

简单修改以上代码，与我们本文中的提醒功能相结合：

```javascript
// sw.js
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
```

使用Push来向用户推送信息，并在Service Worker中直接调用Notification API来展示该信息的提醒框。这样，即使是在用户关闭该Web App时，依然可以收到提醒，类似于Native中的消息推送与提醒。

我们还可以将这个功能再丰富一些。由于用户在关闭该网站时仍然可以收到提醒，因此加入一些更强大功能：
- 当用户切换到其他Tab时，点击提醒会立刻回到网站的tab；
- 当用户未打开该网站时，点击提醒可以直接打开网站。

```javascript
// sw.js
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
                // 当不存在client时，打开该网站
                self.clients.openWindow && self.clients.openWindow('http://127.0.0.1:8085');
                return;
            }
            // 切换到该站点的tab
            clients[0].focus && clients[0].focus();
            clients.forEach(function (client) {
                // 使用postMessage进行通信
                client.postMessage(action);
            });
        })
    );
});
```

注意这两行代码，第一行会在网站关闭时打开该网站，第二行会在存在tab时自动切换到网站的tab。

```javascript
self.clients.openWindow && self.clients.openWindow('http://127.0.0.1:8085');

clients[0].focus && clients[0].focus();
```

![](https://user-gold-cdn.xitu.io/2018/5/1/1631b52052cccb59?w=1270&h=676&f=gif&s=2317289)

## 4. MacOS Safari中的Web Notification
看一下[Web Notification的兼容性](https://caniuse.com/#search=notification)：

![](https://user-gold-cdn.xitu.io/2018/5/1/1631afa349ff2f0c?w=2344&h=918&f=png&s=222023)

目前移动端浏览器普遍还不支持该特性。但是在Mac OS上的safari里面是支持该特性的，不过其调用方式与上文代码有些不太一样。在safari中使用Web Notification不是调用`registration.showNotification()`方法，而是需要创建一个Notification对象。

```javascript
// index.js
……
document.querySelector('#js-notification-btn').addEventListener('click', function () {
    var title = 'PWA即学即用';
    var options = {
        body: '邀请你一起学习',
        icon: '/img/icons/book-128.png',
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
    // registration.showNotification(title, options);

    // 使用Notification构造函数创建提醒框
    // 而非registration.showNotification()方法
    var notification = new Notification(title, options);
});
……
```
Notification对象继承自EventTarget接口，因此在safari中需要通过添加click事件的监听来触发提醒框的交互操作：

```javascript
// index.js
notification.addEventListener('click', function (e) {
    document.querySelector('.panel').classList.add('show');
});
```

![](https://user-gold-cdn.xitu.io/2018/5/1/1631b1ef1e592c36?w=677&h=369&f=gif&s=308375)

该功能示例可以在[learn-pwa/notify4safari](https://github.com/alienzhou/learning-pwa/tree/notify4safari)中找到。

## 5. 写在最后
Web Notification是一个非常强大的API，尤其在和Push结合后，为WebApp带来了类似Native的丰富能力。

本文中所有的代码示例均可以在[learn-pwa/notification](https://github.com/alienzhou/learning-pwa/tree/notification)上找到。

如果你喜欢或想要了解更多的PWA相关知识，欢迎关注我，关注[《PWA学习与实践》](https://juejin.im/user/59ad5377518825244d206d2d/posts)系列文章。我会总结整理自己学习PWA过程的遇到的疑问与技术点，并通过实际代码和大家一起实践。

到目前为止，我们已经学习了[Manifest](https://juejin.im/post/5ac8a89ef265da238440d60a)、[离线缓存](https://juejin.im/post/5aca14b6f265da237c692e6f)、[消息推送](https://juejin.im/post/5accd1355188252b0b201fb9)、消息提醒、[Debug](https://juejin.im/post/5ae56f926fb9a07aca79edf6)等一些基础知识。在下一篇文章里，我们会继续了解与学习PWA中的一个重要功能——后台同步。

## 《PWA学习与实践》系列
- [第一篇：2018，开始你的PWA学习之旅](https://juejin.im/post/5ac8a67c5188255c5668b0b8)
- [第二篇：10分钟学会使用Manifest，让你的WebApp更“Native”](https://juejin.im/post/5ac8a89ef265da238440d60a)
- [第三篇：从今天起，让你的WebApp离线可用](https://juejin.im/post/5aca14b6f265da237c692e6f)
- [第四篇：TroubleShooting: 解决FireBase login验证失败问题](https://juejin.im/post/5accc3c9f265da23870f2abc)
- [第五篇：与你的用户保持联系: Web Push功能](https://juejin.im/post/5accd1355188252b0b201fb9)
- [第六篇：How to Debug? 在chrome中调试你的PWA](https://juejin.im/post/5ae56f926fb9a07aca79edf6)
- 第七篇：增强交互：使用Notification API来进行提醒（本文）
- 第八篇：使用Service Worker进行后台数据同步（写作中……）

## 参考资料
- [MDN: notification](https://developer.mozilla.org/zh-CN/docs/Web/API/notification)
- [MDN: ServiceWorkerRegistration.showNotification()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)
- [MDN: WindowClient](https://developer.mozilla.org/en-US/docs/Web/API/WindowClient)
- [MDN: Clients](https://developer.mozilla.org/en-US/docs/Web/API/Clients)
- [WWDC2013](https://developer.apple.com/videos/play/wwdc2013/614/)
