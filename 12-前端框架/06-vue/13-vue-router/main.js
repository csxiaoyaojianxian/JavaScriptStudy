import Vue from 'vue';
import App from './components/app.vue';

// 使用方式
//     - 1:下载 npm i vue-router -S
//     - 2:在main.js中引入 import VueRouter from 'vue-router';
//     - 3:安装插件 Vue.use(VueRouter);
//     - 4:创建路由对象并配置路由规则
//         let router = new VueRouter({ routes:[ {path:'/home',component:Home}  ]   });
//     - 5:将其路由对象传递给Vue的实例，options中
//         options中加入 router:router
//     - 6:在app.vue中留坑 <router-view></router-view>

/*
// 前端路由原理：监视锚点值的改变，触发hashchange的回调函数，将指定的模板数据插入到DOM标识<router-view>上
window.addEventListener('hashchange', function() {
    var text = '';
    switch (location.hash) {
        case '#/music':
            text = '各种音乐的数据';
            break;
        case '#/movie':
            text = '各种电影的数据';
            break;
    }
    document.getElementById('content').innerHTML = text;
})

【 命名路由 】
通过a标签点击，做页面数据的跳转
使用router-link标签
<router-link to="/des">目的地</router-link>
<router-link :to="{name:'sunshine'}">目的地</router-link>

【 参数router-link 】
在vue-router中，有两大对象被挂载到了实例this
$route(只读、具备信息的对象)
$router(具备功能函数)

1、查询字符串方式
<router-link :to="{name:'detail',query:{id:1}  } ">xxx</router-link>
{ name:'detail' , path:'/detail',组件}
获取路由参数: this.$route.query.id

2、path方式，在路由规则上加上/:xxx
<router-link :to="{name:'detail',params:{name:1}  } ">xxx</router-link>
{ name:'detail' , path:'/detail/:name',组件}
获取路由参数: this.$route.params.name
*/

import VueRouter from 'vue-router';

//路由切换页面
import List from './components/list.vue'
import Detail from './components/detail.vue'

//安装插件
Vue.use(VueRouter); //挂载属性

//创建路由对象并配置路由规则
let router = new VueRouter({
    routes: [
        { name: 'list', path: '/list', component: List },
        // 查询字符串方式
        { name: 'detail', path: '/detail', component: Detail },
        // path方式，在路由规则上加上/:xxx
        // {name:'detail',params:{id:index}  } -> /detail/12
        { name: 'detail', path: '/detail/:id', component: Detail }

    ]
});

//new Vue 启动
new Vue({
    el: '#app',
    router, // 简写router
    render: c => c(App),
})