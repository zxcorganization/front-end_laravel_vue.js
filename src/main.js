import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import persons from './components/pages/persons.vue';
import dashboard from './components/pages/dashboard.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import persondata from './components/pages/persondata.vue';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

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
     persons,
    persondata,
    el: "#app"
}).$mount('#app')

