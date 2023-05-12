import {createRouter, createWebHistory} from "vue-router";
import MainHome from "../../components/MainHome.vue";

const routes = [
        { path: '/', name: 'home', component: MainHome }
    ];
export const router =createRouter({
    history: createWebHistory(),
    routes
});