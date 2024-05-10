<template>
	<view class="out">
		子组件count值：{{count}}
	</view>
</template>

<script setup>
import {ref} from "vue"
const count = ref(100)
const updateCount = function(){
	count.value++
}

defineExpose({
	count,
	str:"咸虾米",
	updateCount
})

</script>

<style lang="scss" scoped>
.out{
	padding:20px;
	background: #eee;
}
</style>