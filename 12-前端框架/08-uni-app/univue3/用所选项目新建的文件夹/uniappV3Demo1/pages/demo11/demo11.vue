<template>
	<view class="out">
		<input type="text" v-model="firstName" placeholder="请输入名"/>
		<input type="text" v-model="lastName" placeholder="请输入姓"/>
		
		<view>全称：{{fullName}}</view>
	</view>
</template>

<script setup>
import {ref,watch, watchEffect} from "vue";
const firstName = ref("迈克尔");
const lastName = ref("乔丹");

const fullName = ref("")

/*
watch([firstName,lastName],([NfirstName,NlastName],[OfirstName,OlastName])=>{
	console.log(NfirstName,NlastName);
	console.log(OfirstName,OlastName);
})

watch(firstName,(nv,ol)=>{
	
})
watch(lastName,(nv,ol)=>{
	
})
*/

watchEffect(()=>{
	console.log(firstName.value,lastName.value);
})




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
