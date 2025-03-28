/*
// useEffect 是 React 中的一个 Hook，用于在函数组件中处理副作用（如数据获取、订阅、手动更改 DOM 等）
// 无依赖项: 如果不传递依赖项数组，副作用函数会在每次渲染后执行
// 空依赖项数组: 如果传递一个空数组作为依赖项，副作用函数只会在组件首次渲染时执行一次
// 带依赖项: 如果传递一个依赖项数组，副作用函数会在依赖项发生变化时执行，同时会先执行上一次渲染中的清除函数

useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清除逻辑（可选）
  };
}, [依赖项]);

// demo

import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // 副作用逻辑
    // 相当于类组件中的生命周期方法 componentDidMount / componentDidUpdate
    console.log('组件渲染或更新了');

    return () => {
      // 清除逻辑（可选）
      // 相当于类组件中的生命周期方法 componentWillUnmount
      console.log('组件卸载了');
    };
  }); // 无依赖项，在每次渲染后执行
  // }, []); // 空依赖数组，只在组件挂载和卸载时执行

  return <div>Hello, useEffect!</div>;
}
 */


// 组件中部分逻辑如果直接写在函数体中，会影响到组件的渲染，如 setState 触发渲染死循环
// 为了避免副作用，使用钩子函数 useEffect() 处理那些不能直接写在组件内部的代码
// 如获取数据、记录日志、检查登录、设置定时器等
// useEffect() 中的回调函数会在组件每次渲染完毕之后执行，而正常函数体中的代码会在组件渲染前执行，避免了代码的执行影响到组件渲染

import { useState, useEffect } from 'react';
const App = () => {

    
    console.log('组件渲染');

    const [count, setCount] = useState(0);

    // 死循环，如列表清空时关闭页面操作
    /*
    if (count === 0) {
        setCount(0);
    }
    */

    // [重要] 在渲染阶段不会检查 state 值是否相同，使用 setState 会导致死循环
    // 1. setTimeout 跳出渲染阶段，会检查 state 值是否相同，相同不触发重新渲染
    // 2. useEffect 会在组件每次渲染完毕后执行，跳出渲染阶段
    // 注意：检查 state 值是否相同时，值第一次相同时 react 可能也会重新渲染
    /*
    setTimeout(() => {
        setCount(0);
    }, 0);
    */

    /*
    useEffect(()=>{
        // 编写会产生副作用的代码
        // ...

        const timer = setTimeout(() => {
            // ...
        }, 1000);
    
        return () => {
            // 清理函数，在下一次effect执行前调用，如清理定时器
            clearTimeout(timer);
        };
    }, [a, b]); // 限制只有当 a,b 发生变化时才执行，[]只执行一次
    */

    useEffect(() => {
        if (count === 0) {
            setCount(0);
        }
    });

    return <div>{count}</div>;
};

export default App;