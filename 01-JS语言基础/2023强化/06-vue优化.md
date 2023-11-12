# vue优化

## 1. 使用key

为循环生成的列表指定稳定且唯一的key，减少删除、新增、改动元素



## 2. 使用冻结的对象

使用 chrome 性能工具分析，若在 Main 渲染主线程中黄色的js响应化执行时间过长，可以使用冻结避免对象响应化。

```javascript
var obj = { a: 1, b: 2 }
Object.freeze(obj);
obj.a = 3;
console.log(obj.a); // 1
Object.isFrozen(obj); // true

// 在vue中使用

export default {
  data() {
    frozenData: []
  },
  methods: {
    setData() {
      var obj = {};
      ...
      this.frozenData = Object.freeze(obj); // 避免了 proxySetter
    }
  }
}
```



## 3. 使用函数式组件

[函数式组件](https://v2.cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)，主要减少内存占用，不会调用 `new VueComponent`，不会出现在组件树中

添加 `functional: true` 配置，用于纯渲染组件，无data，只有props



## 4. 使用计算属性和变量本地化

缓存在模板中多次使用的数据，可以使用计算属性，因为会自动缓存，对于会多次引用的变量可以保存起来，减少 `this.xxx` 的使用，减少依赖收集次数。因为响应式对象每次使用 `this.xxx` 都会触发 `getter`，然后执行依赖收集的相关代码



## 5. 非实时绑定的表单项

在没有必要使用 `v-model` (oninput)时使用 `v-model.lazy` (onchange) 或使用单向 value 代替



## 6. 保持对象引用稳定

尽量避免上层组件的数据变动，vue的判定变化源码：

```javascript
function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y; // +0 === -0 为 true，但 1/+0=Infinity, 1/-0=-Infinity，所以 1/+!==1/-0
  } else {
    return x === x || y === y; // 不能直接返回 true，因为 NaN === NaN 为 false，x === x 可以排除 NaN
  }
}
```

也要注意细分组件避免多余的渲染



## 7. v-show 替代 v-if

对于内部包含大量dom节点的元素效果明显



## 8. 使用延迟装载(defer)

对于重组件，初始化时分批绘制，在重组件上使用 `v-if="defer(n)"` 表示在第n帧后绘制。

defer函数记录当前执行 `requestAnimationFrame` 的次数



## 9. 子组件分割

对于耗费性能的部分可以分割为子组件，在子组件内部未发生变化时，不会触发耗费性能的逻辑执行。

```vue
<template>
 <div :style="{ opacity: number / 100 }">
   <!-- 可以分割为子组件，避免在number变化时重复执行 -->
   <div>{{ someThing() }}</div>
 </div>
</template>
<script>
export default {
	props:['number'],
	methods: {
		someThing () { /* 耗时任务 */ }
	}
}
</script>
```



## 10. 第三方插件按需引入



## 11. 路由懒加载

```javascript
const router = new VueRouter({
	routes: [ 
 		{ path: '/home', component: () => import('@/components/Home') }, 
		{ path: '/login', component: require('@/components/Home').default }
	]
});
```



## 12. 使用 keep-alive

在路由来回跳转时，可以通过内置组件 `<keep-alive></keep-alive>` 来把组件缓存起来，在组件切换的时候不进行卸载，提升性能

- 也可以用 `include/exclude` 来 缓存/不缓存 指定组件
- 可通过两个生命周期 `activated/deactivated` 来获取当前组件状态



## 10. 长列表优化

根据索引，只渲染可视区域的dom元素



## 11. 打包体积优化









