<template>
   <div class="flex flex-column bg-indigo-50 shadow-6 h-20rem"
        style="min-width: 860px">
      <div class="flex flex-row flex-nowrap three pl-2 h-4rem"  style="height: 75px">
         <div class="flex flex-row gap-6 align-items-center flex-grow-1">
            <h1 class="flex">Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
            <h4 class="flex font-light" style="padding-bottom: 12px">
               (Modo <span class="ml-1 font-semibold">{{ this.gameMode }}</span>)
            </h4>
         </div>

         <div class="flex flex-row-reverse align-items-center gap-6 pr-6 z-2">
            <registered-player-menu />

            <div class="flex flex-nowrap gap-2 self">
               <Button v-if="this.activeGameType === 0"
                       label="Reiniciar Práctica"
                       @click="this.initPractice()"
                       size="small"
                       severity="success"
                       class="button"
               />
               <Button v-if="this.activeGameType === 0"
                       label="Nuevo Juego Registrado"
                       @click="this.createNewRegisteredGame()"
                       size="small"
                       severity="success"
                       class="button"
               />
               <Button v-if="this.activeGameType !== 0"
                       label="Cancelar Juego Actual"
                       @click="this.cancelGame()"
                       size="small"
                       severity="warning"
                       class="button"
               />
            </div>
         </div>
      </div>

      <div class="z-1">
         <registered-player-layout>
            <component :is="this.viewStoreQHCube.getRegisteredPlayerComponent"/>
         </registered-player-layout>
      </div>

   </div>
</template>

<script>

import RegisteredPlayerMenu from "./RegisteredPlayerMenu.vue";
import gameUtils from "../../assets/js/gameUtils.js";
import GameList from "../Games/GameList.vue";
import PlayerLayout from "../layouts/PlayerLayout.vue";
import RegisteredPlayerLayout from "../layouts/RegisteredPlayerLayout.vue";
import ActiveGame from "../Games/ActiveGame.vue";

export default {
   name: "RegisteredPlayer",
   components: {RegisteredPlayerLayout, PlayerLayout, GameList, RegisteredPlayerMenu, ActiveGame},
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         activeGameType: 0, // 0: Practice, 1: Registered Game, 2: Contest, 3: Presentation
      }
   },
   computed: {
      gameMode() {
         if (this.activeGameType === 0)
            return "Práctica";
         else if (this.activeGameType === 1)
            return "Registrado";
         else if (this.activeGameType === 2)
            return "Concurso";
      }
   },
   watch: {
      activeGameType: function (newVal) {
         gameType = newVal;
      }
   },
   methods: {
      async initPractice() {
         this.activeGameType = 0;
         gameUtils.resetPracticeGame();
         this.viewStoreQHCube.setRegisteredPlayerComponent("game-list");
      },

      async createNewRegisteredGame() {
         await gameUtils.createNewRegisteredGame();
         if(this.viewStoreQHCube.errorStatus === "") {
            this.activeGameType = 1;
            this.viewStoreQHCube.setRegisteredPlayerComponent("active-game");
         }
      },

      cancelGame() {
         // TODO: Sacar mensaje de confirmación y avisar de que se reinicia el modo práctica.
         this.initPractice();
      }
   }
}
</script>

<style scoped>
.button {
   height: 40px;
   width: 120px;
}

.button:focus {
   box-shadow: none !important;
}

</style>