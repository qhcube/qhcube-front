import {createApp} from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import InlineMessage from "primevue/inlinemessage";
import InputText from "primevue/inputtext";
import Menubar from 'primevue/menubar';
import Message from "primevue/message";
import ScrollPanel from 'primevue/scrollpanel';

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'
import { usePlayerStoreQHCube } from "./assets/js/playerSotorageQHCube.js";
import {router} from "./assets/js/router.js";
import {useViewStoreQHCube} from "./assets/js/viewStoreQHCube.js";
import axios from "axios";

const app = createApp(App);

app.use(PrimeVue, { ripple: true , inputStyle: 'filled' });

app.use(createPinia().use(piniaPersist));
app.use(ConfirmationService);
app.use(router);

app.component('Button', Button);
app.component('Card', Card);
app.component('ConfirmDialog', ConfirmDialog);
app.component('InputText', InputText);
app.component('InlineMessage', InlineMessage);
app.component('Message', Message);
app.component('ScrollPanel', ScrollPanel);
app.component('Menubar', Menubar);

app.provide('playerStoreQHCube', usePlayerStoreQHCube());
app.provide('viewStoreQHCube', useViewStoreQHCube());

app.mount('#app')

axios.interceptors.response.use(
    config => {
        const playerStoreQHCube = usePlayerStoreQHCube();
        if (config.headers["authorization"]) {
            playerStoreQHCube.jwttoken = config.headers["authorization"].slice(7);
        }
        return config;
    },
    error => {
        const viewStoreQHCube = useViewStoreQHCube();

        console.log("AXIOS INTERCEPTOR ERROR: " + error.message + " - " + error.response.status);

        if (error.response.status === 401) {
            if (JSON.stringify(error.response.data).includes("Token expired")) {
                viewStoreQHCube.setError("¡ ERROR ! ",
                    "Tu sesión a expirado.", "Vuelve a iniciar sesión para continuar.");
            } else {
                console.log("Acceso no autorizado");
                viewStoreQHCube.setError("¡ ERROR ! ", "Acceso NO autorizado.", error.message);
            }
            //authUtils.logout();
        } else {
            viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.", error.message);
        }

        return Promise.reject(error);
    }
);