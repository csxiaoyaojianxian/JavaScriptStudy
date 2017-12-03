<template>
    <div>
        
    </div>
</template>
<script>
    export default {
        data(){
            return {
                imgs:[],//轮播图列表
            }
        },
        created(){
            //发起请求
            this.$ajax.get('getData')
            .then(res=>{
                console.log(res.data.message);
                this.imgs = res.data.message;
            })
        }
    }
</script>
<style scoped>

</style>