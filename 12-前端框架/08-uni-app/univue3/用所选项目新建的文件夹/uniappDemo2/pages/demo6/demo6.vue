<template>
	<view class="">
		姓名：{{name}} - {{age}}
		<scroll-view scroll-y="true" ref="scroll">
			<view></view>
		</scroll-view>
		<navigator url="/pages/demo5/demo5">跳转demo5</navigator>
		<view>----</view>
		<view>计数：{{count}}</view>
		<view>----</view>
		<navigator open-type="reLaunch" url="/pages/demo4/demo4">demo4页面</navigator>
		<view v-for="item in 50">{{item}}</view>
		
		<view class="fixed" v-if="fixed">↑</view>
		
	</view>
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from "vue"
import {onLoad,onReady,onShow,onHide,onUnload,onPageScroll} from "@dcloudio/uni-app"
const name = ref("张三")
const age = ref(18)
const scroll = ref(null)
const count = ref(0)
const fixed = ref(false);

let time= setInterval(()=>{
	count.value++
},50)


onLoad((e)=>{	
	console.log("onload函数");	
	console.log(e);
	name.value = e.name
	age.value = e.age
})

onShow(()=>{
	console.log("onShow函数");
	time= setInterval(()=>{
		count.value++
	},50)
})

onHide(()=>{
	console.log("onHide函数");
	clearInterval(time)
})


onReady((e)=>{	
	console.log("onReady函数");
})

onBeforeMount(()=>{
	console.log("onBeforeMount函数");
})

onMounted(()=>{
	console.log("onMounted函数");
})


onUnload(()=>{
	console.log("onUnload卸载页面");
})


onPageScroll((e)=>{
	console.log(e.scrollTop);	
	fixed.value = e.scrollTop>200
	
})


</script>

<style lang="scss" scoped>
.fixed{
	width: 100px;
	height: 100px;
	background: orange;
	position: fixed;
	right:30px;
	bottom:30px;
}
</style>
