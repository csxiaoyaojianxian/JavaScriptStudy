<template>
    <div>
2014年诞生,2013年react,09年angularjs
核心概念: 组件化  双向数据流 (基于ES5中的defineProperty来实现的),IE9才支持
angular核心: 模块化 双向数据绑定(脏检测:一个数组（$watch）)

对象分类
* 1:全局 Vue.
* 2:实例 this. / new Vue().
* 3:选项 new Vue() 的参数或 export default 里的属性

开发流程
* 1: 在main.js中引入vue和相关组件对象
* 2: new Vue(选项options), 目的地el, 渲染内容 render:c=>c(App) 渲染App的内容
* 3: 编写app.vue
    - template 在2.x以后只能有一个根节点
    - script 格式是export default { 选项options}
    - style 加上scoped（范围的）之后，样式只对当前模板有效
* 4: 可能使用组件或者使用函数或者接受参数
    - options(根属性):
        + data 是一个函数,return一个对象
        + methods 是一个对象,key是函数名,value是函数体
        + components 是一个对象,key是组件名,值是组件对象
        + props 是一个数组,元素是多个接受的参数
    </div>
</template>
<script>
// export default {

// }
</script>
<style>

</style>