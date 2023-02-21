import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router';
Vue.config.productionTip = false
const Web3 = require('web3')
const web3 = new Web3('http://10.221.19.216:22000');

Vue.prototype.$web3 =web3

Vue.use(Element)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
 