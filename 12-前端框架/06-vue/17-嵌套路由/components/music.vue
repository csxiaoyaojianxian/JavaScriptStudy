<template>
    <div>
        欢迎来到音乐世界
        <router-link :to="{name:'music_oumei'}">欧美音乐</router-link>
        <router-link :to="{name:'music_guochan'}">国产音乐</router-link>

        <hr/>
        <!-- 变化的音乐数据 -->
        <router-view></router-view>
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
<style>
    
</style>