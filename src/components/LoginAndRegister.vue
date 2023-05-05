<template>
    <div v-if="!this.userStoreQHCube.isAuthenticated && !this.newRecordVisiblility" class="flex flex-column bg-indigo-50 shadow-6">
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
            <Button label="Resgistrarse" link @click="this.newRecord()"></Button>
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
    <new-record v-else-if="this.newRecordVisiblility" @closeNewRecord="this.closeNewRecord()" />
    <registered-player v-else />
</template>

<script>
import RegisteredPlayer from "@/components/RegisteredPlayer.vue";
import authUtils from "@/assets/js/authUtils.js";
import NewRecord from "@/components/NewRecord.vue";

export default {
    name: "LoginAndRegister",
    inject: ["userStoreQHCube"],
    emits: ["showNewRecord"],
    components: { RegisteredPlayer, NewRecord },
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
            newRecordVisiblility: false
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
        newRecord() {
            this.newRecordVisiblility = true;
            this.$emit("showNewRecord");
        },
        closeNewRecord() {
            this.newRecordVisiblility = false;
        }
    }
}
</script>

<style scoped>
p {
    line-height: 1.2em;
}
</style>