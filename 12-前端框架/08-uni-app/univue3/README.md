<!--
 * @Author: victorsun victorsun@tencent.com
 * @Date: 2024-04-14 12:13:49
 * @LastEditors: victorsun victorsun@tencent.com
 * @LastEditTime: 2024-04-24 00:24:44
 * @FilePath: /JavaScriptStudy/12-前端框架/08-uni-app/univue3/README.md
 * @Description: 
-->
# uni-app study


新建 common 目录并优先存放资源，因为 static 目录下的内容无论是否使用都会被打包



引入全局 css
在 App.vue 中
```
<style lang="scss">
@import "common/style/common-style.scss";
</style>
```

## 1.

配置微信开发者工具，注意设置安全配置，开放端口

eval5
binding.js


css处理刘海屏底部安全区

```css
.float {
  padding-bottom: env(safe-area-inset-bottom);
}
```


vue样式穿透
```
:deep() {
  .uni-icons {
    color: #eee;
  }
}
```



跳转切换底部tab，navigator 标签需要添加属性 open-type="reLaunch"



css

width: fit-content;





