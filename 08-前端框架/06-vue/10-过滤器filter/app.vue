<template>
    <div>
        <pre>
content | 过滤器, vue中没有提供内置过滤器,可以自定义过滤器
组件内过滤器
    - options中的一个filters的属性
全局过滤器
    - Vue.filter(名,fn)
如果出现同名时，优先组件内过滤器
        </pre>        
        <input type="text" name="" v-model="text">
        显示：{{text | myFilter}}

        <!-- 测试组件的范围 -->
        <sub-vue></sub-vue>

        <div></div>
    </div>
</template>
<script>

import SubVue from './sub.vue';
export default {
    filters:{
        myFilter:function(value){
            //输入的内容反转
            //转换成数组，反转数组，转换成字符串
            return value.split('').reverse().join('');
        }
    },
    data(){
        return {
            text:''
        }
    },
    components:{
        subVue:SubVue
    }
}
</script>
<style>
    
</style>