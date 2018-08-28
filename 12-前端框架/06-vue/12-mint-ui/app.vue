<template>
    <div>  
        <pre>
            npm install mint-ui -S
        </pre>
        <mt-header title="多个按钮">
         
            <mt-button icon="back">返回</mt-button>
            <mt-button>关闭</mt-button>
      
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>


        <button @click="handleClose">显示弹出框</button>

        <mt-switch v-model="value"></mt-switch>

        <mt-swipe :auto="4000">
          <mt-swipe-item>1</mt-swipe-item>
          <mt-swipe-item>2</mt-swipe-item>
          <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
//在js部分所有变量都是模块作用域
//如果需要使用就必须引入
import { Toast } from 'mint-ui';

    export default {
        data(){
            return {
                text:'123',
                value:false
            }
        },
        methods:{
            handleClose(){
                Toast('提示信息');
            }
        }
    }
</script>
<style>
    
</style>