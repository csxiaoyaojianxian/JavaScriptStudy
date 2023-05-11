import React, { Component } from 'react';
import Fun from './Fun';

// import { autorun } from 'mobx';
// import store from './store';
import { inject, observer } from 'mobx-react';


// 构建一个父组件 - 高阶组件 mobx-react
// 注入的名称根据前面传入的名称 <Provider store={store}>，此处为 store
@inject('store') // 装饰器inject仅作为引入
@observer
export default class App extends Component {

  // state = {
  //   isShow: false,
  // }

  componentDidMount() {
    // autorun(() => {
    //   this.setState({
    //     isShow: store.isTabbarShow,
    //   })
    // })

    console.log(this.props) // this.props.store
  }

  render() {
    return (
      <div>
        {this.props.store.isTabbarShow && <Fun />}
      </div>
    )
  }
}