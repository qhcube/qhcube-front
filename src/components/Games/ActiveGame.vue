<template>

   <ul>
      <li>{{ this.activeGame.id }}</li>
      <li>Fecha inicial: {{ gameUtils.getDate(this.activeGame.initialTime) }}</li>
      <li>Hola</li>
   </ul>
   <Toast position="center"/>
</template>

<script>
import {defineComponent} from 'vue';
import gameUtils from "../../assets/js/gameUtils.js";


export default defineComponent({
   name: "ActiveGame",
   computed: {
      gameUtils() {
         return gameUtils
      }
   },
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
        activeGame: {"id":0,"initialTime":"","endTime":"","totalGameTime":"","movsList":"","input":"","currentInput":"","player":{"respStatus":"","respMessage":""}}
      }
   },
   async mounted() {
      this.$toast.add({
         severity: 'info',
         summary: 'Juego nuevo comenzado...',
         detail: '¡Buena suerte!',
         life: 1700
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