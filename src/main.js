import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import persons from './components/pages/persons/persons.vue';
import dashboard from './components/pages/persons/dashboard.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import editPerson from './components/pages/persons/edit.vue';
import login from './components/pages/auth/login.vue';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import createPerson from "./components/pages/persons/create";
import PageNotFound from "./components/pages/pageNotFound";
import Home from "./components/pages/home";
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.filter('uppercase', value => value.toUpperCase())
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.token;
    return config;
});

axios.interceptors.response.use((response) => {
    if(response.status === 401) {
        localStorage.removeItem('token');
    }
    return response;
});
new Vue({
    render: h => h(App),
    router,
    dashboard,
    persons,
    editPerson,
    login,
    createPerson,
    PageNotFound,
    Home
}).$mount('#app')

