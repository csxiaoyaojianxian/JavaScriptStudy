<template>
    <div>
        <button @click="send1">发请求1</button>
        <button @click="send2">发请求2</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                data:[]
            }
        },created(){
        },
        methods:{
          send1(){
            //拦截器对每一次请求都有效
            this.$axios.get('getData/300?pageindex=1',{
              headers:{
                accept:'get'
              }
            })
            .then(res=>{
              console.log(res);
            })
            .catch(err=>{
              console.log(err)
            })
          },
          send2(){
            //拦截器对每一次请求都有效
            this.$axios.get('getData',{
              headers:{
                accept:'get'
              }
            })
            .then(res=>{
              console.log(res);
            })
            .catch(err=>{
              console.log(err)
            })
          }
        }
    }
</script>
<style scoped>
</style>