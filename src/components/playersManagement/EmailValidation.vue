<template>
    <div class="flex flex-nowrap w-full">
        <Message @close="this.closeAlert()" :severity="this.result.status === 'OK' ? 'success' : 'error'"
                 icon="pi" style="margin: 5rem auto">
            <div class="flex flex-column gap-2 w-full ml-3 mr-3">
                <span class="font-bold text-lg align-self-center">¡{{ this.result.status }}!</span>
                <div class="flex flex-column bg-green-50 mr-4 border-round-2xl">
                    <span class="font-semibold m-3"> {{ this.result.message }} </span>
                    <span class="m-3 mb-1 text-sm"> {{ this.result.optionalMessage }} </span>
                    <span v-if="this.result.status !== 'OK'" class="text-xs m-3">
               Si crees que hay algún error, puedes ponerte en <br/>
               contacto con nosotros a través de correo electrónico:<br/>
               <a :href="'mailto:' + this.systemEmail" target="_blank">{{ this.systemEmail }}</a>
            </span>
                </div>
            </div>
        </Message>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import authUtils from "../../assets/js/authUtils.js";

export default defineComponent({
    name: "EmailValidation",
    inject: ["viewStoreQHCube"],
    data() {
        return {
            systemEmail: "",
            code: "",
            email: "",
            result: {
                status: "",
                message: "",
                optionalMessage: ""
            },
        }
    },
    async mounted() {
        this.systemEmail = import.meta.env.VITE_APP_SYSTEM_EMAIL;
        this.code = this.$route.query.code;
        this.email = this.$route.query.email;

        this.result = await authUtils.emailValidation(this.email, this.code);

        if (this.result.status === "OK") {
            this.optionalMessage = "Ya puedes iniciar sesión como usuario registrado.";
        } else {
            if (this.result.optionalMessage === "")
                this.result.optionalMessage = "No se ha podido llevar a cabo la activación de la cuenta.";
        }
    },
    methods: {
        closeAlert() {
            this.$router.push({name: 'home'});
        }
    }
})
</script>

<style scoped>

</style>
