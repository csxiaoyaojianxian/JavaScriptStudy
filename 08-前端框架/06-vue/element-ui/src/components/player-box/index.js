import PlayerBox from './src/PlayerBox'

/* istanbul ignore next */
PlayerBox.install = function(Vue) {
  Vue.component(PlayerBox.name, PlayerBox);
};

export default PlayerBox;
