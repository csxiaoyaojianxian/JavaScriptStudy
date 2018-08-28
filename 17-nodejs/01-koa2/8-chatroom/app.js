/*
 * @Author: csxiaoyao 
 * @Date: 2018-04-18 17:53:40 
 * @Last Modified by: csxiaoyao
 * @Last Modified time: 2018-04-23 14:23:14
 */

 // 只接受 ws://localhost:3000/ws/chat 用于区别其他http请求

const url = require('url');
const ws = require('ws');
const Cookies = require('cookies');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const WebSocketServer = ws.Server;

const app = new Koa();

// 是否需要验证用户信息
const isTest = true;
// 用于测试，作为用户ID
let userIndexForTest = 0;

// log request URL:
app.use(async (ctx, next) => {
    // console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 从cookie中取登录态，存到 ctx.state，非ws方式
// app.use(async (ctx, next) => {
//     ctx.state.user = checkAuth(ctx.cookies.get('name') || '');
//     await next();
// });

// parse request body:
app.use(bodyParser());

// add controller middleware:
app.use(controller());

// 启动http服务器监听3000端口
let server = app.listen(3000);

// 创建 websocket server
function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        server: server
    });

    // 广播
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };

    // 指定用户名单播
    wss.unicast = function unicast(data, userName) {
        wss.clients.forEach(function each(client) {
            if(client.auth.name === userName){
                client.send(data);
            }
        });
    };

    // 设置生命周期函数
    onConnection = onConnection || function () { console.log('[WebSocket-default] connected.'); };
    onMessage = onMessage || function (msg) { console.log('[WebSocket-default] message received: ' + msg); };
    onClose = onClose || function (code, message) { console.log(`[WebSocket-default] closed: ${code} - ${message}`); };
    onError = onError || function (err) { console.log('[WebSocket-default] error: ' + err); };

    // websocket连接配置
    wss.on('connection', function (ws,req) {
        let location = url.parse(req.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        let auth = checkAuth(req, isTest);
        if (!auth) {
            // 登录态错误
            ws.close(4001, 'Invalid auth');
            console.log('Invalid auth');
        } else if (location.pathname !== '/ws/chat' && !isTest) {
            // 只接受 ws://localhost:3000/ws/chat 用于区别其他非ws请求
            ws.close(4000, 'Invalid URL');
            console.log('Invalid URL');
        } else {
            // 用户身份信息
            ws.auth = auth;
            // 绑定生命周期函数
            ws.on('message', onMessage);
            ws.on('close', onClose);
            ws.on('error', onError);

            ws.wss = wss;
            // 执行自定义的connection
            onConnection.apply(ws);
        }
    });
    console.log('WebSocketServer was attached.');

    // 心跳  定期清理断开的客户端，3min清理一次，判定超时时间为60s，因为客户端心跳时间为50s
    setInterval(()=>{
        wss.clients.forEach(function each(client) {
            let timeDiff = Date.now() - client.timestamp;
            if(timeDiff > 60 * 1000){
                client.close();
            }
            // wss.unicast(createMessage('msg', null, `hello sunshine`),"sunshine");
        })
        let connNum = Array.from(new Set(wss.clients)).length;
        let connList = Array.from(new Set(getConnList(wss.clients)));
        console.log('当前连接数：' + connNum + '\n当前在线人数：' + connList.length);
    }, 3 * 60 * 1000);

    return wss;
}

// 创建websocket服务
try{
    app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);
}catch(e){
    console.log(e);
}
console.log('app started at port 3000...');

// 消息模板
var messageIndex = 0;
function createMessage(type, auth, data) {
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,   // id
        type: type,         // 消息类型
        auth: auth,         // 用户
        data: data          // 数据
    });
}

// 获取当前用户列表 Map，传入 wss.clients
function getConnList(clients) {
    let connList = new Map();
    clients.forEach(function (client) {
        // console.log(client.auth);
        // 键值格式未定义
        connList.set(client.auth.name, "userInfo");
    });
    return connList;
}

// 获取在线人数
function getLength(map) {
    var count = 0;
    for (var i in map) {
        if (map.hasOwnProperty(i)) {
            count++;
        }
　　}
　　return count;
}

// 自定义生命周期函数
function onConnect() {
    // 获取时间戳绑定到当前client，用户判断客户端是否失联 （onConnect、onMessage）
    this.timestamp = Date.now();
    
    // 获取用户信息，在connection中获取
    let auth = this.auth;
    let connList = getConnList(this.wss.clients);
    console.log(connList);
    // 单发消息，确认连接成功
    // this.send(createMessage('conn', auth, `${auth.name} success login`));
    // 群发消息，通知其他用户
    // this.wss.broadcast(createMessage('msg', auth, `other people ${auth.name} connect success`));
    // 单发消息，发送用户列表
    // this.send(createMessage('list', auth, connList));

}

function onMessage(message) {
    // 获取时间戳绑定到当前client，用户判断客户端是否失联 （onConnect、onMessage）
    this.timestamp = Date.now();
    
    // 用于测试
    if (message == "1"){
        this.send(createMessage('test', null, 'ok'));
        return;
    }

    if(message.length <= 2){
        this.send(createMessage('error', null, 'msg error'));
        return;
    }
    const msgType = message.substring(0, 2);
    const msgData = message.substring(3);
    switch (msgType){
        // 心跳
        case 'hb':
            this.send(createMessage('hb', null, 'ok'));
            break;
        // 聊天消息
        case 'ch':
            // 收到消息后群发 ch:XXX
            console.log(msgData);
            if (msgData && msgData.trim()) {
                let msg = createMessage('chat', this.auth, msgData.trim());
                this.wss.broadcast(msg);
            }
            break;
        // 其他消息
        default:
            console.log(msgData);
    }
}

function onClose() {
    let auth = this.auth;
    // 群发消息
    // this.wss.broadcast(createMessage('close', auth, 'close'));
}

// ws方式取登录态
function checkAuth(obj,istest) {
    // 用于测试，生成auth
    if (istest){
        let auth = {
            name: "anonymous-user" + ++userIndexForTest
        };
        // console.log(`Test checkAuth: ${auth.name}`);
        return auth;
    }
    // 提取登录信息
    if (!obj) {
        return;
    }
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let auth = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`checkAuth: ${auth.name}`);
            return auth;
        } catch (e) {
            console.log('checkAuth failed');
        }
    }
}

/*
配置nginx反向代理

server {
    listen      80;
    server_name localhost;

    # 处理静态资源文件:
    location ^~ /static/ {
        root /path/to/ws-with-koa;
    }

    # 处理WebSocket连接:
    location ^~ /ws/ {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
    }

    # 其他所有请求:
    location / {
        proxy_pass       http://127.0.0.1:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

*/

