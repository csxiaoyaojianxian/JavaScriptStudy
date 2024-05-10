<template>
	<view class="layout">
		<view class="header">
			<slot name="header"></slot>
		</view>
		<view class="main">
			<slot name="main"></slot>
		</view>
		<view class="footer">底部区域</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.layout{
	.header{
		height: 100px;
		background: #cfcfcf;
	}
	.main{
		min-height: 200px;		
	}
	.footer{
		height: 120px;
		background: orange;
	}
}
</style>