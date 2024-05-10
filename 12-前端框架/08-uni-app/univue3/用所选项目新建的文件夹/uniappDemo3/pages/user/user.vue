<template>
	<view class="">
		个人中心
	</view>
</template>

<script setup>

onShow(()=>{
	uni.hideTabBarRedDot({
		index:2
	})
})
uni.showLoading({
	title:"加载中..."
})

setTimeout(()=>{
	uni.hideLoading()
},2000)
</script>

<style lang="scss" scoped>

</style>
