import React, {useState} from 'react';
import A from "./components/A";

/**
 * React.memo() 一个高阶组件，用于缓存组件
 * 接收一个组件作为参数，并返回一个包装过的新组件，只有组件的props发生变化才会触发渲染
 */

const App = () => {
    const [count, setCount] = useState(1);
    const clickHandler = () => {
        setCount(prevState => prevState + 1);
    };

    return (
        <div>
            <h2>App - {count}</h2>
            <button onClick={clickHandler}>App 不触发A渲染</button>
            <A/>
        </div>
    );
};

export default App;
