import LeftMenu from './src/LeftMenu';

/* istanbul ignore next */
LeftMenu.install = function(Vue) {
  Vue.component(LeftMenu.name, NavBar);
};

export default LeftMenu;
