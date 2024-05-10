<template>
	<view class="">
		demo2页面
		<button @click="goBack">返回首页</button>
	</view>
</template>

<script setup>
onLoad((e)=>{
	console.log(e);
})
function goBack(){
	uni.navigateBack()
}
console.log(getCurrentPages());
</script>

<style lang="scss" scoped>

</style>
