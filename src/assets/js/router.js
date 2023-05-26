import {createRouter, createWebHistory} from "vue-router";
import axios from "axios";
import {useUserStoreQHCube} from "@/assets/js/userSotorageQHCube.js";

const routes = [
    {
        path: '/', name: 'home', components: {
            default: () => import('@/components/MainHome.vue'),
            MainTitle: () => import('@/components/MainTitle.vue'),
            MainFooter: () => import('@/components/MainFooter.vue')
        }
    },
    { path: '/email-validation', name: 'email-validation', component: () => import('@/components/usersManagement/EmailValidation.vue') },
    { path: '/:catchAll(.*)*', name: 'page-not-found', component: () => import('@/components/errors/PageNotFound.vue') }
    ];

export const router =createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userStoreQHCube = useUserStoreQHCube();

    if (userStoreQHCube.isAuthenticated && !axios.defaults.headers.common['Authorization']) {
        console.log("Poniendo el token en el header " + 'Bearer ' + userStoreQHCube.jwttoken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStoreQHCube.jwttoken;
    }
    next();
});