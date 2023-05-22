import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/', name: 'home', components: {
            default: () => import('@/components/MainHome.vue'),
            MainTitle: () => import('@/components/MainTitle.vue'),
            MainFooter: () => import('@/components/MainFooter.vue')
        }
    },
    { path: '/activated', name: 'activated', component: () => import('@/components/usersManagement/ActivatedAccountAlert.vue') },
    { path: '/:catchAll(.*)*', name: 'page-not-found', component: () => import('@/components/errors/PageNotFound.vue') }
    ];
export const router =createRouter({
    history: createWebHistory(),
    routes
});