import Vue from 'vue';

//VueRouter:引入路由对象
import VueRouter from 'vue-router';
//VueRouter:安装插件
Vue.use(VueRouter);

//Mint:引入mint-ui
import Mint from 'mint-ui';
//Mint:引入css
import 'mint-ui/lib/style.css';
//Mint:安装插件
Vue.use(Mint);

//MUI:引入mui的样式
import './static/mui/css/mui.css';
//全局样式
import './static/css/global.css';

//Axios:引入axios
import Axios from 'axios';
//挂载原型
Vue.prototype.$ajax = Axios;
//默认配置
Axios.defaults.baseURL = 'http://www.csxiaoyao.com/api/';

//Moment:引入moment
import Moment from 'moment';

//引入全局组件需要的组件对象 开始
// import NavBar from './components/common/navBar.vue';

//定义成全局组件或过滤器，大家都能使用 开始
Vue.filter('convertDate',function(value){
    return Moment(value).format('YYYY-MM-DD');
});
Vue.component('navBar',NavBar); //使用最好以nav-bar

import App from './app.vue';
import Home from './components/home/home.vue';
// import Member from './components/member/member.vue';
// import Shopcart from './components/shopcart/shopcart.vue';
// import Search from './components/search/search.vue';
// import NewsList from './components/news/newsList.vue';
// import NewsDetail from './components/news/newsDetail.vue';

//VueRouter:创建对象并配置路由规则
let router = new VueRouter({
    linkActiveClass:'mui-active',
    routes: [
        //VueRouter：配置路由规则
        { path: '/', redirect: { name: 'home' } }, //重定向
        { name: 'home', path: '/home', component: Home },//首页
        // { name: 'member',path:'/member',component: Member}, //会员
        // { name: 'shopcart',path:'/shopcart',component:Shopcart}, //购物车
        // { name: 'search',path:'/search',component:Search}, //查找
        // { name: 'news.list',path:'/news/list',component:NewsList}, //新闻列表
        // { name: 'news.detail',path:'/news/detail',component:NewsDetail}, //新闻详情
    ]
});

//创建vue实例
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})