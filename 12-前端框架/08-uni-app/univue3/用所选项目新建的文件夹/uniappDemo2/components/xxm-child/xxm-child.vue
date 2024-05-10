<template>
	<view>
		子组件
		<button @click="onClick">按钮</button>
		<!-- $emit('add',Math.random()) -->	
		<view>----</view>
		<input type="text" @input="onInput"/>
	</view>
</template>

<script setup>
const emit = defineEmits(["add","change"])
function onClick(){
	emit("add",Math.random())
}
function onInput(e){	
	emit("change",e.detail.value)
}
</script>

<style lang="scss" scoped>
input{
	border:1px solid #cfcfcf;
	height: 40px;
}
</style>