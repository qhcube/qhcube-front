<template>
    <div class="flex flex-column bg-indigo-50 shadow-6">
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
            <Button label="Resgistrarse" link @click="this.viewStoreQHCube.setUserComponent('new-record')"></Button>
            <p>
                Si ya estás registrado, puedes iniciar sesión:
            </p>
            <div class="flex align-items-start pl-3">
                <div class="flex flex-nowrap align-content-center align-items-start gap-2 pb-4">
                    <div class="flex p-inputgroup w-15rem">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                        </span>
                        <InputText placeholder="eMail" type="email" v-model="this.user.email"/>
                    </div>
                    <div class="flex p-inputgroup w-9rem">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        <InputText placeholder="Password" type="password" v-model="this.user.password"/>
                    </div>
                    <div class="flex p-inputgroup w-fit">
                        <Button label="Login" type="submit" @click="this.performLogin() "/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authUtils from "@/assets/js/authUtils.js";

export default {
    name: "LoginAndRegister",
    inject: ["userStoreQHCube", "viewStoreQHCube"],
    data() {
        return {
            user: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        performLogin() {
            // TODO: Borrar esto y poner lo que hay en los campos de texto.
            const userAux = {
                email: this.user.email,
                password: this.user.password,
                nombre: this.user.email.substring(0, this.user.email.indexOf(".")),
                apellidos: this.user.email.substring(this.user.email.indexOf(".") + 1, this.user.email.indexOf("@"))
            }
            userAux.nombre =userAux.nombre.charAt(0).toUpperCase() + userAux.nombre.slice(1);
            userAux.apellidos =userAux.apellidos.charAt(0).toUpperCase() + userAux.apellidos.slice(1);
            authUtils.login(userAux);

            // TODO Añadir que vaya a un usuario registrado...
            /*
            if (this.userStoreQHCube.isAuthenticated) {
                this.userStoreQHCube.setUserComponent('registered-user');
                }
            */
        }
    }
}
</script>

<style scoped>
p {
    line-height: 1.2em;
}
</style>