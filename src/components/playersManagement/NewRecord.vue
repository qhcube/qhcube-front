<template>
    <div class="flex flex-column bg-indigo-50 shadow-6">
        <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
            <div class="flex">
                <h1>Nuevo registro de Jugador</h1>
            </div>
        </div>
        <form v-if="!this.successMessageVisibility"
              class="flex flex-column px-2 align-items-start"
              @submit.prevent="this.registrar()">
            <div v-for="(field, value, key) in this.player" class="flex gap-2">
                <div class="flex flex-column mb-3 gap-2">
                    <label :id="'lbl' + value" :for="value" class="block text-900 font-medium mb-2 mt-2">
                        {{ value.charAt(0).toUpperCase() + value.substring(1) }}
                    </label>
                    <InputText :id="value" :placeholder="value.charAt(0).toUpperCase() + value.substring(1)"
                               :type="key > 2 ? 'password' : 'text'" v-model="this.player[value]" autocomplete="on"/>
                </div>
                <InlineMessage v-if="this.checkMsgs[key].length > 0" class="h-min align-self-end mb-3">
                    {{ this.checkMsgs[key] }}
                </InlineMessage>
            </div>

            <div class="flex flex-row gap-2">
                <Button label="Registrar" type="submit" severity="success" class="mt-4 mb-2"/>
                <Button label="Reiniciar Formulario" type="button" severity="warning" @click="this.reiniciar()"
                        class="mt-4 mb-2"/>
                <Button label="Cancelar" type="button" severity="danger" @click="this.cancel()" class="mt-4 mb-2"/>
            </div>
        </form>


        <div class="flex" v-if="this.successMessageVisibility">
            <Message
                @close="this.successMessageVisibility = false; this.viewStoreQHCube.setPlayerComponent('login-and-register')"
                icon="pi" severity="success" style="margin: 4rem auto 6rem auto">
                <div class="flex flex-column">
                    <span class="align-self-center font-bold text-lg" style="margin-left: 1rem; margin-right: 3rem"> ¡Usuario registrado con éxito!</span><br/>
                    <div class="flex flex-column bg-green-50 mr-4 border-round-2xl">
                  <span class="font-semibold" style="margin: 1rem 3rem 0 2rem">{{
                          this.player.nombre
                      }} {{ this.player.apellidos }},</span>
                        <span style="margin: 1rem 3rem 1rem 2rem;">Recibirás en breve un correo electrónico en</span>
                        <span class="align-self-center font-semibold" style="margin: 0 3rem 1rem 2rem;">{{
                                this.player.email
                            }}</span>
                        <span style="margin: 0 3rem 1rem 2rem;">para que puedas activar tu cuenta.</span>
                    </div>
                </div>
            </Message>
        </div>
    </div>
</template>

<script>
import authUtils from "../../assets/js/authUtils.js";

export default {
    name: "NewRecord",
    inject: ["playerStoreQHCube", "viewStoreQHCube"],
    data() {
        return {
            player: {
                nombre: "",
                apellidos: "",
                email: "",
                password: "",
                passwordConfirm: ""
            },
            successMessageVisibility: false,
            checkMsgs: ["", "", "", "", ""]
        }
    },
    watch: {
        player: {
            handler: function (val) {
                if (val.nombre.length > 0) {
                    this.checkMsgs[0] = "";
                    this.$el.querySelector("#nombre").classList.remove("p-invalid");
                }
                if (val.apellidos.length > 0) {
                    this.checkMsgs[1] = "";
                    this.$el.querySelector("#apellidos").classList.remove("p-invalid");
                }
                if (val.email.length > 0) {
                    this.checkMsgs[2] = "";
                    this.$el.querySelector("#email").classList.remove("p-invalid");
                }
                if (val.password.length > 0) {
                    this.checkMsgs[3] = "";
                    this.$el.querySelector("#password").classList.remove("p-invalid");
                }
                if (val.passwordConfirm.length > 0) {
                    this.checkMsgs[4] = "";
                    this.$el.querySelector("#passwordConfirm").classList.remove("p-invalid");
                }
            },
            deep: true
        }
    },
    mounted() {
        this.$el.querySelector("#passwordConfirm").placeholder = "Confirmar password";
        this.$el.querySelector("#lblpasswordConfirm").innerText = "Confirmar password";
    },
    methods: {
        cancel() {
            this.viewStoreQHCube.setPlayerComponent('login-and-register');
        },
        reiniciar() {
            Object.keys(this.player).forEach(key => {
                this.player[key] = "";
                this.$el.querySelector("#" + key).classList.remove("p-invalid");
            });
            this.checkMsgs = ["", "", "", "", ""];
        },
        async registrar() {
            if (this.player.nombre.length < 1) {
                this.checkMsgs[0] = "El nombre no puede estar vacío.";
                this.$el.querySelector("#nombre").classList.add("p-invalid");
            }
            if (this.player.apellidos.length < 1) {
                this.checkMsgs[1] = "Los apellidos no pueden estar vacíos.";
                this.$el.querySelector("#apellidos").classList.add("p-invalid");
            }
            if (this.player.email.length < 1) {
                this.checkMsgs[2] = "El email no puede estar vacío.";
                this.$el.querySelector("#email").classList.add("p-invalid");
            } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.player.email))) {
                this.checkMsgs[2] = "El email no es válido: '" + this.player.email + "'";
                this.$el.querySelector("#email").classList.add("p-invalid");
            }
            if (this.player.password.length < 6) {
                this.checkMsgs[3] = "La contraseña debe tener al menos 6 caracteres.";
                this.$el.querySelector("#password").classList.add("p-invalid");
            }
            if (this.player.password !== this.player.passwordConfirm) {
                this.checkMsgs[4] = "Las contraseñas no coinciden.";
                this.$el.querySelector("#passwordConfirm").classList.add("p-invalid");
            }

            if (this.isValidPlayerInfo()) {
                this.checkMsgs[0] = await authUtils.registerNewPlayer(this.player);
                if (this.checkMsgs[0] === "OK") {
                    this.successMessageVisibility = true;
                    this.playerStoreQHCube.$reset();
                }
            }
        },
        isValidPlayerInfo() {
            for (let i = 0; i < this.checkMsgs.length; i++) {
                if (this.checkMsgs[i].length > 0) {
                    return false;
                }
            }
            return true;
        }
    }
}
</script>

<style scoped>

</style>
