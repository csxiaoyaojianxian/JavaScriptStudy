<template>
    <div class="tmpl">
        <!--  组件名navBar -->  
        <nav-bar title="图片详情"></nav-bar>
        <!-- 组件名:navbar -->
        <!--  使用：navbar-->
        <div class="photo-title">
            <p v-text="imgInfo.title"></p>
            <span>发起日期：{{imgInfo.add_time | convertDate}}</span>
            <span>{{imgInfo.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li v-for="(img,index) in imgs"  :key="index"  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <!-- <img :src="img.src"> -->
                <img class="preview-img" :src="img.src" height="100" @click="$preview.open(index, imgs)">
            </li>
           
        </ul>
        <div class="photo-desc">
            <p v-html="imgInfo.content"></p>
        </div>
        
        <!-- 使用评论子组件 -->
        <!-- <comment :cid="pid"></comment> -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgs:[],//存放缩率图
            imgInfo:{},//详情数据对象
            pid:this.$route.params.id, //记录当前图片id
        }
    },
    created(){
        //图片详情
        this.$ajax.get('getimageInfo/' + this.pid)
        .then(res=>{
            this.imgInfo = res.data.data;
        })
        .catch(err=>{
            console.log(err);
        });
        //缩略图
        this.$ajax.get('getthumimages/' + this.pid)
        .then(res=>{
            this.imgs = res.data.data;
            this.imgs.forEach((ele)=>{
                ele.w=300;
                ele.h=200;
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
}


</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}



</style>
