import TeamBox from './src/TeamBox'

/* istanbul ignore next */
TeamBox.install = function(Vue) {
  Vue.component(TeamBox.name, TeamBox);
};

export default TeamBox;
