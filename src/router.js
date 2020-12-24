import VueRouter from 'vue-router'
import dashboard from './components/pages/dashboard.vue'
import persons from './components/pages/persons.vue'
import persondata from './components/pages/persondata.vue'


export default new VueRouter({
    routes: [{
        path: '/',
        component:persons
         },
        {
            path: '/dashboard',
            component:dashboard
        },
      
        {
            path: '/persondata/:id',
            name:'persondata',
            component:  persondata
        }
     
    ],
    mode: 'history'

})
