import React, { Component } from 'react';
import store from "./store";

export default class Tab extends Component {

  hide() {
    // store.isTabbarShow = false;
    // 使用 mobx action
    store.changeHide();
  }

  render() {
    return (
      <div>
        TabBar <button onClick={this.hide}>hide</button>
      </div>
    )
  }
}