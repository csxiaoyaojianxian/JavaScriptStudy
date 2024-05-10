<template>
	<view>
		子组件
	</view>
</template>

<script setup>
import {onUnmounted} from "vue"
onUnmounted(()=>{
	
	console.log("子组件别卸载了");
})

</script>

<style lang="scss">

</style>