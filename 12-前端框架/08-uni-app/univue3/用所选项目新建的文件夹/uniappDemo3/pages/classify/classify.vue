<template>
	<view class="">
		分类页面
		<button @click="remove">删除</button>
		<view>---</view>
		<button @click="select">学历</button>		
	</view>
</template>

<script setup>
uni.showNavigationBarLoading()

	
setTimeout(()=>{
	uni.setNavigationBarTitle({
		title:"动态标题"
	})
	uni.hideNavigationBarLoading()
},2000)



	
function remove(){
	uni.showModal({
		title:"是否删除？",		
		cancelText:"No",
		confirmText:"Yes",
		cancelColor:"#999",
		confirmColor:"#f00",
		editable:true,		
		success:res=>{
			// if(res.confirm) uni.showToast({title:"删除成功"})
			console.log(res);
		}
	})
}
let arrs = ["高中","大专","本科","研究生"];
function select(){
	uni.showActionSheet({
		title:"请选择",
		itemList:arrs,
		success:res=>{			
			console.log(res);
			console.log(arrs[res.tapIndex]);
		}
	})
}
</script>

<style lang="scss" scoped>

</style>
