import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import router from './router'
import store from './store/store'
import './assets/css/styles.css'

// Axios
import axios from './axios.js'
Vue.prototype.$http = axios

// Sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 
Vue.use(VueSweetalert2);

// Notifications
import Notifications from 'vue-notification' 
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
