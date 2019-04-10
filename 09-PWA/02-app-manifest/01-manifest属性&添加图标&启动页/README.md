介绍 Web App Manifest 相关的基础知识，学习如何使网站可以添加至手机桌面。

## Usage

1. ` npm install `
2. ` npm run start`
3. 访问 http://localhost:8080
4. 学习和修改 `manifest.json` 中的相关设置

关注 manifest.json 和 index.html

// manifest.json
{
  "dir": "ltr",
  "lang": "en",
  "name": "xxx",
  "scope": "/",
  "display": "standalone",
  "start_url": "/",
  "short_name": "xxx",
  "theme_color": "transparent",
  "description": "xxxxxx",
  "orientation": "any",
  "background_color": "transparent",
  "related_applications": [],
  "prefer_related_applications": false,
  "icons": [{
    "src": "assets/img/logo/size-32.png",
    "sizes": "32x32",
    "type": "image/png"
  }, {
    "src": "assets/img/logo/size-48.png",
    "sizes": "48x48",
    "type": "image/png"
  }],
  "gcm_sender_id": "...",
  "applicationServerKey": "..."
}