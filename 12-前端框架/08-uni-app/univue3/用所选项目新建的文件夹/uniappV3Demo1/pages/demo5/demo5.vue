<template>
	<view class="">
		<view v-if="shop">京东</view>		
		<view v-else>淘宝网</view>
		
		
		
		<view v-if="day===1">星期1</view>		
		<view v-else-if="day === 2">星期2</view>		
		<view v-else-if="day === 3">星期3</view>		
		<view v-else-if="day === 4">星期4</view>
		<view v-else-if="day === 5">星期5</view>
		<view v-else-if="day === 6">星期6</view>
		<view v-else-if="day === 7">周末</view>
		<view v-else>格式错误</view>
		
		<view class="box1" v-if="false">
			<image src="../../static/pic1.png" mode=""></image>
		</view>
		<view class="box2" v-show="false">
			<image src="../../static/pic2.png" mode=""></image>
		</view>
		
		<template v-if="true">
			<image src="../../static/logo.png" mode=""></image>
			<view>logo</view>
		</template>
		
		
		
		<template v-else>
			<image src="../../static/pic4.jpg" mode=""></image>
			<view>pic4</view>
		</template>
		
	</view>
</template>

<script setup>
import {ref} from "vue";
const shop = ref(true);
const day = ref(30);
</script>

<style lang="scss" scoped>

</style>
