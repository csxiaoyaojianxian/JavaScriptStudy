<template>
    <div>
        绑定事件的方法
            v-on: 事件名="表达式||函数名"
            简写: @事件名="表达式||函数名"
                如果没有参数，可以省略()
            声明组件内函数: methods属性
            
        <div v-bind:class="isRed?'red':'green'">单个class</div>
        <div :class="{'red':true,'big':true}">多个class</div>
        <ul>
            <li v-for="stu in stus" :class="{'A':'red','B':'green'}[stu.score]">
                {{stu.name}}
            </li>
        </ul>

        <!-- <button v-on:click="isRed = !isRed">change</button> -->
        <button @click="change">change</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                isRed:false,
                stus:[{name:'jack',score:'A'},{name:'rose',score:'B'}]
            }
        },
        //声明函数，属于组件对象的
        methods:{
            change(){
                // 在template中使用变量或者函数，不需要加this
                // 在script中使用就需要加上this
                this.isRed = !this.isRed;
                this.stus.push({
                    name:'mick',score:'A'
                })
            }
        }
    }
</script>
<style>
.red{
    background-color: red;
}
.green{
    background-color: green;
}
.big{
    font-size: 30px;
}
</style>