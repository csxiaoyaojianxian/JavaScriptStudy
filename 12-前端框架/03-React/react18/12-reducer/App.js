import React, {useReducer, useState} from 'react';

// 定义所有操作，返回state新值
// 为避免reducer重复创建，通常reducer会定义到组件外部
// state为当前最新state，action为一个对象，存储dispatch所发送的指令
const countReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUB':
            return state - 1;
        default:
            return state;
    }
};

const App = () => {
        /*
        const [count, setCount] = useState(1);
        const addHandler = () => {
            setCount(prevState => prevState + 1);
        };
        const subHandler = () => {
            setCount(prevState => prevState - 1);
        };
        */
        
        // useReducer(reducer, initialArg, init)  initialArg类似useState()中的初始值
        const [count, countDispatch] = useReducer(countReducer, 1);
        const addHandler = () => {
            countDispatch({type: 'ADD'});
        };
        const subHandler = () => {
            countDispatch({type: 'SUB'});
        };

        return (
            <div style={{fontSize: 30, width: 200, height: 200, margin: '100px auto', textAlign: 'center'}}>
                <button onClick={subHandler}>减少</button>
                {count}
                <button onClick={addHandler}>增加</button>

            </div>
        );
    }
;

export default App;
