<template>
	<view class="content">
		<view class="row" v-for="item in listData">
			<image :src="item.logo" mode="aspectFill"></image>
			<view class="text">{{item.playerName}}</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {apiNbaData} from "@/api/apis.js"

const listData = ref([]);

const getData = ()=>{
	apiNbaData().then(res=>{
		console.log(res);
		listData.value = res.data
	})	
}

getData();
</script>

<style lang="scss" scoped>
	.content{
		padding:30rpx;
		.row{
			padding:30rpx 0;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			image{
				width: 200rpx;
				height: 160rpx;				
			}
			.text{
				
			}
		}
	}
</style>
