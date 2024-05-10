<template>
	<view class="title">
	    近期热梗
	</view>
	
	<view class="out">	  
	  <view class="list">
	    <view class="row" v-for="(item,index) in 3" :key="index">
	      <view class="text">{{index+1}}. 标题文字演示</view>
	      <view class="close">
	        <icon type="clear" size="26"/>
	      </view>
	    </view>
	  </view>	
	  <view class="count">
	    共3条梗
	  </view>	
	  <view class="comment">
	    <input type="text" 
	    placeholder="请输入热梗..."
	       
	    />    
	    <button size="mini" type="primary" disabled    
	    >发布</button>
	  </view>
	</view>
</template>

<script setup>
import {ref} from "vue";
const lists = ref([
	{id:111,title:"刚满18岁"},
	{id:222,title:"我不吃牛肉"},
	{id:333,title:"遥遥领先"},
	{id:444,title:"哪里贵了"}
])
</script>

<style lang="scss" scoped>
.title{
  font-size: 26px;
  text-align: center;
  color:#3c3c3c;
  padding:30px 0 15px;
}
.out{
  width: 90vw;
  margin:15px auto;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  border-radius: 5px;
  padding:15px;
  box-sizing: border-box;
  .list{
	  .row{
		  padding:10px 0;
		  border-bottom:1px solid #e8e8e8;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  font-size: 18px;
		  color:#333;
		  .text{
			  padding-right: 5px;
			  box-sizing: border-box;
		  }
	  }
  }
  .count{
    padding:10px 0;
    font-size: 15px;
    color:#888;
    text-align:center;
  }
  .comment{
    display: flex;
    margin-top:10px;
	input{
	  flex:4;
	  background: #f4f4f4;
	  margin-right: 5px;
	  height: 100%; 
	  height: 32px;
	  border-radius: 4px;
	  padding:0 10px;
	  color:#333;
	}
	button{
	  flex:1;	  
	}
  }  
}

</style>
