<template>
	<view class="box" hover-class="boxHover">		
		<view class="inner" hover-class="innerHover" hover-stop-propagation>内部元素</view>
	</view>
	<navigator url="/pages/demo2/demo2">
		<image src="../../static/pic4.jpg" mode=""></image>
	</navigator>
	<view>----</view>
	
	<view>
		<navigator url="/pages/demo1/demo1" open-type="reLaunch">跳转到demo1</navigator>
		
	</view>
	
	<scroll-view  scroll-x  class="scrollView">
		<view class="box">scroll子元素</view>
		<view class="box">scroll子元素</view>
		<view class="box">scroll子元素</view>
		<view class="box">scroll子元素</view>
		<view class="box">scroll子元素</view>
		<view class="box">scroll子元素</view>
		<view class="box">scroll子元素</view>
		<view class="box">scroll子元素</view>
		<view class="box">scroll子元素</view>
		<view class="box">scroll子元素</view>
		
	</scroll-view>
	
</template>


<script setup>

</script>


<style lang="scss">
.scrollView{
	width: 80%;
	height: 220px;
	border:1px solid red;
	white-space: nowrap;
	.box{
		width: 100px;
		height: 100px;
		background: green;
		display: inline-block;
		margin:5px;
	}
}
</style>
