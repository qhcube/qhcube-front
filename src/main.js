import { createApp } from 'vue'
import App from './App.vue'

import router from "../router.js";

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
    ripple: true,
    inputStyle: "filled"
});

app.component('Button', Button);
app.component('Card', Card);

app.mount('#app')
