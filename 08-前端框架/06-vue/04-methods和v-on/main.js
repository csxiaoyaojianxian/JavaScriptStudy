//1:引入vue
import Vue from 'vue';
//2:引入app.vue 用他的内容来替换div id = app
import App from './app.vue';
//3:构建vue实例

new Vue({
    //渲染内容的目的地
    el:'.app',  
    //渲染内容
    // render:function(c){ //c只是一个形参，叫什么都可以
    //     return c(App);
    // }
    render: c => c(App)
});