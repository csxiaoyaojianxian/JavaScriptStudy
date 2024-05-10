<template>
	<view>
		<swiper indicator-dots indicator-color="rgba(255,255,255,0.3)" 
		indicator-active-color="#ffffff" circular autoplay interval="2000" vertical>
			<swiper-item><image src="../../static/pic1.png" mode="aspectFill"></image></swiper-item>
			<swiper-item><image src="../../static/pic2.png" mode="aspectFill"></image></swiper-item>
			<swiper-item><image src="../../static/pic4.jpg" mode="aspectFill"></image></swiper-item>
			<swiper-item><image src="../../static/pic3.webp" mode="aspectFill"></image></swiper-item>
		</swiper>
	</view>
	
	-----
	<navigator url="/pages/demo2/demo2">跳转到demo2</navigator>
	
	
	<view>
		<image src="../../static/logo.png" mode="" class="pic1"></image>
		<image src="../../static/pic3.webp" mode="aspectFill" class="pic2"></image>
		<image src="../../static/pic4.jpg" mode="heightFix" class="pic3"></image>
		<image src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png" mode="heightFix"></image>
	</view>
</template>

<script>

</script>

<style lang="scss">
.pic1{
	width: 150px;
	height: 150px;
}
.pic2{
	width: 200px;
	height: 200px;
}
.pic3{
	height: 300px;
}
	
	
swiper{
	width: 100vw;
	height: 200px;
	border:1px solid green;
	swiper-item{
		width: 100%;
		height: 100%;
		background: pink;
		image{
			width: 100%;
			height: 100%;
		}
	}
	swiper-item:nth-child(2n){
		background: orange;
	}
}
</style>
