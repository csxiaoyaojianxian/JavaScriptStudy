<template>
    <div>
        音乐
        <button @click="goMovie">跳转到电影</button>
        <button @click="goback">向上一页</button>
        <button @click="go">向下一页</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            goMovie(){
                this.$router.push({
                    name:'movie'
                })
            },
            goback(){
                this.$router.go(-1); //后退
            }
            ,go(){
                this.$router.go(1);//前进
            }
        }
    }
</script>
<style>
    
</style>