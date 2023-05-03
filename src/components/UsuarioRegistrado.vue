<template>
    <div class="flex flex-column bg-indigo-50 shadow-6">
        <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
            <div class="flex">
                <h1>Usuario: {{ this.userStoreQHCube.nombre }} {{ this.userStoreQHCube.apellidos }}</h1>
            </div>
        </div>
        <div v-if=" !this.mensajeQuedarseVisible && !this.mensajeSalirVisible" class="flex flex-column">
            <div class="flex flex-column px-2 align-items-start">
                <p v-if="!this.juegoComenzado">
                    Ahora puedes comenzar el juego pulsando el botón. Si así lo haces, se te asignará una
                    puntuación si consigues completarlo.
                </p>
                <p v-else>
                    El juego ya ha comenzado. ¡ Buena Suerte !
                </p>
            </div>
            <div class="flex flex-row gap-2" style="margin: auto">
                <Button label="Comenzar juego" v-if="!this.juegoComenzado" @click="this.comenzarJuego()" severity="success"
                        class=" mt-4 mb-3"/>
                <Button label="Cancelar juego" v-else @click="this.cancelarJuego()" severity="warning" class=" mt-4 mb-3"/>
                <Button label="Salir" @click="this.salir()" severity="danger" class=" mt-4 mb-3"/>
            </div>
        </div>
        <ConfirmDialog/>
        <Message v-if="this.mensajeSalirVisible" severity="warn" @close="this.mensajeSalirVisible = false; this.userStoreQHCube.$reset();" style="margin: 2rem auto 4rem auto">
            <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">¡Gracias por hugar!</span><br/><br/>
            <span style="margin-left: 1rem; margin-right: 1rem">Esperamos volver a verte pronto.</span>
        </Message>
        <Message v-if="this.mensajeQuedarseVisible" severity="info" @close="this.mensajeQuedarseVisible=false" style="margin: 2rem auto 4rem auto">
            <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">Seguimos jugando...</span><br/>
        </Message>
    </div>
</template>

<script>

export default {
    name: "UsuarioRegistrado",
    inject: ['userStoreQHCube'],
    data() {
        return {
            juegoComenzado: false,
            mensajeSalirVisible: false,
            mensajeQuedarseVisible: false
        }
    },
    methods: {
        salir() {
            this.$confirm.require({
                header: 'Logging out...',
                message: 'Realmente quieres salir?',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    this.mensajeSalirVisible = true;
                },
                reject: () => {
                    this.mensajeQuedarseVisible = true;
                }
            });
        },
            comenzarJuego()
            {
                this.juegoComenzado = true;
            }
        ,
            cancelarJuego()
            {
                this.juegoComenzado = false;
            }
        }
    }
</script>

<style scoped>

</style>