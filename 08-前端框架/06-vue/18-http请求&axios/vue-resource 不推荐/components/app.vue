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
            
            /*
            因为发送数据是对象，所以 content-type:application/json 有OPTIONS预检请求（浏览器自动发起），当调整为字符串数据，content-type 变为www键值对，没有OPTIONS预检请求
            总结： 跨域 + application/json 会引起OPTIONS预检请求，并且自定义一个头(提示服务器，这次的content-type较为特殊)，服务器认为这个是一次请求，而没有允许content-type的头，浏览器就认为服务器不一定能处理掉这个特殊的头的数据，抛出异常
            在node服务器 response.setHeader("Access-Control-Allow-Headers","content-type,多个");
            formdata格式:  key=value&key=value            
            */

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

            /*
            合并请求 axios.all([请求1,请求2])
            分发响应  axios.spread(fn)
            fn:对应参数(res)和请求的顺序一致
            应用场景: 必须保证两次请求都成功，比如，分头获取省、市的数据
            执行特点: 只要有一次失败就算失败，否则成功
            */
            function getMsg(res1,res2){
                console.log(res1);
                console.log(res2);
            }
            // 获取省市数据的需求
            this.$axios.all([ 
                this.$axios.post('postcomment/300','content=123'),
                this.$axios.get('getcomments/300?pageindex=1')
            ])
            //分发响应
            .then(this.$axios.spread(getMsg))
            .catch(err=>{
                console.log(err);
            })

        }
    }
</script>
<style scoped>

</style>