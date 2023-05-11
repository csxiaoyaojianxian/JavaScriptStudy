import React, { Component } from 'react';
// import store from "./store";
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class Tab extends Component {

  hide = () => {
    this.props.store.changeHide();
  }

  render() {
    return (
      <div>
        TabBar <button onClick={this.hide}>hide</button>
      </div>
    )
  }
}