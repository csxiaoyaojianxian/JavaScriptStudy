<template>
    <div>
        sub
        <button @click="send">send</button>
    </div>
</template>
<script>
import connect from '../connector.js';
    export default {
        data(){
            return {
            }
        },
        methods:{
            send(){
                //发射信号
                connect.$emit('msg','sunshine');
            }
        }
    }
</script>
<style scoped>
div{
    height: 100px;
    background-color: hotpink;
}
</style>