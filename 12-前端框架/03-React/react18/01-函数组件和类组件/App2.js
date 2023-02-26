import React from "react";

class App extends React.Component {

  // ...类组件使用 this 获取各类属性方法

  // 创建属性存储DOM对象
  divRef = React.createRef();

  // 向state中添加属性
  state = {
    count: 0,
  };

  clickHandler = () => {
    // 【1】
    // this.setState({count: 1});

    // 【2】
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      }
    });
  };

  // 必须包含 render 方法，返回虚拟 DOM
  render() {
    return (
      <div ref={this.divRef}>
        <h1>类组件{this.props.item}</h1>
        <span>{this.state.count}</span>
        <button onClick={this.clickHandler}>click</button>
      </div>
    );
  }
}

export default App;
