// 由于没有动态更新，所有的生命周期钩子函数中
// 只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用
// 这就是说任何其他生命周期钩子函数中的代码（例如 beforeMount 或 mounted），只会在客户端执行
