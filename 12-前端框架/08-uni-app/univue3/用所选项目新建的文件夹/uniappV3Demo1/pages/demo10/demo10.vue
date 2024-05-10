<template>
	<view class="out">
		<input type="text" v-model="firstName" placeholder="请输入名"/>
		<input type="text" v-model="lastName" placeholder="请输入姓"/>
		
		<view>全称：{{fullName}}</view>
	</view>
</template>

<script setup>
import {ref,computed} from "vue";
const firstName = ref("迈克尔");
const lastName = ref("乔丹");

const fullName = computed(()=> {
	console.log("计算属性");
	return firstName.value +"-"+ lastName.value
})

console.log(fullName.value);

/*
const fullName = function(){
	console.log("方法");
	return firstName.value +"-"+ lastName.value;
}
*/

</script>

<style lang="scss" scoped>
.out{
	padding:20px;
	input{
		border:1px solid #ccc;
		height: 40px;
		padding:0 10px;
		margin:10px 0;
	}
}
</style>
