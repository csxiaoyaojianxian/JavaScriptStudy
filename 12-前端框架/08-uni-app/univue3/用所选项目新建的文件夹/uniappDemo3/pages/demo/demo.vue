<template>
	<view class="">
		demo页面
		<!-- <navigator url="/pages/demo2/demo2">demo2跳转</navigator> -->
		<view @click="goDemo2">跳转到demo2</view>
		<view>-----</view>
		<view @click="goIndex">跳转到首页</view>
		
	</view>
</template>

<script setup>
// uni.hideHomeButton()
function goDemo2(){
	uni.navigateTo({
		url:"/pages/demo2/demo2?name=张三&age=18&like=篮球"
	})
}
function goIndex(){
	uni.reLaunch({
		url:"/pages/index/index"
	})
}

console.log(getCurrentPages());
</script>

<style lang="scss" scoped>

</style>
