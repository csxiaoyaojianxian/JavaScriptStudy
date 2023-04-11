import React, {useCallback, useState} from 'react';
import A from "./A";

const App = () => {
    const [count, setCount] = useState(1);
    const [num] = useState(1);

    // useCallback 钩子函数，用于缓存回调函数
    // 若不使用 useCallback，A 组件 onAdd 属性传入的 clickHandler 会变，导致 memo 失效
    // 若不指定依赖数组，每次都会重建，注意一定要将回调函数中用到的所有变量都设置到依赖数组中

    const clickHandler = useCallback(() => {
        setCount(prevState => prevState + num);
    }, [num]);

    return (
        <div>
            <h2>App - {count}</h2>
            <button onClick={clickHandler}>App</button>
            <A onAdd={clickHandler} />
        </div>
    );
};

export default App;
