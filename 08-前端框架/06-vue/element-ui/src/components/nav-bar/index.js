import NavBar from './src/NavBar';

/* istanbul ignore next */
NavBar.install = function(Vue) {
  Vue.component(NavBar.name, NavBar);
};

export default NavBar;
