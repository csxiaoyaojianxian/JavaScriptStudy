import ChickenPlayerBox from './src/ChickenPlayerBox'

/* istanbul ignore next */
ChickenPlayerBox.install = function(Vue) {
  Vue.component(ChickenPlayerBox.name, ChickenPlayerBox);
};

export default ChickenPlayerBox;
