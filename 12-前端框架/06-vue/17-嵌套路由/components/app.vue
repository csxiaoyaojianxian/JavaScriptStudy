<template>
    <div>
            <header-vue></header-vue>
            
            <!-- 用来显示music -->
            <router-view></router-view>

            <footer-vue></footer-vue>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
    .h{
        height: 100px;
        background-color: yellowgreen;
    }
    .b{
        height: 100px;
        background-color: skyblue;
    }
    .f{
        height: 100px;
        background-color: hotpink;
    }
</style>