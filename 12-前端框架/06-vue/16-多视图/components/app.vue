<template>
    <div>
        <div>头部</div>
        <hr/>
            <router-view class="b" name="header"></router-view>
            <router-view class="b" ></router-view>
            <router-view class="b" name="footer"></router-view>
        <hr/>
        <div>底部</div>
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