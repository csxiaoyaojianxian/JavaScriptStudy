/** 
 * # 安装ws模块
 * $ npm install ws --save-dev
 */

// 导入WebSocket模块
const WebSocket = require('ws');

// 引用Server类
const WebSocketServer = WebSocket.Server;

// 实例化server
const wss = new WebSocketServer({
    port: 3000
});

// ws连接
wss.on('connection', function (ws) {
    console.log('[SERVER] connection()');
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    });
});

console.log('ws server started at port 3000...');

/*
 * 浏览器中测试
 */
/*
    var ws = new WebSocket('ws://localhost:3000/ws/test'); // path与连接建立无关，但可用来实现不同路由功能
    ws.onmessage = function (msg) {
        console.log(msg);
    };
    ws.send('Hello!');
*/
// 浏览器收到返回结果
// MessageEvent {
//     data: "ECHO: Hello!",
//     origin: "ws://localhost:3000",
//     source: null
//     ...
// }

/**
 *  客户端测试
 */
/*
let ws = new WebSocket('ws://localhost:3000/ws/test');
ws.on('open', function () {
    console.log('[CLIENT] open()');
    ws.send('hello from client on open');
});
ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
    ws.send('hello from client on message');
});
*/