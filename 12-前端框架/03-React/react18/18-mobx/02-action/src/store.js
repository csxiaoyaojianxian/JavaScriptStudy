import { observable, configure, action } from 'mobx';

configure({
  enforceActions: 'always', // 'always' 'never'
})

/*
const store = observable({
  isTabbarShow: true,
  list: [],

  changeShow() {
    this.isTabbarShow = true;
  },
  changeHide() {
    this.isTabbarShow = false;
  },
}, {
  // 标记方法为action
  changeShow: action,
  changeHide: action,
});
*/

class Store {
  @observable isTabbarShow = true
  @observable list = []

  @action changeShow() {
    this.isTabbarShow = true;
  }
  @action changeHide() {
    this.isTabbarShow = false;
  }
}

const store = new Store();

export default store;