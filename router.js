import {createRouter, createWebHistory} from 'vue-router'
import MainHome from "./src/components/MainHome.vue";

const routes = [
    {path: '/', name: 'home', component: MainHome},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router