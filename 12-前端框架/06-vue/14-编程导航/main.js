import Vue from 'vue';
import App from './components/app.vue';

import VueRouter from 'vue-router';
//路由切换页面
import Music from './components/music.vue'
import Movie from './components/movie.vue'

//安装插件
Vue.use(VueRouter); //挂载属性

// this.$router.go 根据浏览器记录 前进1 后退-1
// this.$router.push(直接跳转到某个页面显示)
//     push参数: 字符串 /xxx
//     {name:'xxx',query:{id:1},params:{name:2}}

//创建路由对象并配置路由规则
let router = new VueRouter({
    routes: [
        { name: 'music', path: '/music', component: Music },
        { name: 'movie', path: '/movie', component: Movie }
    ]
});

//new Vue 启动
new Vue({
    el: '#app',
    // router:router,
    router, //可以简写router
    render: c => c(App),
});