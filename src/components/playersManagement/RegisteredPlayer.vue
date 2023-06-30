<template>
   <div class="flex flex-column bg-indigo-50 shadow-6"
        :class="this.hiddenComponent ? 'h-12rem' : ''"
        style="min-width: 860px">
      <div class="flex flex-row flex-nowrap three pl-2 h-4rem"  style="height: 75px">
         <div class="flex flex-row gap-6 align-items-center flex-grow-1">
            <h1 class="flex">Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
            <h4 v-if="!this.hiddenComponent" class="flex font-light" style="padding-bottom: 12px">
               (Modo <span class="ml-1 font-semibold">{{ this.gameMode }}</span>)
            </h4>
         </div>

         <div class="flex flex-row-reverse align-items-center gap-6 pr-6 z-2">
            <registered-player-menu
                  @hide-component-event="this.onHideComponent"

            />

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
               >
               </Button>
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

      <div v-if="!this.hiddenComponent" class="z-1">
         <game-list class="mt-3 mb-2" ref="gameList" />
      </div>

      <Message v-if="this.hiddenComponent && this.newGameStarted" severity="info" @close="this.newGameStarted=false; this.hiddenComponent=false"
               style="margin: 2rem auto 4rem auto">
         <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">Juego nuevo comenzado...</span><br/>
      </Message>
   </div>
</template>

<script>

import RegisteredPlayerMenu from "./RegisteredPlayerMenu.vue";
import gameUtils from "../../assets/js/gameUtils.js";
import GameList from "../Games/GameList.vue";
import Message from "primevue/message";

export default {
   name: "RegisteredPlayer",
   components: {GameList, RegisteredPlayerMenu, Message},
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         activeGameType: 0, // 0: Practice, 1: Registered Game, 2: Contest, 3: Presentation
         hiddenComponent: false,
         newGameStarted: false
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
      onHideComponent(newVal) {
         this.hiddenComponent = newVal;
      },

      async initPractice() {
         this.activeGameType = 0;
         gameUtils.resetPracticeGame();
         await this.$refs.gameList.getGamesByPlayer();
      },

      async createNewRegisteredGame() {
         await gameUtils.createNewRegisteredGame();
         await this.$refs.gameList.getGamesByPlayer();
      },

      /*
      async initRegisteredGame() {
         let result = await gameUtils.beginRegisteredGame();

         if (result.status === "OK 0") {
            this.playerStoreQHCube.gameId = result.gameId;
            gameUtils.resetGame(JSON.parse(result.input));
            this.newGameStarted = true;
            this.hiddenComponent = true;
         } else if (result.status === "OK 1") {

            this.$confirm.require({
               header: "Nuevo Juego Registrado",
               message: "Se ha encontrado un juego empezado. Si comienza uno  nuevo, se cerrará el anterior como cancelado. ¿Desea continuar con él o empezar uno nuevo?",
               icon: "pi pi-exclamation-triangle",
               acceptLabel: "Continuar anterior",
               rejectLabel: "Comenzar nuevo",
               accept: () => {
                  this.playerStoreQHCube.gameId = result.gameId;
                  this.playerStoreQHCube.movsList = result.movsList;
                  gameUtils.resetGame(JSON.parse(result.input));
               },
               reject: async () => {
                  result = await gameUtils.forceInitRegisteredGame();
                  gameUtils.resetGame(JSON.parse(result.input));
               }
            });
            console.log("Se ha obtenido un juego empezado. Hay que avisar de si se quiere cancelar o seguir con él.");
         }
         this.activeGameType = 1;
      },

      async loadRegisteredGame() {
         const result = await gameUtils.beginRegisteredGame();
         console.log("LOAD: " + JSON.stringify(result));
         if (result.status === "OK 1") {
            // TODO: Se ha obtenido un juego empezado. Todo bien. Se continúa con este juego.
            console.log("Se ha obtenido un juego empezado. Todo bien. Se continúa con este juego.");
         } else if (result.status === "OK 1") {
            // TODO: Se ha creado uno nuevo. No había juego empezado. Se avisa y se sugiere crear uno nuevo.
            console.log("Se ha creado uno nuevo. No había juego empezado. Se avisa y se sugiere crear uno nuevo.");
         }
         this.activeGameType = 1;

      },
      */

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