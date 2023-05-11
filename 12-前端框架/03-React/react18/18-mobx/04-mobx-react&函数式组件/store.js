import { observable, configure, action, runInAction } from 'mobx';

configure({
  enforceActions: 'always', // 'always' 'never'
})

class Store {
  @observable isTabbarShow = true
  @observable list = []

  @action changeShow() {
    this.isTabbarShow = true;
  }
  @action changeHide() {
    this.isTabbarShow = false;
  }

  // 处理异步逻辑 runInAction
  @action getList() {
    setTimeout(() => {
      runInAction(() => {
        this.list = [1, 2, 3];
      })
    }, 1000);
  }
}

const store = new Store();

export default store;