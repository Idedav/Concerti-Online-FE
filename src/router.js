import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import Error404 from './pages/Error404.vue';
import Error403 from './pages/Error403.vue';
import Login from './pages/Login.vue';
import PaymentConcert from './pages/PaymentConcert.vue';
import Orders from './pages/Orders.vue';
import OrderDetail from './pages/OrderDetail.vue';


const publicRoutes = ['/login'];

const router = createRouter({

    history: createWebHistory(),

    linkExactActiveClass: 'active',

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/order/:idOrder',
            name: 'order-detail',
            component: OrderDetail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/payment/:idConcert',
            name: 'payment-concert',
            component: PaymentConcert,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/unauthorized',
            name: 'error-403',
            component: Error403
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'error-404',
            component: Error404
        }
    ]

});

router.beforeEach(function(to, from, next) {

    const accessToken = localStorage.getItem('access_token');

    const temp = accessToken === null ? undefined : accessToken;

    if(publicRoutes.includes(to.path) && temp){
        next('/');
    } else if(to.matched.some(record => record.meta.requiresAuth) && !temp) {
        next('/login');
    } else {
        next();
    }


});

export { router };