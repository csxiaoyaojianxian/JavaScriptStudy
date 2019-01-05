import Notification from './notification.vue'
import notify from './function'

export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
