<template>
   <div class="bg-red-50 p-2 shadow-6">
      <div class="flex flex-nowrap three justify-content-between">
         <div class="flex">
            <h1>Descripción del juego</h1>
         </div>
         <div class="flex flex-nowrap gap-3 align-items-center">
            <Button label="Aprende a jugar" rounded outlined
                    @click="this.viewStoreQHCube.setGameInfoComponent('learn-to-play')"/>
            <Button label="Significado del juego" rounded outlined
                    @click="this.viewStoreQHCube.setGameInfoComponent('game-meaning')"/>
            <Button ref="minimizeButton"
                    :icon="this.minOrMaxIcon" rounded outlined
                    severity="info" size="small"
                    @click="this.$emit('updateShowDesc')"
                    class="min-button" />

         </div>
      </div>

      <div v-if="this.showDesc" class="flex flex-column">
         <p>
            El hipercubo cuántico representa una <i>puerta cuántica discreta de dos cúbits</i>,
            es decir, una matriz 4x4
            cuyas entradas son números complejos de la forma <b>a+bi</b> con <i>a</i> y <i>b</i> enteros.
         </p>
         <p>
            El <b>objetivo del juego</b> es
            conseguir, mediante una serie de movimientos, <b>que el hipercubo represente la matriz identidad</b>.
         </p>
      </div>
   </div>
</template>

<script>

export default {
   nombre: "BriefGameDescription",
   inject: ["playerStoreQHCube", "viewStoreQHCube"],
   data() {
      return {
         minOrMaxIcon: "pi pi-chevron-down"
      }
   },
   props: {
      showDesc: {
         type: Boolean,
         default: true
      }
   },
   watch: {
      showDesc: function (newVal, oldVal) {
         if (newVal) {
            this.minOrMaxIcon = "pi pi-chevron-down";
         } else {
            this.minOrMaxIcon = "pi pi-chevron-up";
         }
      }
   },
   emits: ["updateShowDesc"]
}
</script>

<style scoped>
.min-button:focus {
   box-shadow: none !important;
}
</style>