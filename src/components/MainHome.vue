<template>
    <div class="flex gap-3 py-4">
        <div class="flex flex-nowrrap flex-column">
            <!-- <canvas id="myCanvas" width="1000" height="600" style="border: 3px solid rgb(164,82,0);"> -->
            <canvas id="myCanvas" width="1000" height="600" class="shadow-6">
                Your browser does not support HTML5 Canvas. Please shift to a newer browser.
            </canvas>
        </div>
        <div class="flex flex-nowrap flex-column gap-3 w-full">
            <brief-game-description v-if="this.descripcionVisible"
                               @showDescripcionJuego="this.showDescripcionJuego()"
                               @closeDescripcionJuego="this.closeDescripcionJuego()"/>
            <login-and-register v-if="this.registroVisible"
                                @closeNewRecord="this.closeNewRecord()"
                                @showNewRecord="this.showNewRecord()"/>
        </div>
    </div>
    <div class="flex gap-3">
        <MainFooter/>
    </div>
</template>

<script>

import MainFooter from "@/components/MainFooter.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
import BriefGameDescription from "@/components/BriefGameDescription.vue";

export default {
    name: "MainHome",
    data() {
        return {
            descripcionVisible: true,
            registroVisible: true
        }
    },
    components: {BriefGameDescription, LoginAndRegister, MainFooter},
    methods: {
        closeDescripcionJuego() {
            this.registroVisible = true;
        },
        showDescripcionJuego() {
            this.registroVisible = false;
        },
        showNewRecord() {
            this.descripcionVisible = false;
        },
        closeNewRecord() {
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