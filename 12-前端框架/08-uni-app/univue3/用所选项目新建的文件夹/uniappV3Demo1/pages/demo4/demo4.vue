<template>
	<view class="box" @click="onClick" :style="{background:color}">
		{{num}}
	</view>	
	<switch @change="onChange"/>	
	<button type="primary" :loading="isLoading">普通按钮</button>
</template>

<script setup>
import {ref} from "vue";	
const num = ref(1);
const color = ref("#fc359a");
const isLoading = ref(false);
function onClick(){
	num.value++;
	color.value = "#"+String(Math.random()).substring(3,9);
	console.log( String(Math.random()).substring(3,9) );
}
function onChange(e){
	isLoading.value = e.detail.value	
}
</script>

<style>
.box{
	width: 200px;
	height: 200px;
	background: orange;
}
</style>
