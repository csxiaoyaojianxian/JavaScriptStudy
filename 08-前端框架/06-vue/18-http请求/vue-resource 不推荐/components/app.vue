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
            // this.$axios.get(url,options)
            // this.$axios.post(url,data,options)
            // console.log(this.$http);
            // 全局默认设置 ：Axios.defaults.baseURL = 'xxxxx';
            
            //get请求
            this.$http.get('http://www.csxiaoyao.com/api/getData')
            .then(res=>{
                this.data = res.message;
            },err=>{
                console.log(err)
            })
            
            //post请求
            // post请求时，如果数据是字符串，默认头是键值对，否则是json对象 application/json
            this.$http.post('http://www.csxiaoyao.com/api/getData',{
                content:'sunshine'
            },{
                // options预检请求，是当浏览器发现跨域 + application/json的请求，就会自动发起并携带content-type的头
                emulateJSON:true
            })
            .then(res=>{
                this.data = res.message;
            },err=>{
                console.log(err);
            })
        }
    }
</script>
<style scoped>

</style>