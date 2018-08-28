//1:引入 vue
import Vue from 'vue';

import App from './app.vue';

//引入子组件对象
import sub from './components/sub.vue';

Vue.component('subVue', sub);

new Vue({
    el: '.app',
    render: c => c(App)
})