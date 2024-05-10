<template>
	<view class="out">
		<checkbox-group @change="itemChange">
			<view class="item" v-for="(item,index) in goods" :key="item.id">
				<checkbox :value="item.id" :checked="item.checked"></checkbox>
				<text class="title">{{item.name}}</text>
				<text class="price">{{item.price}}元</text>
				<text class="del" @click="remove(index)">删除</text>
			</view>
		</checkbox-group>

		<view class="card">
			<view class="text">选中{{totalNumber}}个，总价：{{totalPrice}}元</view>
		</view>

		{{selectGroup}}
		<view>---</view>
		{{goods}}
	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from "vue";
	const goods = ref([{
			id: "11",
			name: "小米",
			price: 4999,
			checked: false
		},
		{
			id: "22",
			name: "华为",
			price: 6899,
			checked: false
		},
		{
			id: "33",
			name: "oppo",
			price: 2988,
			checked: false
		},
		{
			id: "44",
			name: "苹果",
			price: 9888,
			checked: false
		},
	])
	const selectGroup = ref([]);
	const totalNumber = computed(() => selectGroup.value.length)
	const totalPrice = computed(() => {
		return goods.value.filter(item => item.checked).reduce((prev, curr) => prev + curr.price, 0)
	})

	function remove(index) {
		goods.value.splice(index, 1)
	}

	function itemChange(e) {
		selectGroup.value = e.detail.value
		goods.value.forEach(item => {
			item.checked = selectGroup.value.includes(item.id)
		})
	}
</script>

<style lang="scss" scoped>
	.out {
		padding: 10px;

		.item {
			padding: 10px 0;

			.price {
				margin-left: 30px;
			}

			.del {
				color: #c00;
				margin-left: 30px;
			}
		}

		.card {
			margin-top: 30px;
			border-top: 1px solid #eee;
			padding: 10px 0;
		}
	}
</style>