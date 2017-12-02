<template>
    <div>
        <subVue></subVue>
        <button @click="listen">listen</button>
    </div>
</template>
<script>
//引入连接器
import connect from './connector.js';

// 通过 new Vue() 对象, $on('事件名',function(prop1,pro2))
// 另一个组件引入同一个vuebus, $emit('事件名',prop1,pro2)

export default {
    data(){
        return {

        }
    },
    methods:{
        listen(){
            connect.$on('msg',function(data){
                console.log(data);
            })
        }

    },
}
</script>
<style>

</style>