import VueRouter from 'vue-router'
import about from './components/pages/dashboard.vue'
import home from './components/pages/heroes.vue'
import herodata from './components/pages/herodata.vue'

export default new VueRouter({
    routes: [{
        path: '',
        component:home
    },
        {
            path: '/about',
            component:about
        },
      
        {
            path: '/herodata/:id',
            name:'herodata',
            component:  herodata
        }
     
    ],
    mode: 'history'

})
