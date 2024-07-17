import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import Error404 from './pages/Error404.vue';
import Error401 from './pages/Error401.vue';
import Login from './pages/Login.vue';
import PaymentConcert from './pages/PaymentConcert.vue';
import Orders from './pages/Orders.vue';
import OrderDetail from './pages/OrderDetail.vue';

const router = createRouter({

    history: createWebHistory(),

    linkExactActiveClass: 'active',

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders
        },
        {
            path: '/order/:idOrder',
            name: 'order-detail',
            component: OrderDetail
        },
        {
            path: '/payment/:idConcert',
            name: 'payment-concert',
            component: PaymentConcert
        },
        {
            path: '/unauthorized',
            name: 'error-401',
            component: Error401
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'error-404',
            component: Error404
        }
    ]

});

export { router };