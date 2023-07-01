<template>

   <ul>
      <li>{{ this.activeGame.id }}</li>
      <li>Fecha inicial: {{ gameUtils.getDate(this.activeGame.initialTime) }}</li>
      <li>Hora inicial: {{ gameUtils.getHour(this.activeGame.initialTime)}}</li>
   </ul>
   <Toast position="center" group="luck"/>
</template>

<script>
import {defineComponent} from 'vue';
import gameUtils from "../../assets/js/gameUtils.js";


export default defineComponent({
   name: "ActiveGame",
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
        activeGame: {"id":0,"initialTime":"","endTime":"","totalGameTime":"","movsList":"","input":"","currentInput":"","player":{"respStatus":"","respMessage":""}}
      }
   },
   computed: {
      gameUtils() {
         return gameUtils
      }
   },
   async mounted() {
      this.$toast.add({
         severity: 'info',
         summary: 'Juego nuevo comenzado...',
         detail: '¡Buena suerte!',
         closable: false,
         life: 1700,
         group: 'luck',
      });

      this.activeGame = await gameUtils.getActiveGame();
      /*
      gameId: game.id,
                    initialDate: this.getDate(game.initialTime),
                    initialTime: this.getHour(game.initialTime),
                    endDate: state === "Abierto" ? " - " : this.getDate(game.endTime),
                    endTime: state === "Abierto" ? " - " : this.getHour(game.endTime),
                    diffTime: this.getDiffTime(game.totalGameTime),
                    state: state
       */
   }
})
</script>

<style scoped>

</style>