<template>
	<view class="out">		
		<input type="text" v-model="firstName" />
		<input type="text" v-model="lastName" />
		<view>
			全称：{{firstName.split("").join('|') + "-" + lastName.split("").join('|')}}
		</view>
	</view>
</template>

<script setup>
import {ref,computed} from "vue";
const firstName = ref("迈克尔")
const lastName = ref("乔丹")
const number = ref(30);


</script>

<style lang="scss" scoped>
.out{
	padding:20px;
}
input{
	border:1px solid #ccc;
	height: 40px;
	margin:10px 0;
	padding:0 10px;
}
</style>
