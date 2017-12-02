<template>
    <div>
        传递常量:  prop="常量值"
        传递变量:  :prop="变量名"
        <!-- 传递常量 -->
        <header-vue textone="sunshine"></header-vue>
        <!-- 传递变量 -->
        <body-vue v-bind:texttwo="text"></body-vue>
        <footer-vue></footer-vue>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                text:'csxiaoyao'   
            }
        },
        methods:{},
    }
</script>
<style>

</style>