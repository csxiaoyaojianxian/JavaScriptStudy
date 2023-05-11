import React, { Component } from 'react';
import { autorun } from 'mobx';
import store from './store';
import Tab from './Tab';

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