import ChickenTeamBox from './src/ChickenTeamBox'

/* istanbul ignore next */
ChickenTeamBox.install = function(Vue) {
  Vue.component(ChickenTeamBox.name, ChickenTeamBox);
};

export default ChickenTeamBox;
