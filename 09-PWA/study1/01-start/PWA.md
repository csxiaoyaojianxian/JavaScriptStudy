# pwa
progressive web apps

## 1. 特点
快速：缓存
可靠：断网访问
粘性：图标

## 2. 技术
web app manifest
service worker
push api & notification api
app shell & app skeleton

## 3. 基础
https

## 4. 改造过程
step1: 全站 HTTPS 化，HTTPS 是 PWA 的基础，没有 HTTPS 就没有 Service Worker
step2: Service Worker 提升基础性能，离线提供静态文件，提升用户首屏体验
step3: App Manifest，可以和第二步同时进行
step4: 离线消息推送等其他特性