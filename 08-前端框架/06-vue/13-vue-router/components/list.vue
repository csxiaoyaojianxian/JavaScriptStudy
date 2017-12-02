<template>
    <div>
        <!-- <a href="#/movie">进入电影1</a> -->
        <!-- /detail?id=12 -->
        查询字符串:
        <ul>
            <li v-for="(hero,index) in heros" :key="index">
                    {{hero.name}}  
                    <router-link :to="{name:'detail',query:{id:index}  }">查看</router-link>
            </li>
        </ul>
        path:
        <ul>
            <li v-for="(hero,index) in heros" :key="index">
                    {{hero.name}}
                    <router-link :to="{name:'detail',params:{id:index}  }">查看</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                heros:[{
                    name:'李白'
                },{
                    name:'王昭君'
                }]
            }
        }
    }
</script>
<style>
    
</style>