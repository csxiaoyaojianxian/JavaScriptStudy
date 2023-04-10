import Component from './Component';
import TextContext from './context';
import {useState} from "react";



const App = () => {

    const [user] = useState({ name: 'sunshine', age: 20, sayHello: (props) => { console.log(props) } });

    return(
        <div>
            {/* Provider 和 Consumer 方式对应，默认读取最近的 Provider 的数据 */}
            {/* <TextContext.Provider value={{ name: 'sunshine', age: 20 }}> */}
            <TextContext.Provider value={user}>
                <Component />
            </TextContext.Provider>

            {/* 访问 context.js 定义的数据 */}
            <Component />
        </div>
    );
};

export default App;