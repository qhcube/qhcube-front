<template>
   <div class="flex flex-column pl-5 p-5 align-items-center w-full" :style="'height:' + (this.showDesc ? '239px' : '375px')">
      <table>
         <tbody>
            <tr>
               <td class="first-td">Id:</td>
               <td class="second-td">{{ this.activeGame.id }}</td>
            </tr>
            <tr>
               <td class="first-td">Inicio del juego: </td>
               <td class="second-td">{{ gameUtils.getDate(this.activeGame.initialTime) }} &nbsp; ({{ gameUtils.getHour(this.activeGame.initialTime)}})</td>
            </tr>
            <tr>
               <td class="first-td">Tiempo trancurrido:</td>
               <td class="second-td" style="color: var(--blue-700)">{{ this.gameTime }}</td>
            </tr>
         </tbody>
      </table>

      <!--
      <ul>
         <li>Fecha inicial: {{ gameUtils.getDate(this.activeGame.initialTime) }}</li>
         <li>Hora inicial: {{ gameUtils.getHour(this.activeGame.initialTime)}}</li>
         <li>Input Inicial: {{ this.activeGame.input }}</li>
         <li>Input Actual: {{ this.activeGame.currentInput }}</li>
         <li>Últimos movs: {{ this.activeGame.movsList.slice(25) }}</li>
         <li>Store Mmovs: {{ this.storeMovs.slice(25) }}</li>
      </ul>
      -->

   </div>
</template>

<script>
import {defineComponent} from 'vue';
import gameUtils from "../../assets/js/gameUtils.js";


export default defineComponent({
   name: "ActiveGame",
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         interval: null,
         gameTime: "",
         activeGame: {"id":0,"initialTime":"","endTime":"","totalGameTime":"","movsList":"","input":"","currentInput":"","player":{"respStatus":"","respMessage":""}}
      }
   },
   props: {
      showDesc: {
         type: Boolean,
         default: false
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
      this.interval = setInterval(() =>  {
         this.gameTime = gameUtils.getDiffTime(this.activeGame.totalGameTime);
         this.activeGame.totalGameTime = new Date(this.activeGame.totalGameTime).getTime() + 1000;
      }, 1000);
   },
   methods: {
      refreshGame(game) {
         this.activeGame = game;
      },
      getGameTime() {
         this.started = setInterval(() => {
            this.gameTime = gameUtils.getDiffTime(this.activeGame.totalGameTime);
         }, 10);
      },
   }
})
</script>

<style scoped>
table {
   border-collapse: collapse;
   border-spacing: 0;
   width: 100%;
   border: 1px solid #ddd;
}

.first-td {
   width: 20%;
   padding: 10px;
   text-align: left;
   border: 1px solid #ddd;
}

.second-td {
   padding: 10px;
   text-align: left;
   border: 1px solid #ddd;
}
</style>