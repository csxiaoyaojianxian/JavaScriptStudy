<template>
	<view>{{num1}}</view>
	<view>{{num2}}</view>
	<view>{{test}}</view>
	<view>{{arr[2]}}</view>
	<view>{{obj}}</view>
</template>

<script setup>
import {ref} from "vue";
	
let num1 = 6;
// setInterval(()=>{
// 	num1++;
// 	console.log(num1);
// },1000)

let num2 = ref(10);
setInterval(()=>{
	num2.value++;
	console.log(num2.value);
},1000)

let test = ref("咸虾米");

let arr =ref([1,2,3,4]);

let obj = ref({name:"王五",age:18})
obj.value.name = "李四"


</script>

<style>

</style>
