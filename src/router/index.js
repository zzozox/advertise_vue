import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/index.vue'),
        },{
            path: '/login',
            name: 'login',
            component: () => import('@/views/login.vue'),
        },{
            path: '/register',
            name: 'register',
            component: () => import('@/views/register.vue'),
        },{
            path: '/pay',
            name: 'pay',
            component: () => import('@/views/pay.vue'),
        },{
            path: '/upload',
            name: 'upload',
            component: () => import('@/views/upload.vue'),
        }
    ]
})

router.beforeEach((to, from, next) => {
    const userId=sessionStorage.getItem("userId")
    if(to.name.startsWith('pay') && userId==null) {
        next('/login')
    } else {
        next()
    }
})

export default router
