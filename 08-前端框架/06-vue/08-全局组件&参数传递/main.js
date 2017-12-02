//引入 vue
import Vue from 'vue';

import App from './app.vue';

//引入子组件对象
import headerVue from './components/header.vue';
import bodyVue from './components/body.vue';
import footerVue from './components/footer.vue';

//声明全局组件
Vue.component('headerVue', headerVue);
Vue.component('bodyVue', bodyVue);
Vue.component('footerVue', footerVue);

new Vue({
    el: '.app',
    render: c => c(App)
})