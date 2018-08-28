<template>
    <div class="tmpl">
        <nav-bar :title="title"></nav-bar>
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
            newsDetail:{},
            title:''
        }
    },
    created(){
        //1:获取路由参数
        let id = this.$route.query.id;
        //2:拼接路由参数成为后台请求的URL
        this.$ajax.get('getnew/' + id)
        .then(res=>{
             this.newsDetail = res.data.data[0]; 
        })
        .catch(err=>{
            console.log(err);
        })
       
    },
    beforeRouteEnter (to, from, next) {
        let myTitle = '';
        if(from.name === 'news.list'){
            //新闻
            myTitle = '新闻详情';
        }else if(from.name === 'goods.detail'){
            //商品详情过来
            myTitle = '图文介绍';
        }

        //一定调用next,不然就没有任何效果
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.title = myTitle;
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
