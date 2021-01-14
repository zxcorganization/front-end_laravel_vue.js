import VueRouter from 'vue-router'
import dashboard from './components/pages/persons/dashboard.vue'
import persons from './components/pages/persons/persons.vue'
import editPerson from './components/pages/persons/edit.vue'
import login from './components/pages/auth/login.vue'
import createPerson from './components/pages/persons/create.vue'
import PageNotFound from "./components/pages/pageNotFound";
import Home from "./components/pages/home";

let router = new VueRouter({
    routes: [
        {
            path: '*',
            component: PageNotFound,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/',
            component: Home,
            name: 'home',
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/persons',
            component: persons,
            name: 'persons',
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/persons/edit/:id',
            name: 'persons/edit',
            component: editPerson,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/persons/create',
            name: 'persons/create',
            component: createPerson,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name : 'login',
            component: login
        }

    ],
    mode: 'history'
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth && localStorage.getItem('token') == null)) {
        next({
            path: '/login',
            params: {nextUrl: to.fullPath}
        })
    } else {
        next();
    }
})

export default router;
