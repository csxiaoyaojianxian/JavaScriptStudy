import Vue from 'vue';
import App from './components/app.vue';

// 引入vue-resource，老式，不推荐
import VueResource from 'vue-resource';

// 安装插件
Vue.use(VueResource); //插件都是挂载属性

new Vue({
    el: '#app',
    render: c => c(App),
})