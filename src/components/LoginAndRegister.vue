<template>
    <div class="flex flex-column bg-indigo-50 shadow-6" v-if="!this.userStoreQHCube.isAuthenticated && !this.registroNuevoVisible">
        <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
            <div class="flex">
                <h1>Registro de jugador</h1>
            </div>
        </div>
        <div class="flex flex-column px-2 align-items-start">
            <p>
                Puedes jugar sin registrarte, pero si te registras, podremos medir el tiempo que tardas en resolver
                el juego y registrarlo en la tabla de puntuaciones.
            </p>
            <Button label="Resgistrarse" link @click="this.registroNuevo()"></Button>
            <p>
                Si ya estás registrado, puedes iniciar sesión:
            </p>
            <div class="flex align-items-start pl-3">
                <div class="flex flex-nowrap align-content-center align-items-start gap-2 pb-4">
                    <div class="flex p-inputgroup w-15rem">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                        </span>
                        <InputText placeholder="eMail" v-model="this.user.email" type="email"/>
                    </div>
                    <div class="flex p-inputgroup w-9rem">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        <InputText placeholder="Password" v-model="this.user.password" type="password"/>
                    </div>
                    <div class="flex p-inputgroup w-fit">
                        <Button type="submit" label="Login" @click="this.performLogin() "/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <registro-nuevo v-else-if="this.registroNuevoVisible" @closeRegistroNuevo="this.closeRegistroNuevo()" />
    <usuario-registrado v-else />
</template>

<script>
import RegistroNuevo from "./RegistroNuevo.vue";
import UsuarioRegistrado from "./UsuarioRegistrado.vue";
import authUtils from "../authUtils.js";

export default {
    name: "LoginAndRegister",
    inject: ["userStoreQHCube"],
    components: {UsuarioRegistrado, RegistroNuevo },
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
            registroNuevoVisible: false
        }
    },
    methods: {
        performLogin() {
            const userAux = {
                email: this.user.email,
                password: this.user.password,
                nombre: this.user.email.substring(0, this.user.email.indexOf(".")),
                apellidos: this.user.email.substring(this.user.email.indexOf(".") + 1, this.user.email.indexOf("@"))
            }
            userAux.nombre =userAux.nombre.charAt(0).toUpperCase() + userAux.nombre.slice(1);
            userAux.apellidos =userAux.apellidos.charAt(0).toUpperCase() + userAux.apellidos.slice(1);
            authUtils.login(userAux);
        },
        registroNuevo() {
            this.registroNuevoVisible = true;
            this.$emit("closeDescripcion");
        },
        closeRegistroNuevo() {
            this.registroNuevoVisible = false;
            this.$emit("openDescripcion");
        }
    }
}
</script>

<style scoped>
p {
    line-height: 1.2em;
}
</style>