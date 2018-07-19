import MapDialog from './src/MapDialog'

/* istanbul ignore next */
MapDialog.install = function(Vue) {
  Vue.component(MapDialog.name, MapDialog);
};

export default MapDialog;
