import {useContext} from 'react';

// Context类似于JS中的全局作用域，可以将一些公共数据设置到一个同一个Context中，使所有组件可以访问到这些数据
import TextContext from './context';

// 调用方式1: Consumer，标签体必须是一个函数
// 调用方式2: useContext钩子函数

const Demo = () => {

  const ctx2 = useContext(TextContext);

  const clickHandler = () => {
    ctx2.sayHello({
      name: 'victor'
    });
  };


  return (
    <div>
      <button onClick={clickHandler}>add age</button>

      { /* 方式1 */ }
      <TextContext.Consumer>
        {(ctx1)=>{
          return (
            <ul>
              <li>{ctx1.name}</li>
              <li>{ctx1.age}</li>
            </ul>
          );
        }}
      </TextContext.Consumer>
      
      { /* 方式2 推荐 */ }
      <ul>
          <li>{ctx2.name}</li>
          <li>{ctx2.age}</li>
      </ul>
    </div>
  );
};

export default Demo;