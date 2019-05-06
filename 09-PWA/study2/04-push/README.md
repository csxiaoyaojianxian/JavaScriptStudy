## 1. 引言
在之前的几篇文章中，我和大家分享了如何使用manifest（以及meta标签）让你的Web App更加“native”；以及如何使用Service Worker来cache资源，加速Web App的访问速度，提供部分离线功能。在接下来的内容里，我们会探究PWA中的另一个重要功能——消息推送与提醒（Push & Notification）。这个能力让我们可以从服务端向用户推送各类消息并引导用户触发相应交互。

![Web Push效果](https://user-gold-cdn.xitu.io/2018/4/13/162bc97ba69e1679?w=1284&h=746&f=gif&s=1843125)

实际上，消息推送与提醒是两个功能——Push API 和 Notification API。为了大家能够更好理解其中的相关技术，我也会分为Push（推送消息）与Notification（展示提醒）两部分来介绍。在这一篇里，我们先来学习如何使用Push API进行消息推送。

> Push API 和 Notification API其实是两个独立的技术，完全可以分开使用；不过Push API 和 Notification API相结合是一个常见的模式。

## 2. 浏览器是如何实现服务器消息Push的
Web Push的整个流程相较之前的内容来说有些复杂。因此，在进入具体技术细节之前，我们需要先了解一下整个Push的基本流程与相关概念。

如果你对Push完全不了解，可能会认为，Push是我们的服务端直接与浏览器进行交互，使用长连接、WebSocket或是其他技术手段来向客户端推送消息。然而，这里的Web Push并非如此，它其实是一个三方交互的过程。

在Push中登场的三个重要“角色”分别是：
- 浏览器：就是我们的客户端
- Push Service：专门的Push服务，你可以认为是一个第三方服务，目前chrome与firefox都有自己的Push Service Service。理论上只要浏览器支持，可以使用任意的Push Service
- 后端服务：这里就是指我们自己的后端服务

下面就介绍一下这三者在Web Push中是如何交互。

### 2.1. 消息推送流程
下图来自[Web Push协议草案](https://tools.ietf.org/html/draft-ietf-webpush-protocol-12)，是Web Push的整个流程：

```
    +-------+           +--------------+       +-------------+
    |  UA   |           | Push Service |       | Application |
    +-------+           +--------------+       |   Server    |
        |                      |               +-------------+
        |      Subscribe       |                      |
        |--------------------->|                      |
        |       Monitor        |                      |
        |<====================>|                      |
        |                      |                      |
        |          Distribute Push Resource           |
        |-------------------------------------------->|
        |                      |                      |
        :                      :                      :
        |                      |     Push Message     |
        |    Push Message      |<---------------------|
        |<---------------------|                      |
        |                      |                      |
```

该时序图表明了Web Push的各个步骤，我们可以将其分为订阅（subscribe）与推送（push）两部分来看。

- **subscribe**，首先是订阅：
    1. Ask Permission：这一步不再上图的流程中，这其实是浏览器中的策略。浏览器会询问用户是否允许通知，只有在用户允许后，才能进行后面的操作。
    1. Subscribe：浏览器（客户端）需要向Push Service发起订阅（subscribe），订阅后会得到一个[`PushSubscription`](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)对象
    2. Monitor：订阅操作会和Push Service进行通信，生成相应的订阅信息，Push Service会维护相应信息，并基于此保持与客户端的联系；
    3. Distribute Push Resource：浏览器订阅完成后，会获取订阅的相关信息（存在于`PushSubscription`对象中），我们需要将这些信息发送到自己的服务端，在服务端进行保存。

![](https://user-gold-cdn.xitu.io/2018/4/12/162ba587f2a42eca?w=832&h=207&f=png&s=28689)

- **Push Message**，然后是推送：
    1. Push Message阶段一：我们的服务端需要推送消息时，不直接和客户端交互，而是通过Web Push协议，将相关信息通知Push Service；
    2. Push Message阶段二：Push Service收到消息，通过校验后，基于其维护的客户端信息，将消息推送给订阅了的客户端；
    3. 最后，客户端收到消息，完成整个推送过程。

![](https://user-gold-cdn.xitu.io/2018/4/12/162ba59261481104?w=817&h=218&f=png&s=31789)

### 2.2. 什么是Push Service
在上面的Push流程中，出现了一个比较少接触到的角色：Push Service。那么什么是Push Service呢？

> A push service receives a network request, validates it and delivers a push message to the appropriate browser.

Push Service可以接收网络请求，校验该请求并将其推送给合适的浏览器客户端。Push Service还有一个非常重要的功能：当用户离线时，可以帮我们保存消息队列，直到用户联网后再发送给他们。

目前，不同的浏览器厂商使用了不同的Push Service。例如，chrome使用了google自家的FCM（前身为GCM），firefox也是使用自家的服务。那么我们是否需要写不同的代码来兼容不同的浏览器所使用的服务呢？答案是并不用。Push Service遵循[Web Push Protocol](https://tools.ietf.org/html/draft-ietf-webpush-protocol-12)，其规定了请求及其处理的各种细节，这就保证了，不同的Push Service也会具有标准的调用方式。

这里再提一点：我们在上一节中说了Push的标准流程，其中第一步就是浏览器发起订阅，生成一个`PushSubscription`对。Push Service会为每个发起订阅的浏览器生成一个唯一的URL，这样，我们在服务端推送消息时，向这个URL进行推送后，Push Service就会知道要通知哪个浏览器。而这个URL信息也在`PushSubscription`对象里，叫做`endpoint`。

![](https://user-gold-cdn.xitu.io/2018/4/14/162bfd2d499ba656?w=1408&h=300&f=png&s=86505)

那么，如果我们知道了`endpoint`的值，是否就代表我们可以向客户端推送消息了呢？并非如此。下面会简单介绍一下Web Push中的安全策略。

### 2.3. 如何保证Push的安全性
在Web Push中，为了保证客户端只会收到其订阅的服务端推送的消息（其他的服务端即使在拿到`endpoint`也无法推送消息），需要对推送信息进行数字签名。该过程大致如下：

在Web Push中会有一对公钥与私钥。客户端持有公钥，而服务端持有私钥。客户端在订阅时，会将公钥发送给Push Service，而Push Service会将该公钥与相应的`endpoint`维护起来。而当服务端要推送消息时，会使用私钥对发送的数据进行数字签名，并根据数字签名生成一个叫】`Authorization`请求头。Push Service收到请求后，根据`endpoint`取到公钥，对数字签名解密验证，如果信息相符则表明该请求是通过对应的私钥加密而成，也表明该请求来自浏览器所订阅的服务端。反之亦然。

![](https://user-gold-cdn.xitu.io/2018/4/12/162ba68f0d4a5861?w=998&h=441&f=png&s=83966)

而公钥与私钥如何生成，会在第三部分的实例中讲解。

## 3. 如何使用Push API来推送向用户推送信息
到这里，我们已经基本了解了Web Push的流程。光说不练假把式，下面我就通过具体代码来说明如何使用Web Push。

这部分会基于[sw-cache](https://github.com/alienzhou/learning-pwa/tree/sw-cache)分支上的代码，继续增强我们的“图书搜索”WebApp。

为了使文章与代码更清晰，将Web Push分为这几个部分：
1. 浏览器发起订阅，并将订阅信息发送至后端；
2. 将订阅信息保存在服务端，以便今后推送使用；
3. 服务端推送消息，向Push Service发起请求；
4. 浏览器接收Push信息并处理。

> 友情提醒：由于Chrome所依赖的Push Service——FCM在国内不可访问，所以要正常运行demo中的代码需要“梯子”，或者可以选择Firefox来进行测试。

### 3.1. 浏览器（客户端）生成subscription信息
首先，我们需要使用`PushManager`的`subscribe`方法来在浏览器中进行订阅。

在[《让你的WebApp离线可用》](https://juejin.im/post/5aca14b6f265da237c692e6f)中我们已经知道了如何注册Service Worker。当我们注册完Service Worker后会得到一个`Registration`对象，通过调用`Registration`对象的`registration.pushManager.subscribe()`方法可以发起订阅。

为了使代码更清晰，本篇demo在之前的基础上，先抽离出Service Worker的注册方法：

```javascript
// index.js
function registerServiceWorker(file) {
    return navigator.serviceWorker.register(file);
}
```

然后定义了`subscribeUserToPush()`方法来发起订阅：

```javascript
// index.js
function subscribeUserToPush(registration, publicKey) {
    var subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: window.urlBase64ToUint8Array(publicKey)
    }; 
    return registration.pushManager.subscribe(subscribeOptions).then(function (pushSubscription) {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        return pushSubscription;
    });
}

```

这里使用了`registration.pushManager.subscribe()`方法中的两个配置参数：`userVisibleOnly`和`applicationServerKey`。

- `userVisibleOnly`表明该推送是否需要显性地展示给用户，即推送时是否会有消息提醒。如果没有消息提醒就表明是进行“静默”推送。在Chrome中，必须要将其设置为`true`，否则浏览器就会在控制台报错：

![userVisibleOnly不为true时的报错信息](https://user-gold-cdn.xitu.io/2018/4/13/162ba99a6b69af03?w=1458&h=120&f=png&s=58047)

- `applicationServerKey`是一个客户端的公钥，[VAPID](https://tools.ietf.org/html/draft-thomson-webpush-vapid-02)定义了其规范，因此也可以称为VAPID keys。如果你还记得2.3中提到的安全策略，应该对这个公钥不陌生。该参数需要Unit8Array类型。因此定义了一个[`urlBase64ToUint8Array`](https://github.com/alienzhou/learning-pwa/blob/push/public/base64util.js)方法将base64的公钥字符串转为Unit8Array。`subscribe()`也是一个Promise方法，在then中我们可以得到订阅的相关信息——一个`PushSubscription`对象。下图展示了这个对象中的一些信息。注意其中的`endpoint`，Push Service会为每个客户端随机生成一个不同的值.

![PushSubscription信息](https://user-gold-cdn.xitu.io/2018/4/14/162bfd2d499ba656?w=1408&h=300&f=png&s=86505)

之后，我们再将`PushSubscription`信息发送到后端。这里定义了一个`sendSubscriptionToServer()`方法，该方法就是一个普通的XHR请求，会向接口post订阅信息，为了节约篇幅就不列出具体代码了。

最后，将这一系列方法组合在一起。当然，使用Web Push前，还是需要进行特性检测`'PushManager' in window`。

```javascript
// index.js
if ('serviceWorker' in navigator && 'PushManager' in window) {
    var publicKey = 'BOEQSjdhorIf8M0XFNlwohK3sTzO9iJwvbYU-fuXRF0tvRpPPMGO6d_gJC_pUQwBT7wD8rKutpNTFHOHN3VqJ0A';
    // 注册service worker
    registerServiceWorker('./sw.js').then(function (registration) {
        console.log('Service Worker 注册成功');
        // 开启该客户端的消息推送订阅功能
        return subscribeUserToPush(registration, publicKey);
    }).then(function (subscription) {
        var body = {subscription: subscription};
        // 为了方便之后的推送，为每个客户端简单生成一个标识
        body.uniqueid = new Date().getTime();
        console.log('uniqueid', body.uniqueid);
        // 将生成的客户端订阅信息存储在自己的服务器上
        return sendSubscriptionToServer(JSON.stringify(body));
    }).then(function (res) {
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });
}
```

注意，这里为了方便我们后面的推送，为每个客户端生成了一个唯一ID`uniqueid`，这里使用了时间戳生成简单的`uniqueid`。

此外，由于`userVisibleOnly`为`true`，所以需要用户授权开启通知权限，因此我们会看到下面的提示框，选择“允许”即可。你可以在设置中进行通知的管理。

![](https://user-gold-cdn.xitu.io/2018/4/12/162ba85304cba1f5?w=724&h=340&f=png&s=39311)

### 3.2. 服务端存储客户端subscription信息
为了存储浏览器post来的订阅信息，服务端需要增加一个接口`/subscription`，同时添加中间件`koa-body`用于处理body

```javascript
// app.js
const koaBody = require('koa-body');
/**
 * 提交subscription信息，并保存
 */
router.post('/subscription', koaBody(), async ctx => {
    let body = ctx.request.body;
    await util.saveRecord(body);
    ctx.response.body = {
        status: 0
    };
});
```

接收到subscription信息后，需要在服务端进行保存，你可使用任何方式来保存它：mysql、redis、mongodb……这里为了方便，我使用了[nedb](https://github.com/louischatriot/nedb)来进行简单的存储。nedb不需要部署安装，可以将数据存储在内存中，也可以持久化，nedb的api和mongodb也比较类似。

这里`util.saveRecord()`做了这些工作：首先，查询`subscription`信息是否存在，若已存在则只更新`uniqueid`；否则，直接进行存储。

至此，我们就将客户端的订阅信息存储完毕了。现在，就可以等待今后推送时使用。

### 3.3. 使用subscription信息推送信息
在实际中，我们一般会给运营或产品同学提供一个推送配置后台。可以选择相应的客户端，填写推送信息，并发起推送。为了简单起见，我并没有写一个推送配置后台，而只提供了一个post接口`/push`来提交推送信息。后期我们完全可以开发相应的推送后台来调用该接口。

```javascript
// app.js
/**
 * 消息推送API，可以在管理后台进行调用
 * 本例子中，可以直接post一个请求来查看效果
 */
router.post('/push', koaBody(), async ctx => {
    let {uniqueid, payload} = ctx.request.body;
    let list = uniqueid ? await util.find({uniqueid}) : await util.findAll();
    let status = list.length > 0 ? 0 : -1;

    for (let i = 0; i < list.length; i++) {
        let subscription = list[i].subscription;
        pushMessage(subscription, JSON.stringify(payload));
    }

    ctx.response.body = {
        status
    };
});
```

来看一下`/push`接口。

1. 首先，根据post的参数不同，我们可以通过`uniqueid`来查询某条订阅信息：`util.find({uniqueid})`；也可以从数据库中查询出所有订阅信息：`util.findAll()`。
2. 然后通过`pushMessage()`方法向Push Service发送请求。根据第二节的介绍，我们知道，该请求需要符合Web Push协议。然而，Web Push协议的请求封装、加密处理相关操作非常繁琐。因此，Web Push为各种语言的开发者提供了一系列对应的库：[Web Push Libaray](https://github.com/web-push-libs)，目前有NodeJS、PHP、Python、Java等。把这些复杂而繁琐的操作交给它们可以让我们事半功倍。
3. 最后返回结果，这里只是简单的根据是否有订阅信息来进行返回。

安装node版web-push

```bash
npm install web-push --save
```

前面我们提到的公钥与私钥，也可以通过web-push来生成

![](https://user-gold-cdn.xitu.io/2018/4/13/162badb18824ff12?w=644&h=159&f=png&s=26820)

使用web-push非常简单，首先设置VAPID keys：

```javascript
// app.js
const webpush = require('web-push');
/**
 * VAPID值
 * 这里可以替换为你业务中实际的值
 */
const vapidKeys = {
    publicKey: 'BOEQSjdhorIf8M0XFNlwohK3sTzO9iJwvbYU-fuXRF0tvRpPPMGO6d_gJC_pUQwBT7wD8rKutpNTFHOHN3VqJ0A',
    privateKey: 'TVe_nJlciDOn130gFyFYP8UiGxxWd3QdH6C5axXpSgM'
};

// 设置web-push的VAPID值
webpush.setVapidDetails(
    'mailto:alienzhou16@163.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
```
设置完成后即可使用`webpush.sendNotification()`方法向Push Service发起请求。

最后我们来看下`pushMessage()`方法的细节：

```javascript
// app.js
/**
 * 向push service推送信息
 * @param {*} subscription 
 * @param {*} data 
 */
function pushMessage(subscription, data = {}) {
    webpush.sendNotification(subscription, data, options).then(data => {
        console.log('push service的相应数据:', JSON.stringify(data));
        return;
    }).catch(err => {
        // 判断状态码，440和410表示失效
        if (err.statusCode === 410 || err.statusCode === 404) {
            return util.remove(subscription);
        }
        else {
            console.log(subscription);
            console.log(err);
        }
    })
}
```
`webpush.sendNotification`为我们封装了请求的处理细节。状态码401和404表示该subscription已经无效，可以从数据库中删除。

### 3.4. Service Worker监听Push消息
调用`webpush.sendNotification()`后，我们就已经把消息发送至Push Service了；而Push Service会将我们的消息推送至浏览器。

要想在浏览器中获取推送信息，只需在Service Worker中监听`push`的事件即可：

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

## 4. 效果展示
我们同时使用firefox与chrome来访问该WebApp，并分别向这两个客户端推送消息。我们可以使用console中打印出来的uniqueid，在postman中发起`/push`请求进行测试。

![Web Push效果](https://user-gold-cdn.xitu.io/2018/4/13/162bc954b09d78cf?w=1277&h=774&f=gif&s=2877596)

可以看到，我们分别向firefox与chrome中推送了“welcome to PWA”这条消息。console中的输出来自于Service Worker中对push事件的监听。而弹出的浏览器提醒则来自于之前提到的、订阅时配置的`userVisibleOnly: true`属性。在后续的文章里，我继续带大家了解Notification API（提醒）的使用。

正如前文所述，Push Service可以在设备离线时，帮你维护推送消息。当浏览器设备重新联网时，就会收到该推送。下面展示了在设备恢复联网后，就会收到推送：

![恢复网络则会收到推送消息](https://user-gold-cdn.xitu.io/2018/4/14/162bfe83b578881f?w=2560&h=1600&f=gif&s=2478281)

## 5. 万恶的兼容性
又到了查看[兼容性](https://caniuse.com/#search=push)的时间了。比较重要的是，对于Push API，目前Safari团队并没有明确表态计划支持。

![](https://user-gold-cdn.xitu.io/2018/4/13/162bfa0147d2b40d?w=2346&h=918&f=png&s=192351)

当然，其实比兼容性更大的一个问题是，Chrome所依赖的FCM服务在国内是无法访问的，而Firefox的服务在国内可以正常使用。这也是为什么在代码中会有这一项设置：

```javascript
const options = {
    // proxy: 'http://localhost:1087' // 使用FCM（Chrome）需要配置代理
};
```

上面代码其实是用来配置web-push代理的。这里有一点需要注意，目前从npm上安装的web-push是不支持设置代理选项的。针对这点github上专门有[issue](https://github.com/web-push-libs/web-push/issues/280)进行了讨论，并在最近（两周前）合入了[相应的PR](https://github.com/web-push-libs/web-push/commit/f099ec8ff97e86fb6778ece04bd27a36ef93655e)。因此，如果需要web-push支持代理，简单的方式就是基于master进行web-push代码的相应调整。

虽然由于google服务被屏蔽，导致国内Push功能无法在chrome上使用，但是作为一个重要的技术点，Web Push还是非常值得我们了解与学习的。

## 6. 写在最后
本文中所有的代码示例均可以在[learn-pwa/push](https://github.com/alienzhou/learning-pwa/tree/push)上找到。注意在git clone之后，切换到push分支。切换其他分支可以看到不同的版本：
- basic分支：基础项目demo，一个普通的图书搜索应用（网站）；
- manifest分支：基于basic分支，添加manifest等功能；
- sw-cache分支：基于manifest分支，添加缓存与离线功能；
- push分支：基于sw-cache分支，添加服务端消息推送功能；
- master分支：应用的最新代码。

如果你喜欢或想要了解更多的PWA相关知识，欢迎关注我，关注[《PWA学习与实践》](https://juejin.im/user/59ad5377518825244d206d2d/posts)系列文章。我会总结整理自己学习PWA过程的遇到的疑问与技术点，并通过实际代码和大家一起实践。

## 参考资料
- [Generic Event Delivery Using HTTP Pus (draft-ietf-webpush-protocol-12)](https://tools.ietf.org/html/draft-ietf-webpush-protocol-12)
- [FCM简单介绍](https://segmentfault.com/a/1190000010977980)
- [How Push Works](https://developers.google.com/web/fundamentals/push-notifications/how-push-works)