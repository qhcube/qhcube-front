<template>
    <div class="flex gap-3 py-4">
        <div class="flex flex-nowrrap flex-column">
            <!-- <canvas id="myCanvas" width="1000" height="600" style="border: 3px solid rgb(164,82,0);"> -->
            <canvas id="myCanvas" width="1000" height="600" class="shadow-6">
                Your browser does not support HTML5 Canvas. Please shift to a newer browser.
            </canvas>
        </div>
        <div class="flex flex-nowrap flex-column gap-3 w-full">
            <descripcion-breve @showDescripcionJuego="this.showDescripcionJuego()"
                               @closeDescripcionJuego="this.closeDescripcionJuego()"
                               v-if="this.descripcionVisible"/>
            <login-and-register @closeRegistroNuevo="this.closeRegistroNuevo()"
                                @showRegistroNuevo="this.showRegistroNuevo()"
                                v-if="this.registroVisible"/>
        </div>
    </div>
    <div class="flex gap-3">
        <MainFooter/>
    </div>
</template>

<script>

import DescripcionBreve from "./DescripcionBreve.vue";
import MainFooter from "./MainFooter.vue";
import LoginAndRegister from "./LoginAndRegister.vue";

export default {
    name: "MainHome",
    data() {
        return {
            descripcionVisible: true,
            registroVisible: true
        }
    },
    components: {LoginAndRegister, MainFooter, DescripcionBreve},
    methods: {
        closeDescripcionJuego() {
            this.registroVisible = true;
        },
        showDescripcionJuego() {
            this.registroVisible = false;
        },
        showRegistroNuevo() {
            this.descripcionVisible = false;
        },
        closeRegistroNuevo() {
            this.descripcionVisible = true
        }
    },
    mounted() {
        pageLoaded();
    }
}
</script>

<style scoped>

</style>