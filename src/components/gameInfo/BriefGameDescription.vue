<template>
    <div class="bg-red-50 p-2 shadow-6">
        <div class="flex flex-nowrap three">
            <h1>Descripción del juego</h1>
        </div>
        <div class="flex flex-nowrap">
            <p>
                El hipercubo cuántico representa una <i>puerta cuántica discreta de dos cúbits</i>,
                es decir, una matriz 4x4
                cuyas entradas son números complejos de la forma <b>a+bi</b> con <i>a</i> y <i>b</i> enteros.
            </p>
        </div>
        <div class="flex flex-nowrap">
            <p>
                El <b>objetivo del juego</b> es
                conseguir, mediante una serie de movimientos, <b>que el hipercubo represente la matriz identidad</b>.
            </p>
        </div>
        <div class="flex flex-nowrap flex-column align-items-start">
            <Button label="Aprende a jugar" link @click="this.viewStoreQHCube.setGameInfoComponent('game-description')"/>
        </div>
    </div>
</template>

<script>

export default {
    nombre: "BriefGameDescription",
    inject: ["playerStoreQHCube", "viewStoreQHCube"]
}
</script>

<style scoped>

</style>