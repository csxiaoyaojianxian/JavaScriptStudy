import Vue from 'vue';
import App from './components/app.vue';

import Axios from 'axios';

Axios.defaults.baseURL = 'http://www.csxiaoyao.com/api/';

//给Vue原型挂载属性
Vue.prototype.$axios = Axios;

new Vue({
    el: '#app',
    render: c => c(App),
})