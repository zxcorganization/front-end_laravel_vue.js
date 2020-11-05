import VueRouter from 'vue-router'
import about from './pages/dashboard.vue'
    
import home from './pages/heroes.vue'
import herodata from './pages/herodata.vue'
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
