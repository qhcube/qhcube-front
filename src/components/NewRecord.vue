<template>
    <div class="flex flex-column bg-indigo-50 shadow-6">
        <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
            <div class="flex">
                <h1>Nuevo registro de Jugador</h1>
            </div>
        </div>
        <div v-if="!this.successMessageVisibility" class="flex flex-column px-2 align-items-start">

            <div v-for="(field, value, key) in this.user" class="flex gap-2">
                <div class="flex flex-column mb-3 gap-2">
                    <label :id="'lbl' + value" :for="value" class="block text-900 font-medium mb-2 mt-2">
                        {{ value.charAt(0).toUpperCase() + value.substring(1) }}
                    </label>
                    <InputText :id="value" :placeholder="value.charAt(0).toUpperCase() + value.substring(1)"
                               :type="key > 2 ? 'password' : 'text'" v-model="this.user[value]"/>
                </div>
                <InlineMessage v-if="this.checkMsgs[key].length > 0" class="h-min align-self-end mb-3">
                    {{ this.checkMsgs[key] }}
                </InlineMessage>
            </div>

            <div class="flex flex-row gap-2">
                <Button label="Registrar" severity="success" @click="this.registrar()" class="mt-4 mb-2"/>
                <Button label="Reiniciar Formulario" severity="warning" @click="this.reiniciar()" class="mt-4 mb-2"/>
                <Button label="Cancelar" severity="danger" @click="this.cancel()" class="mt-4 mb-2"/>
            </div>
        </div>

        <div class="flex" v-else>
            <Message @close="this.successMessageVisibility = false; this.cancel()"
                     icon="pi" severity="success" style="margin: 4rem auto 6rem auto">
                <div class="flex flex-column">
                    <span style="font-weight: bold; margin-left: 1rem; margin-right: 3rem"> ¡Usuario registrado con éxito!</span><br/>
                    <div class="flex flex-column bg-green-50 mr-4 border-round-2xl align-items-center">
                        <span style="margin: 1rem 3rem 0 2rem"> {{ this.user.nombre }} {{ this.user.apellidos }} </span>
                        <span style="margin: 1rem 3rem 1rem 2rem;"> {{ this.user.email }}</span>
                    </div>
                </div>
            </Message>
        </div>
    </div>
</template>

<script>
import authUtils from "@/assets/js/authUtils.js";

export default {
    name: "NewRecord",
    emits: ['closeNewRecord'],
    data() {
        return {
            user: {
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
        user: {
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
            this.$emit('closeNewRecord');
        },
        reiniciar() {
            Object.keys(this.user).forEach(key => {
                this.user[key] = "";
                this.$el.querySelector("#" + key).classList.remove("p-invalid");
            });
            this.checkMsgs = ["", "", "", "", ""];
        },
        registrar() {
            if (this.user.nombre.length < 1) {
                this.checkMsgs[0] = "El nombre no puede estar vacío.";
                this.$el.querySelector("#nombre").classList.add("p-invalid");
            }
            if (this.user.apellidos.length < 1) {
                this.checkMsgs[1] = "Los apellidos no pueden estar vacíos.";
                this.$el.querySelector("#apellidos").classList.add("p-invalid");
            }
            if (this.user.email.length < 1) {
                this.checkMsgs[2] = "El email no puede estar vacío.";
                this.$el.querySelector("#email").classList.add("p-invalid");
            } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email))) {
                this.checkMsgs[2] = "El email no es válido: '" + this.user.email + "'";
                this.$el.querySelector("#email").classList.add("p-invalid");
            }
            if (this.user.password.length < 6) {
                this.checkMsgs[3] = "La contraseña debe tener al menos 6 caracteres.";
                this.$el.querySelector("#password").classList.add("p-invalid");
            }
            if (this.user.password !== this.user.passwordConfirm) {
                this.checkMsgs[4] = "Las contraseñas no coinciden.";
                this.$el.querySelector("#passwordConfirm").classList.add("p-invalid");
            }

            if (!this.isValidPlayerInfo()) {
                authUtils.registerNewPlayer(this.user);
                this.successMessageVisibility = true;
            }
        },
        isValidPlayerInfo() {
            for (let i = 0; i < this.checkMsgs.length; i++) {
                if (this.checkMsgs[i].length > 0) {
                    return true;
                }
            }
            return false;
        }
    }
}
</script>

<style scoped>

</style>