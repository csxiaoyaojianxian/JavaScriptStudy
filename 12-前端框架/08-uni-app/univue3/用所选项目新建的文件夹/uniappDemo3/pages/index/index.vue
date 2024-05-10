<template>
	<view class="content">
		<navigator open-type="reLaunch" url="/pages/user/user">用户</navigator>
		<button @click="show">显示</button>
		<button @click="hide">隐藏</button>
		<button @click="stop">停止</button>
		<image class="logo" src="/static/images/xxmLogo.png"></image>
		<view class="" v-for="item in 100">
			{{item}}
		</view>
		
		
	</view>
</template>

<script setup>
function show(){
	uni.showToast({
		title:"加载...",
		icon:"loading",
		duration:3000
	})
}
function hide(){
	uni.hideToast()
}

function stop(){
	uni.stopPullDownRefresh()
}



const conut = ref(0);

onMounted(()=>{
	console.log("onMounted函数");
})
onLoad(()=>{
	console.log("onLoad钩子");
})

onShow(()=>{
	console.log("onShow钩子");
})
onReachBottom(()=>{
	console.log("到底了");
})
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
