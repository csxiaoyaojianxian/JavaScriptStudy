<template>
    <div>
        {{data}}
    </div>
</template>
<script>
    export default {
        data(){
            return {
                data:[]
            }
        },created(){
           // get
           this.$axios.get('getData',{
                params:{
                    id:'123'
                },
                baseURL:'http://www.csxiaoyao.com'
           })
           .then(res=>{
            this.data = res.data.message;
           })
           .catch(err=>{
            console.log(err);
           })
           .finally(()=>{
            console.log('最终执行');
           })
           
           // post
           this.$axios.post('postData/300',
            'content=sunshine'
           // {
           //  content:'sunshine'
           // },
           // {
           //  //设置
           //  headers:{
           //      'content-type':'application/x-www-form-urlencoded'
           //  }
           // }
           )
           .then(res=>{
                this.data = res.data.message;
           })
           .catch(err=>{
            console.log(err);
           })

        }
    }
</script>
<style scoped>
</style>