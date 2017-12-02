<template>
    <div>
        电影
        <button @click="goback">向上一页</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },methods:{
            goback(){
                this.$router.go(-1);  //-1上一次记录
            }
        }
    }
</script>
<style>
    
</style>