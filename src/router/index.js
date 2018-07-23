import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/Chat/HomePage';
import Login from '@/components/Authentical/Login';
import Register from '@/components/Authentical/Register';
import firebase from '@/firebase';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/login',
        },
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/home',
            name: 'HomePage',
            component: HomePage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/group/:name',
            name: 'GroupChat',
            component: HomePage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        }
    ]
});

router.beforeEach((to, fr, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(route => route.meta.requiresAuth);

    if (requiresAuth && !currentUser) {
        next('login');
    } else if (!requiresAuth && currentUser) {
        next('home');
    } else {
        next();
    }
});

export default router;