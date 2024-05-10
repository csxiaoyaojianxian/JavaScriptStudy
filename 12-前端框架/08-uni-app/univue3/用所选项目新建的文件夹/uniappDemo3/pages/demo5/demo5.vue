<template>
	<view class="layout">
		
	</view>
</template>

<script setup>

function request(){
	uni.showLoading()
	uni.request({
		url:"https://jsonplaceholder.typicode.com/posts",
		data:{
			id:5
		},
		header:{
			token:"adfadsfadsf",
			"content-type":"application/x-www-form-urlencoded"
		},
		method:"post",
		timeout:15000,
		success:res=>{
			console.log(res);			 
		},
		fail:err=>{
			console.log("超时");
			console.log(err);
		},
		complete:()=>{
			uni.hideLoading()
		}
	})
	
}

request();
</script>

<style lang="scss" scoped>

</style>
