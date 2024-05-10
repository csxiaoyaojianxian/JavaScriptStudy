<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">这个区域填写标题</view>			
		</view>
		
		<view class="info">
			<view class="item">咸虾米</view>					
			<view class="item">
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>	
		</view>
		
		
		<view class="content">		
			内容区域					
		</view>
		
		<view class="count">
			阅读 5588	
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.noticeLayout{
	padding:30rpx;
		.title{
			font-size: 40rpx;
			color:#111;
			line-height: 1.6em;
			padding-bottom:30rpx;
			display: flex;
			.tag{
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;	
			}
			.font{
				padding-left:6rpx;
			}
		}
		.info{
			display: flex;
			align-items: center;
			color:#999;
			font-size: 28rpx;
			.item{
				padding-right: 20rpx;
			}
		}
		.content{
			padding:50rpx 0;
		}
		.count{
			color:#999;
			font-size: 28rpx;
		}
}
</style>
