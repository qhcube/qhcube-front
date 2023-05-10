import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: 'home', component: () => import('@/components/MainHome.vue')},
    ];
export const router =createRouter({
    history: createWebHistory(),
    routes
});