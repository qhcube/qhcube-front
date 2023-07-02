<template>

   <ul>
      <li>{{ this.activeGame.id }}</li>
      <li>Fecha inicial: {{ gameUtils.getDate(this.activeGame.initialTime) }}</li>
      <li>Hora inicial: {{ gameUtils.getHour(this.activeGame.initialTime)}}</li>
      <li>Input Inicial: {{ this.activeGame.input }}</li>
      <li>Input Actual: {{ this.activeGame.currentInput }}</li>
      <li>Últimos movs: {{ this.activeGame.movsList.slice(25) }}</li>
      <li>Store Mmovs: {{ this.storeMovs.slice(25) }}</li>
   </ul>

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
         return gameUtils;
      },
      storeMovs() {
         return this.playerStoreQHCube.movsList;
      }
   },
   async mounted() {
      this.activeGame = await gameUtils.getActiveGame();
   },
   methods: {
         refreshGame(game) {
            this.activeGame = game;
         }
   }
})
</script>

<style scoped>

</style>