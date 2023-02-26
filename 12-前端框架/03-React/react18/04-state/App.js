import {useState} from "react";

const App = () => {

  // 类组件写法参考《函数组件和类组件》

  // [初始值, 修改函数]
  const [counter, setCounter] = useState(1);
  const [user, setUser] = useState({ name: 'csxiaoyao', age: 30 });

  const addHandler = () => {
    // 直接给 counter 赋值不会触发重新渲染
    // counter += 1;

    // !!! [默认setState是异步的] !!!
    setCounter(counter + 1);

    // !!! [同步写法] !!!
    setCounter((prevCounter)=>{
      return prevCounter + 1;
    });
  };

  // 对象的修改
  const updateUserHandler = () => {
    // 浅复制
    /*
    const newUser = Object.assign({}, user);
    newUser.name = 'sunshine';
    setUser(newUser);
    */
    setUser({...user, name: 'sunshine'});
  };


  return <div className={'app'}>
    <h1>{counter}</h1>
    <button onClick={addHandler}>+</button>
    <button onClick={updateUserHandler}>change</button>
  </div>;
};

export default App;
