<template>
    <div class="flex flex-column bg-indigo-50 shadow-6">
        <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
            <div class="flex">
                <h1>Nuevo registro de Jugador</h1>
            </div>
        </div>
        <div class="flex flex-column px-2 align-items-start" v-if="!this.mensajeVisible">
            <label for="email" class="block text-900 font-medium mb-2 mt-2">eMail</label>
            <InputText id="email" placeholder="eMail" v-model="this.user.email" type="email" class="w-full"/>

            <label for="name" class="block text-900 font-medium mb-2 mt-4">Nombre</label>
            <InputText id="name" placeholder="Nombre" v-model="this.user.name" type="text" class="w-full"/>

            <label for="surname" class="block text-900 font-medium mb-2 mt-4">Apellidos</label>
            <InputText id="surname" placeholder="Apellidos" v-model="this.user.surname" type="text" class="w-full"/>

            <label for="password" class="block text-900 font-medium mb-2 mt-4">Contraseña</label>
            <InputText id="password" type="password" class="w-full"/>

            <label for="passwordConfirm" class="block text-900 font-medium mb-2 mt-4">Confirma contraseña...</label>
            <InputText id="passwordConfirm" type="password" class="w-full"/>

            <div class="flex flex-row gap-2">
                <Button label="Registrar" severity="success" @click="this.registrar()" class="mt-4 mb-2"/>
                <Button label="Reiniciar Formulario" severity="warning" @click="this.reiniciar()" class="mt-4 mb-2"/>
                <Button label="Cancelar" severity="danger" @click="this.cancelar()" class="mt-4 mb-2"/>
            </div>
        </div>
        <div class="flex" v-else>
            <Message severity="success" style="margin: 4rem auto 6rem auto" @close="this.mensajeVisible = false; this.cancelar()">
                <div class="flex flex-column">
                    <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem"> ¡Usuario registrado con éxito!</span>
                    <span style="margin: 1rem 1rem 0 2rem"> {{ this.user.name }} {{ this.user.surname }} </span>
                    <span style="margin-left: 2rem; margin-right: 1rem"> {{ this.user.email }}</span>
                </div>
            </Message>
        </div>
    </div>
</template>

<script>
export default {
    name: "RegistroNuevo",
    emits: ['closeRegistroNuevo'],
    data() {
        return {
            user: {
                email: "",
                name: "",
                surname: "",
                password: ""
            },
            mensajeVisible: false
        }
    },
    methods: {
        cancelar() {
            this.$emit('closeRegistroNuevo');
        },
        reiniciar() {
            this.user.email = "";
            this.user.name = "";
            this.user.surname = "";
            this.user.password = "";
            this.$el.querySelector("#password").value = "";
            this.$el.querySelector("#passwordConfirm").value = "";
        },
        registrar() {
            this.mensajeVisible = true;
        }
    }
}
</script>

<style scoped>

</style>