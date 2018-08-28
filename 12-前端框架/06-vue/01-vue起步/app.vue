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
* 1: 创建index.html（单页应用的页）
* 2: 在main.js(入口文件)中引入vue和相关组件对象
* 3: new Vue(选项options), 目的地el, 渲染内容 render:c=>c(App) 渲染App的内容
* 4: 编写app.vue
    - template 在2.x以后只能有一个根节点
    - script 格式是export default { 选项options}
    - style 加上scoped（范围的）之后，样式只对当前模板有效
* 5: 可能使用组件或者使用函数或者接受参数
    - options(选项):
        + data 是一个函数,return一个对象
        + methods 是一个对象,key是函数名,value是函数体
        + components（组件内声明子组件)是一个对象,key是组件名,值是组件对象
        + props 是一个数组,元素是多个接受的参数
* 6:实例:
    - 在组件内（xxx.vue）中的this
    - new Vue()
    - 事件
        + this.$on(事件名,回调函数(参数))
        + this.$emit(事件名,数据)
        + this.$once(事件名,回调函数(参数)) 就触发一次
        + this.$off(事件名); 取消事件
* 7:全局
    - Vue.component('组件名',组件对象)  在哪里都可以使用
* 8: 组件传值
    - 父传子: 属性作为参数
        + 常量 title="xxx"   子组件声明接收参数 props:['xxx']
        + 变量 :title="num"  子组件声明接收参数 props:['xxx']
    - 子传父: vuebus（只能是同一辆车）
        + 先停车到父组件，On一下
        + 再开车到子组件，如果需要的话，emit一下，触发上述时间的回调函数

    </div>
</template>
<script>
// export default {

// }
</script>
<style>

</style>