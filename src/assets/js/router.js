import {createRouter, createWebHistory} from "vue-router";
import axios from "axios";
import {usePlayerStoreQHCube} from "./playerSotorageQHCube.js";

const routes = [
    {
        path: '/', name: 'home', components: {
            default: () => import('../../components/MainHome.vue'),
            MainTitle: () => import('../../components/MainTitle.vue'),
            MainFooter: () => import('../../components/MainFooter.vue')
        }
    },
    {
        path: '/email-validation',
        name: 'email-validation',
        component: () => import('../../components/playersManagement/EmailValidation.vue')
    },
    {
        path: '/:catchAll(.*)*',
        name: 'page-not-found',
        component: () => import('../../components/errors/PageNotFound.vue')
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const playerStoreQHCube = usePlayerStoreQHCube();

    if (playerStoreQHCube.isAuthenticated && !axios.defaults.headers.common['Authorization']) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + playerStoreQHCube.jwttoken;
    }
    next();
});
