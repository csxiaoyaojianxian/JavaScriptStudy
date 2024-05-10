<template>
	<view class="">
		<xxm-layout>
			<template #header>demo2的头部</template>
			<template #main>
				<view class="main"></view>
			</template>
		</xxm-layout>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main{
	width: 100px;
	height: 100px;
	background: pink;
}
.box2{
	width: 130px;
	height: 130px;
	background: green;
}
</style>
