import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import heroes from './pages/heroes.vue'
import dashboard from './pages/dashboard.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import herodata from './pages/herodata.vue'
console.log(axios.defaults.headers);
//delete axios.defaults.headers.common["Accept"];
delete axios.defaults.headers.post['Content-Type'];
  

Vue.filter('uppercase', value => value.toUpperCase())
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)


new Vue({
    render: h => h(App),
    router, dashboard,heroes, herodata
}).$mount('#app')

