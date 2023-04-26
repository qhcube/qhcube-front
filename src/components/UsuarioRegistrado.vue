<template>
    <div class="flex flex-column bg-indigo-50 shadow-6">
        <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
            <div class="flex">
                <h1>Usuario: {{ this.userStoreQHCube.nombre }} {{ this.userStoreQHCube.apellidos }}</h1>
            </div>
        </div>
        <div class="flex flex-column px-2 align-items-start">
            <p v-if="!this.juegoComenzado">
                Ahora puedes comenzar el juego pulsando el botón. Si así lo haces, se te asignará una
                puntuación si consigues completarlo.
            </p>
            <p v-else>
                El juego ya ha comenzado. ¡ Buena Suerte !
            </p>
        </div>
        <div class="flex flex-row gap-2" style="margin: auto" >
            <Button v-if="!this.juegoComenzado" label="Comenzar juego" @click="this.comenzarJuego()" severity="success" class=" mt-4 mb-3"/>
            <Button v-else label="Cancelar juego" @click="this.cancelarJuego()" severity="warning" class=" mt-4 mb-3"/>
            <Button label="Salir" severity="danger" @click="this.salir()" class=" mt-4 mb-3"/>
        </div>
    </div>
</template>

<script>

export default {

    name: "UsuarioRegistrado",
    inject: ['userStoreQHCube'],
    data() {
        return {
            juegoComenzado: false
        }
    },
    methods: {
        salir() {
            this.userStoreQHCube.$reset();
        },
        comenzarJuego() {
            this.juegoComenzado = true;
        },
        cancelarJuego() {
            this.juegoComenzado = false;
        }
    }
}
</script>

<style scoped>

</style>