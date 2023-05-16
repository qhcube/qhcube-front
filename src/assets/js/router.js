import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/', name: 'home', components: {
            default: () => import('@/components/MainHome.vue'),
            MainTitle: () => import('@/components/MainTitle.vue'),
            MainFooter: () => import('@/components/MainFooter.vue')
        }
    }
    ];
export const router =createRouter({
    history: createWebHistory(),
    routes
});