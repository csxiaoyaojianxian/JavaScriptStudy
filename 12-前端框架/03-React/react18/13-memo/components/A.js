import React, {useState} from 'react';
import B from "./B";

const A = () => {
    console.log('A渲染');

    const [count, setCount] = useState(1);
    const clickHandler = () => {
        setCount(prevState => prevState + 1);
    };

    const test = count % 4 === 0;

    return (
        <div>
            <h2>组件A - {count}</h2>
            <button onClick={clickHandler}>%4触发B渲染</button>
            <B test={test}/>
        </div>
    );
};

export default React.memo(A);
