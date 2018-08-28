<template>
    <div>
        body, 传入参数texttwo:{{texttwo}}
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        props:['texttwo']
    }
</script>
<!-- scoped限定为局部样式 -->
<style scoped>
div{
    height: 100px;
    background-color: skyblue;
}
</style>