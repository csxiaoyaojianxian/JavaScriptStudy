import React, { Component } from 'react';
import store from "./store";

export default class Tab extends Component {

  hide() {
    store.isTabbarShow = false;
  }

  render() {
    return (
      <div>
        TabBar <button onClick={this.hide}>hide</button>
      </div>
    )
  }
}