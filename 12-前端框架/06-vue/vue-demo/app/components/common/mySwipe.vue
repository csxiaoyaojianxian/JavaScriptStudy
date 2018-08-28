<template>
    <div>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(img,index) in imgs" :key="index">
          	<a :href="img.url"><img :src="img.img"></a>
          </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgs:[],//轮播图片列表
        }
    },
    props:['url'],
    created(){
        this.$ajax.get(this.url)
        .then(res=>{
            this.imgs = res.data.data;
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
</script>
<style scoped>
/*轮播图样式*/
.mint-swipe {
    /*max-height: 187px;*/
    height: 282px;
}
.mint-swipe img {
    height: 100%;
}
</style>