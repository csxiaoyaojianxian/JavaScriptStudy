import ServicePanel from './src/ServicePanel';

/* istanbul ignore next */
ServicePanel.install = function(Vue) {
  Vue.component(ServicePanel.name, ServicePanel);
};

export default ServicePanel;
