<template>
	<view class="container">
		<view class="menu">
			<uni-segmented-control :current="current" :values="values" 
			@clickItem="onClickItem" styleType="button" activeColor="#2B9939"></uni-segmented-control>
		</view>
		
		<view class="layout">
			<view class="box" v-for="(item,index) in pets" :key="item._id">
				<view class="pic">
					<image lazy-load :src="item.url" mode="widthFix" @click="onPreview(index)"></image>
				</view>
				<view class="text">{{item.content}}</view>
				<view class="author">—— {{item.author}}</view>
			</view>
		</view>		
		
		<view class="float">
			<view class="item" @click="onRefresh">
				<uni-icons type="refreshempty" size="26" color="#888"></uni-icons>
			</view>
			<view class="item" @click="onTop">
				<uni-icons type="arrow-up" size="26" color="#888"></uni-icons>
			</view>			
		</view>
		
		<view class="loadMore">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		
		
	</view>
</template>

<script setup>
import {computed, ref} from "vue";
import {onReachBottom,onPullDownRefresh} from "@dcloudio/uni-app"


const pets = ref([]); 
const current = ref(0);
const classify = [{key:"all",value:"全部"},{key:"dog",value:"狗狗"},{key:"cat",value:"猫猫"}]
const  values= computed(()=>classify.map(item=>item.value))

//点击菜单
const onClickItem=(e)=>{
	current.value = e.currentIndex	
	pets.value = []	
	network();
}


//点击预览
const onPreview = function (index){
	let urls = pets.value.map(item=>item.url);	
	uni.previewImage({
		current:index,
		urls
	}) 
}

//点击刷新
const onRefresh =function(){
	uni.startPullDownRefresh();
}
//返回顶部
const onTop = ()=>{
	uni.pageScrollTo({
		scrollTop:0,
		duration:100
	})
}

//发送网络请求
function network(){
	uni.showNavigationBarLoading()
	uni.request({
		url:"https://tea.qingnian8.com/tools/petShow",
		data:{
			size:5,
			type:classify[current.value].key
		},
		header:{
			"access-key":"xxm123321@#"
		}
	}).then(res=>{		
		if(res.data.errCode===0){			
			pets.value = [...pets.value,...res.data.data]
			console.log(pets.value);
		}else if(res.data.errCode === 400){
			uni.showToast({
				title:res.data.errMsg,
				icon:"none"
			})
		}		
	}).catch(err=>{		
		uni.showToast({
			title:"请求有误，请重新刷新",
			icon:"none"
		})
	}).finally(()=>{
		uni.hideNavigationBarLoading();
		uni.stopPullDownRefresh();
	})
}


//触底加载更多
onReachBottom(()=>{
	network();
})

//下拉刷新
onPullDownRefresh(()=>{
	pets.value = [];
	current.value = 0
	network();
})



network();


</script>

<style lang="scss" scoped>
.container{
	.menu{
		padding:50rpx 50rpx 0;
	}
	
	.layout{
		padding:50rpx;
		.box{
			margin-bottom:60rpx;
			box-shadow: 0 10rpx 40rpx rgba(0,0,0,0.08);
			border-radius: 15rpx;
			overflow: hidden;
			.pic{
				image{
					width: 100%;
				}
			}
			.text{
				padding:30rpx;
				color:#333;
				font-size: 36rpx;
			}
			.author{
				padding:0 30rpx 30rpx;
				text-align: right;
				color:#888;
				font-size: 28rpx;
			}
		}
	}
	
	.loadMore{
		padding-bottom:calc(env(safe-area-inset-bottom) + 50rpx);
	}
	
	
	.float{
		position: fixed;
		right:30rpx;
		bottom:80rpx;
		padding-bottom:env(safe-area-inset-bottom);
		.item{
			width: 90rpx;
			height: 90rpx;
			background: rgba(255,255,255,0.9);
			border-radius: 50%;
			margin-bottom:20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border:1px solid #eee;
		}
		
	}
}
</style>
