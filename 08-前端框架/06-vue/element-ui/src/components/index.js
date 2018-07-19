import NavBar from './nav-bar/index.js';
import LeftMenu from './left-menu/index.js';
import ServicePanel from './service-panel/index.js';
import TeamBox from './team-box/index.js'
import MatchDialog from './match-dialog/index.js'
import PlayerBox from './player-box/index.js'
import ChickenPlayerBox from './chicken-player-box/index.js'
import MapDialog from './map-dialog/index.js'
import ChickenTeamBox from './chicken-team-box/index.js'
import ChickenFightDialog from './chicken-fight-dialog/index.js'

const components = [
  NavBar,
  LeftMenu,
  ServicePanel,
  TeamBox,
  MatchDialog,
  PlayerBox,
  MapDialog,
  ChickenTeamBox,
  ChickenPlayerBox,
  ChickenFightDialog
]
const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;

  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  version: '1.3.7',
  install,
  NavBar,
  LeftMenu,
  ServicePanel,
  TeamBox,
  MatchDialog,
  PlayerBox,
  MapDialog,
  ChickenTeamBox,
  ChickenPlayerBox,
  ChickenFightDialog
}
