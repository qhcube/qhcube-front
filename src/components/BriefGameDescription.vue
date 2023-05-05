<template>
    <div v-if="!this.gameDescriptionVisible" class="bg-red-50 p-2 shadow-6">
        <div class="flex flex-nowrap three">
            <h1>Descripción del juego</h1>
        </div>
        <div class="flex flex-nowrap">
            <p>
                El hipercubo cuántico representa una <i>puerta cuántica discreta de dos cúbits</i>,
                es decir, una <u>matriz 4x4</u>
                cuyas entradas son <u>números complejos</u> de la forma <b>a+bi</b> con <i>a</i> y <i>b</i> enteros.
            </p>
        </div>
        <div class="flex flex-nowrap">
            <p>
                El <b>objetivo del juego</b> es
                conseguir, mediante una serie de movimientos, <b>que el hipercubo represente la matriz identidad</b>.
            </p>
        </div>
        <div class="flex flex-nowrap flex-column align-items-start">
            <Button label="Aprende a jugar" link @click="this.showGameDescription()"/>
        </div>
    </div>
    <game-description v-else @hideGameDescription="this.hideGameDescription()"/>
</template>

<script>
import GameDescription from "@/components/GameDescription.vue";

export default {
    nombre: "BriefGameDescription",
    components: {GameDescription},
    emits: ["showGameDescription"],
    data() {
        return {
            gameDescriptionVisible: false,
        }
    },
    methods: {
        showGameDescription() {
            this.gameDescriptionVisible = true;
            this.$emit("showGameDescription");
        },
        hideGameDescription() {
            this.gameDescriptionVisible = false;
        }
    }
}
</script>

<style scoped>
p {
    line-height: 1.2em;
}
</style>