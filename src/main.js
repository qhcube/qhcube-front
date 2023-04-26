import { createApp } from 'vue'
import App from './App.vue'

import router from "../router.js";

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import ScrollPanel from 'primevue/scrollpanel';

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'

const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
    ripple: true,
    inputStyle: "filled"
});

app.use(createPinia().use(piniaPersist));

app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Message', Message);
app.component('ScrollPanel', ScrollPanel);


app.mount('#app')
