介绍如何在现有项目中使用 service worker 构建一个具有离线访问能力的 webapp

## Usage

1. ` npm install `
2. ` npm run start`
3. 访问 http://localhost:8080

## 核心章节
main.js 中包含 service worker 的注册
sw.js 包含 service worker 的核心操作
        1. 使用了 sw 新的标志性的存储 cache API
        2. 自定义请求响应

localStorage 的用法和 Service Worker cache 的用法很相似
但是由于 localStorage 是同步的用法，所以不允许在 Service Worker 中使用
IndexedDB 也可以在 Service Worker 内做数据存储
