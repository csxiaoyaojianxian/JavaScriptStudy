// 组件中部分逻辑如果直接写在函数体中，会影响到组件的渲染，如 setState 触发渲染死循环
// 为了避免副作用，使用钩子函数 useEffect() 处理那些不能直接写在组件内部的代码
// 如获取数据、记录日志、检查登录、设置定时器等
// useEffect() 中的回调函数会在组件每次渲染完毕之后执行，而正常函数体中的代码会在组件渲染前执行，避免了代码的执行影响到组件渲染

import { useState, useEffect } from 'react';
const App = () => {

    const [count, setCount] = useState(0);

    // 死循环，如列表清空时关闭页面操作
    /*
    if (count === 0) {
        setCount(0);
    }
    */

    /*
    useEffect(()=>{
        // 编写会产生副作用的代码
    
        return () => {
            // 清理函数，在下一次effect执行前调用，如清理定时器
        };
    }, [a, b]); // 限制只有当 a,b 发生变化时才执行，[]只执行一次
    */

    useEffect(() => {
        setCount(0);
    });

    return <div>{count}</div>;
};

export default App;