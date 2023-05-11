import {observable} from 'mobx';

const store = observable({
  isTabbarShow: true,
  list: [],
});

export default store;