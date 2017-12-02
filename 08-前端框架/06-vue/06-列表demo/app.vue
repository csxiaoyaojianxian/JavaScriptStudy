<template>
    <div>
        <ul>
            <li v-for="(hero,index) in heros" :key="index" :class="{'A':'red','B':'blue','C':'green','D':'pink'}[hero.score]">
              {{hero.name}},{{hero.score}}
              <button @click="del(index)">删除</button>
            </li>
        </ul>

        英雄姓名:<input type="text" name="" v-model="name"> <br/>
        英雄成绩:<input type="text" name="" v-model="score">
        <button @click="addHero">添加英雄</button>
    </div>
</template>
<script>

    export default {
        data(){
            return {
                name:'',score:'',
                heros:[{
                  id:1,
                  name:'奥利安娜',
                  score:'A'
                },{
                  id:2,
                  name:'崔斯特',
                  score:'B'
                },{
                  id:3,
                  name:'妲己',
                  score:'C'
                },{
                  id:4,
                  name:'阿拉斯加',
                  score:'D'
                }]
                
            }
        },
       
        methods:{
            addHero(){
                this.heros.push({
                    name: this.name,
                    score:this.score
                });
                this.name = '';
                this.score = '';
            },
            del(index){
                this.heros.splice(index,1);
            }
        }
    }
</script>
<style>
.red{
    background-color: red;
}
.green{
    background-color: yellowgreen;
}
.blue{
    background-color: skyblue;
}
.pink{
    background-color: hotpink;
}
</style>