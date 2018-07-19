import Milo from './src/milo.js'
import Dialog from './src/dialog.js'
import Bus from './src/bus.js'

export default {
  install(Vue) {
    Vue.prototype.$milo = Milo;
    Vue.prototype.$dialog = Dialog;
    Vue.prototype.$event = Bus;
  }
};