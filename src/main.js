import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import heroes from './components/pages/heroes.vue'
import dashboard from './components/pages/dashboard.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import herodata from './components/pages/herodata.vue'

Vue.filter('uppercase', value => value.toUpperCase())
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)






new Vue({
    render: h => h(App),
    router,
    dashboard,
    heroes,
    herodata
}).$mount('#app')

