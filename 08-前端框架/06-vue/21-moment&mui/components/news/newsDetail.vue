<template>
    <div class="tmpl">
        <nav-bar title="新闻详情"></nav-bar>
        <div class="news-title">
            <p v-text="newsDetail.title"></p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsDetail.add_time | convertDate}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newsDetail:{}, //就是为了象征性的表示其数据类型
        }
    },created(){
        //1:获取路由参数
        let id = this.$route.query.id;
        //2:拼接路由参数成为后台请求的URL
        this.$ajax.get('getnew/' + id)
        .then(res=>{
             //3:响应回来渲染页面
             this.newsDetail = res.data.message[0]; 
             //数组，就一个数据，所以直接取[0]
        })
        .catch(err=>{
            console.log(err);
        })
       
    }
}

</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}
</style>
