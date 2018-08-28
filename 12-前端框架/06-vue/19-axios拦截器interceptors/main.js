import Vue from 'vue';
import App from './components/app.vue';
import Axios from 'axios';
//引入mint-ui
import Mint from 'mint-ui'; //  export default 整个对象
// import { Indicator } from 'mint-ui'; //export 整个对象.Indicator -> {Indicator}
//引入css
import 'mint-ui/lib/style.css';
//安装插件，注册一堆全局组件
Vue.use(Mint);

Axios.defaults.baseURL = 'http://www.csxiaoyao.com/api/';
//默认设置
Axios.defaults.headers = {
    accept: 'defaults'
};

//拦截器，在请求之前
Axios.interceptors.request.use(function(config) {
    // 注意：同时设置了Axios.defaults.headers和拦截器config.headers，以拦截器为准
    // config.headers = { xxx }

    Mint.Indicator.open();
    //请求发起之前  显示loadding
    return config;
})

Axios.interceptors.response.use(function(config) {
    //在响应回来之后  隐藏loadding
    Mint.Indicator.close();
    // console.log(config);
    return config;
})

Vue.prototype.$axios = Axios;
new Vue({
    el: '#app',
    render: c => c(App),
})