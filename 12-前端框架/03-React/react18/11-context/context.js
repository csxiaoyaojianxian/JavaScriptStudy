import React from "react";

// 初始数据，在provider中赋值，在consumer中使用
const TextContext = React.createContext({
    name: 'csxiaoyao',
    age: 30,
    sayHello: (props) => {
      alert(props.name);
    }
});

export default TextContext;
