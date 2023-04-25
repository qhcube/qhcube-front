<template>
    <div class="bg-red-50 p-2" v-if="!this.instruccionesVisibles">
        <div class="flex flex-nowrap three">
            <h1>Descripción del juego</h1>
        </div>
        <div class="flex flex-nowrap">
            <p>
                El hipercubo cuántico representa una <i>puerta cuántica discreta de dos cúbits</i>, es decir, una <u>matriz
                4x4</u>
                cuyas entradas son <u>números complejos</u> de la forma <b>a+bi</b> con a y b enteros.
            </p>
        </div>
        <div class="flex flex-nowrap">
            <p>
                El <b>objetivo del juego</b> es
                conseguir, mediante una serie de movimientos, <b>que el hipercubo represente la matriz identidad</b>.
            </p>
        </div>
        <div class="flex flex-nowrap flex-column align-items-start">
            <Button label="Aprende a jugar" link @click="this.instruccionesVisibles = true"></Button>
        </div>
    </div>
    <descripcion-juego v-else v-on:close="this.instruccionesVisibles = false"></descripcion-juego>
</template>

<script>
import DescripcionJuego from "./DescripcionJuego.vue";

export default {
    name: "DescripcionBreve",
    components: {DescripcionJuego},
    data() {
        return {
            instruccionesVisibles: false,
        }
    },
}
</script>

<style scoped>
p {
    line-height: 1.2em;
}
</style>