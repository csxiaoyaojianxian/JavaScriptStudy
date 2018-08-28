<template>
    <div>
        子组件需要声明props:['prop1','prop2']
        直接使用 {{prop1}}
        js中使用: this.prop1


        header, 传入参数textone:{{textone}}
        <button @click="show">获取父组件值</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        //接受父组件参数
        props:['textone'],
        methods:{
            show(){
                alert(this.textone)
            }
        }
    }
</script>
<!-- scoped限定为局部样式 -->
<style scoped>
div{
    height: 100px;
    background-color: yellowgreen;
}
</style>