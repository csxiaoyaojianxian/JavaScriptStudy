import {useRef} from "react";

const App = () => {
  /*
    使用 react 获取原生 DOM 对象
      1. 使用 useRef() 钩子函数创建一个存储DOM对象的容器（只能用于函数组件或自定义钩子）
        useRef 返回一个普通的JS对象
        {current:undefined}
        尽量不要直接创建一个对象替代 useRef，因为自己创建的对象每次渲染都会创建一个新对象，而useRef创建的对象每次渲染获得的是同一个对象

      2. 将容器设置为目标DOM对象元素的ref属性，react会自动将当前元素的DOM对象，设置为容器current属性
        <h1 ref={xxx}>...</h1>

      3. 类组件写法参考《函数组件和类组件》
   */
  const h1Ref = useRef(); // 创建一个容器，h1Ref={current:null}

  const clickHandler = () => {
    h1Ref.current.innerText = 'changed';
  };

  return <div className={'app'}>
    <h1 id="header" ref={h1Ref}>origin</h1>
    <button onClick={clickHandler}>change</button>
  </div>;
};

export default App;
