<template>
  <div>
    
    v-bind:属性名="表达式"，最终表达式运算结束的结果赋值给该属性名
    v-bind: 简写为":属性名="表达式"

    <div v-bind:class="isRed?'red':'green'">单个class</div>
    <div :class="{'red':true,'big':true}">多个class(样式:key，值:true/flase)</div>

    复杂情况，通过遍历，根据当前对象的key匹配样式value
    <ul>
      <li v-for="style in styles" :class="{'key1':'red','key2':'green'}[style.key]">
        {{style.value}}
        <span v-once>这个值将不会改变: {{ style.value }}</span>
      </li>
    </ul>
  </div>

</template>
<script>
    export default {
        data(){
            return {
                isRed:true,
                styles:[{key:'key1',value:'value1'},{key:'key2',value:'value2'}]
            }
        }
    }
</script>

<style>
.red{
    background-color: red;
}
.green{
    background-color: green;
}
.big{
    font-size: 30px;
}
</style>
