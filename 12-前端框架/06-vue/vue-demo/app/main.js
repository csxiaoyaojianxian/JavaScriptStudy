/*
* @Author: csxiaoyao
* @Date:   2017-12-16 21:29:19
* @Last Modified by:   csxiaoyao
* @Last Modified time: 2017-12-21 14:42:36
*/
'use strict';

import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

import './static/vendor/mui/dist/css/mui.css';

import './static/css/global.css';

import Axios from 'axios';
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = "http://localhost/vue-php/demo/";
//Axios:拦截器操作loadding
Axios.interceptors.request.use(function(config){
    //显示图标
    Mint.Indicator.open({
    	text: '加载中...',
    	spinnerType: 'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function(config){
    //隐藏图标
    Mint.Indicator.close();
    //获取到config中的data，进行加工
    return config;
});

import Monent from 'moment';
Vue.filter('convertDate',function(value) {
	return Monent(value).format("YYYY-MM-DD");
});

import VuePreview from 'vue-preview';
Vue.use(VuePreview);

import App from './app.vue';
// 按需加载 懒加载，app.vue 不能懒加载
const Home = resolve => require(['./components/home/home.vue'], resolve);
const Member = resolve => require(['./components/member/member.vue'], resolve);
const Shopcart = resolve => require(['./components/shopcart/shopcart.vue'], resolve);
const Search = resolve => require(['./components/search/search.vue'], resolve);
const NewsList = resolve => require(['./components/news/newsList.vue'], resolve);
const NewsDetail = resolve => require(['./components/news/newsDetail.vue'], resolve);
const PhotoShare = resolve => require(['./components/photo/photoShare.vue'], resolve);
const PhotoDetail = resolve => require(['./components/photo/photoDetail.vue'], resolve);
const GoodsList = resolve => require(['./components/goods/goodsList.vue'], resolve);
const GoodsDetail = resolve => require(['./components/goods/goodsDetail.vue'], resolve);

import NavBar from './components/common/navBar.vue';
Vue.component('navBar',NavBar);
import MySwipe from './components/common/mySwipe.vue';
Vue.component('mySwipe',MySwipe);

let router = new VueRouter({
	linkActiveClass:'mui-active',
	routes:[
		{ path:'/', redirect:{ name:'home' }},
		{ name:'home', path:'/home', component:Home },
		{ name:'member', path:'/member', component:Member },
		{ name:'shopcart', path:'/shopcart', component: Shopcart },
		{ name:'search', path:'/search', component: Search },
		{ name:'news.list', path:'/news/list', component: NewsList },
		{ name:'news.detail', path:'/news/detail', component: NewsDetail },
		{ name:'photo.share', path:'/photo/share', component: PhotoShare },
		{ name:'photo.detail', path:'/photo/detail/:id', component: PhotoDetail },
		{ name:'goods.list', path:'/goods/list', component: GoodsList },
		{ name:'goods.detail', path:'/goods/detail', component: GoodsDetail },
	]
});

new Vue({
	el:'#app',
	router,
	render:c=>c(App)
});