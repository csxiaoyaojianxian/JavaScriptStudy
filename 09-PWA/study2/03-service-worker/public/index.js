(function() {
    /**
     * 生成列表卡片（dom元素）
     * @param {Object} movie 相关数据
     */
    function createCard(movie) {
        var li = document.createElement('li');
        // var img = document.createElement('img');
        var title = document.createElement('div');
        var genres = document.createElement('div');
        var desc = document.createElement('div');
        var casts = document.createElement('span');
        title.className = 'title';
        genres.className = 'genres';
        desc.className = 'desc';
        // img.src = movie.image;
        title.innerText = movie.title;
        genres.innerText = movie.genres.join(', ');
        casts.innerText = movie.casts.map((ele) => { return ele.name }).join(',');
        movie.casts && desc.appendChild(casts);
        // li.appendChild(img);
        li.appendChild(title);
        li.appendChild(genres);
        li.appendChild(desc);

        return li;
    }

    /**
     * 根据获取的数据列表，生成展示列表
     * @param {Array} list 列表数据
     */
    function fillList(list) {
        list.forEach(function (movie) {
            var node = createCard(movie);
            document.querySelector('#js-list').appendChild(node);
        });
    }

    /**
     * 控制tip展示与显示的内容
     * @param {string | undefined} text tip的提示内容
     */
    function tip(text) {
        if (text === undefined) {
            document.querySelector('#js-tip').style = 'display: none';
        }
        else {
            document.querySelector('#js-tip').innerHTML = text;
            document.querySelector('#js-tip').style = 'display: block';
        }
    }

    /**
     * 根据用户输入结果
     * 使用XMLHttpRequest查询并展示数据列表
     */
    function queryMovie() {
        // var input = document.querySelector('#js-search-input');
        // var query = input.value;
        // var url = `https://api.douban.com/v2/movie/search?q=${query}&fields=id,title,image,author,publisher,price&count=10`
        // $.ajax({
        //     contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        //     type : "post",
        //     url : url,
        //     cache : false, //默认值true
        //     dataType : "jsonp",
        //     jsonp: "callback", // 必须，返回的响应需要以此为前缀
        //     success : function(data){
        //         tip();
        //         if (data.subjects.length === 0) {
        //             tip('无结果');
        //         }
        //         else {
        //             input.blur();
        //             fillList(data.subjects);
        //             document.querySelector('#js-thanks').style = 'display: block';
        //         }
        //     }
        // });
        var input = document.querySelector('#js-search-input');
        var query = input.value;
        var xhr = new XMLHttpRequest();
        var url = '/movie?q=' + query + '&fields=id,title,image,author,publisher,price';
        var cacheData;
        if (query === '') {
            tip('请输入关键词');
            return;
        }
        document.querySelector('#js-list').innerHTML = '';
        document.querySelector('#js-thanks').style = 'display: none';
        loading(true);
        var remotePromise = getApiDataRemote(url);
        // 策略：优先读缓存，同时获取远程数据，如果远程数据和本地不同，更新
        getApiDataFromCache(url).then(function (data) {
            if (data) {
                loading(false);
                input.blur();            
                fillList(data.books);
                document.querySelector('#js-thanks').style = 'display: block';
            }
            cacheData = data || {};
            return remotePromise;
        }).then(function (data) {
            if (JSON.stringify(data) !== JSON.stringify(cacheData)) {
                loading(false);                
                input.blur();
                fillList(data.books);
                document.querySelector('#js-thanks').style = 'display: block';
            }
        });
    }

    /**
     * 监听“搜索”按钮点击事件
     */
    document.querySelector('#js-search-btn').addEventListener('click', function () {
        queryMovie();
    });

    /**
     * 监听“回车”事件
     */
    window.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            queryMovie();
        }
    });

    /**
     * 获取该请求的缓存数据
     * @param {string} url 请求的url
     * @return {Promise}
     */
    function getApiDataFromCache(url) {
        if ('caches' in window) {
            return caches.match(url).then(function (cache) {
                if (!cache) {
                    return;
                }
                return cache.json();
            });
        }
        else {
            return Promise.resolve();
        }
    }

    function getApiDataRemote(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.timeout = 60000;
            xhr.onreadystatechange = function () {
                var response = {};
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        response = JSON.parse(xhr.responseText);
                    }
                    catch (e) {
                        response = xhr.responseText;
                    }
                    resolve(response);
                } else if (xhr.readyState === 4) {
                    resolve();
                }
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.open('GET', url, true);
            xhr.send(null);
        });
    }

    /* ========================== */
    /* service worker push相关部分 */
    /* ========================== */
    /**
     * 将service worker的注册封装为一个方法，方便使用
     * @param {string} file service worker文件路径
     * @return {Promise}
     */
    function registerServiceWorker(file) {
        return navigator.serviceWorker.register(file);
    }

    /**
     * 用户订阅相关的push信息，用来发起订阅
     * 会生成对应的pushSubscription数据，用于标识用户与安全验证
     * @param {ServiceWorker Registration} registration
     * @param {string} publicKey 公钥
     * @return {Promise}
     */
    function subscribeUserToPush(registration, publicKey) {
        var subscribeOptions = {
            userVisibleOnly: true, // 显性提醒
            applicationServerKey: window.urlBase64ToUint8Array(publicKey)
        }; 
        return registration.pushManager.subscribe(subscribeOptions).then(function (pushSubscription) {
            console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
            return pushSubscription;
        });
    }

    /**
     * 将浏览器生成的subscription信息提交到服务端
     * 服务端保存该信息用于向特定的客户端用户推送
     * 普通的XHR请求，会向接口post订阅信息
     * @param {string} body 请求体
     * @param {string} url 提交的api路径，默认为/subscription
     * @return {Promise}
     */
    function sendSubscriptionToServer(body, url) {
        url = url || '/subscription';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.timeout = 60000;
            xhr.onreadystatechange = function () {
                var response = {};
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        response = JSON.parse(xhr.responseText);
                    }
                    catch (e) {
                        response = xhr.responseText;
                    }
                    resolve(response);
                }
                else if (xhr.readyState === 4) {
                    resolve();
                }
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(body);
        });
    }

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        var publicKey = 'BOEQSjdhorIf8M0XFNlwohK3sTzO9iJwvbYU-fuXRF0tvRpPPMGO6d_gJC_pUQwBT7wD8rKutpNTFHOHN3VqJ0A';
        // 注册service worker
        registerServiceWorker('./sw.js').then(function (registration) {
            // 安装完成后触发
            console.log('02 - Service Worker 注册成功');
            // 开启该客户端的消息推送订阅功能
            return subscribeUserToPush(registration, publicKey);
        }).then(function (subscription) {
            console.log('将生成的客户端订阅信息存储在自己的服务器上');
            // 将生成的客户端订阅信息存储在自己的服务器上
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
    /* ========================== */
})();