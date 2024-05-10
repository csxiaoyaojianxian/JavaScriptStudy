<template>
	<view class="">
		<xxm-child @add="onAdd" @change="onChange"></xxm-child>
		<view class="box" :style="{background:color,fontSize:size+'px'}">num：{{num}}</view>
	</view>
</template>

<script setup>
import {ref} from "vue"
const num = ref(0)
const color = ref('#ccc');
const size = ref(12)
const onAdd = function(e){
	console.log(e);
	num.value = e;
	color.value ="#"+String(e).substring(3,6)
}
const onChange = function(e){
	console.log(e);
	size.value = e;
}
</script>

<style lang="scss" scoped>
.box{
	width: 200px;
	height: 200px;
}
</style>
