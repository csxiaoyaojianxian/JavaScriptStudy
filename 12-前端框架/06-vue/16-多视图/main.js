import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './components/app.vue';
import header from './components/header.vue'
import footer from './components/footer.vue'

/*
多视图
    一次行为 = 一个坑 + 一个路由 + 一个组件
    一次行为 = 多个坑 + 一个路由 + 多个组件
多个视图
    <router-view></router-view> -> name是default
    <router-view name='xxx'></router-view> -> name是xxx
*/

// 注册全局组件
// Vue.component('headerVue', header);
// Vue.component('footerVue', footer);

//安装插件
Vue.use(VueRouter); //挂载属性

//创建路由对象并配置路由规则
let router = new VueRouter({
    //routes
    routes: [{
            path: '/',
            components: {
                header: footer,
                default: header,
                footer: footer
            }
        }

    ]
});

//new Vue 启动
new Vue({
    el: '#app',
    router,
    render: c => c(App),
})