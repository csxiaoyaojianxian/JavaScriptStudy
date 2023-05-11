import React, { Component } from 'react';
import { observable, autorun } from 'mobx';
import store from './store';
import Tab from './Tab';

// npm i mobx@5

/**
 * 观察普通类型数据
 */
var observableNumber = observable.box(10);
var observableName = observable.box('test');
// 监听，订阅者，用到的才会执行，而 subscribe 所有变化都会执行
autorun(() => {
  console.log(observableNumber.get());
});
autorun(() => {
  console.log(observableName.get());
});
setTimeout(() => { observableNumber.set(20); }, 1000);
setTimeout(() => { observableName.set('dev'); }, 2000);

/**
 * 观察对象，通过map 或 不通过map
 */
const myObj1 = observable.map({
  name: 'user name1',
  age: 11,
});

//////// 【推荐】 ///////
const myObj2 = observable({
  name: 'user name2',
  age: 22,
});
autorun(() => {
  console.log('对象1的name属性改变了', myObj1.get('name'));
  console.log('对象2的name属性改变了', myObj2.name);
});
// 不建议直接修改，建议通过action操作
// 不会触发上面的autorun
setTimeout(() => { myObj1.set('age', 12); }, 1000);
setTimeout(() => { myObj2.age = 23; }, 1000);
// 触发上面的autorun
setTimeout(() => { myObj1.set('name', 'new user name1'); }, 2000);
setTimeout(() => { myObj2.name = 'new user name2'; }, 2000);

/**
 * 观察数组
 */
const list = observable([1, 2, 4]);
autorun(() => {
  console.log('list改变了', list.length);
});
setTimeout(() => { list[2] = 3; }, 1000);


export default class App extends Component {

  state = {
    isShow: false,
  }

  componentDidMount() {
    autorun(() => {
      this.setState({
        isShow: store.isTabbarShow,
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.isShow && <Tab />}
      </div>
    )
  }
}