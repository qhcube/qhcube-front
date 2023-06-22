<template>
   <div class="flex flex-column bg-indigo-50 shadow-6" :class="this.hiddenComponent ? 'h-12rem' : ''">
      <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
         <div class="flex flex-row gap-7 align-items-center">
            <h1 class="flex">Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
            <h4 v-if="!this.hiddenComponent" class="flex font-light" style="padding-bottom: 15px">(Modo {{ this.gameMode }})</h4>
         </div>
         <div class="flex flex-row-reverse flex-grow-1 align-self-start pt-4 pr-4">
            <registered-player-menu @hide-component-event="this.onHideComponent"/>
         </div>
      </div>

      <div v-if="!this.hiddenComponent">
         <game-list />

         <div class="flex flex-column px-3">
            <div class="flex flex-column align-items-start">
               <p>
                  Ahora estás en modo <b>{{ this.gameMode }}</b>
               </p>

            </div>
            <div class="flex flex-row gap-2 align-items-start mt-4 mb-3">
               <Button v-if="this.activeGameType === 0" label="Reiniciar Práctica" @click="this.initPractice()" severity="success"/>
               <Button v-if="this.activeGameType === 0" label="Iniciar Juego Registrado" @click="this.initRegisteredGame()" severity="success"/>
               <Button v-if="this.activeGameType === 0" label="Continuar Último Juego Registrado" @click="this.loadRegisteredGame()" severity="success"/>
               <Button v-if="this.activeGameType !== 0" label="Cancelar Juego Actual" @click="this.cancelGame()"
                       severity="warning"/>
            </div>
         </div>
      </div>

      <ConfirmDialog key="initGame" class="w-30rem">
         <template #message="slotProps">
            <div class="flex">
               <i class="align-self-center pr-3 text-yellow-700" :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
               <p class="pl-2 text-justify">
                  Has querido empezar un nuevo juego pero tenías uno sin terminar.
                  Puedes continuar el juego anterior o cancelarlo y crear uno nuevo,
                  pero se perderá el progreso del juego anterior dejándolo como cancelado.
               </p>
            </div>
         </template>
      </ConfirmDialog>
   </div>
</template>

<script>

import RegisteredPlayerMenu from "./RegisteredPlayerMenu.vue";
import gameUtils from "../../assets/js/gameUtils.js";
import GameList from "../Games/GameList.vue";

export default {
   name: "RegisteredPlayer",
   components: {GameList, RegisteredPlayerMenu},
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         activeGameType: 0, // 0: Practice, 1: Registered Game, 2: Contest, 3: Presentation
         hiddenComponent: false
      }
   },
   computed: {
      gameMode() {
         if (this.activeGameType === 0)
            return "Práctica";
         else if (this.activeGameType === 1)
            return "Juego Registrado";
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

      initPractice() {
         this.activeGameType = 0;
         gameUtils.resetPracticeGame();
      },

      async initRegisteredGame() {
         let result = await gameUtils.beginRegisteredGame();

         if (result.status === "OK 0") {
            // TODO: Se ha creado uno nuevo. Todo bien. No había juego empezado.
            console.log("Se ha creado uno nuevo. Todo bien. No había juego empezado.");
         } else if (result.status === "OK 1") {
            this.$confirm.require({
               key: "initGame",
               header: "Nuevo Juego Registrado",
               icon: "pi pi-exclamation-triangle",
               acceptLabel: "Continuar anterior",
               rejectLabel: "Comenzar nuevo",
               accept: () => {
                  gameUtils.resetGame(JSON.parse(result.input));
                  this.$confirm.close();
               },
               reject: async () => {
                  // TODO: Decir al servidor que cancele el juego empezado y crear uno nuevo.
                  result = await gameUtils.forceInitRegisteredGame();
                  console.log("FORCE: " + JSON.stringify(result));
                  gameUtils.resetGame(JSON.parse(result.input));
                  this.$confirm.close();
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
      cancelGame() {
         // TODO: Sacar mensaje de confirmación y avisar de que se reinicia el modo práctica.
         this.initPractice();
      }
   }
}
</script>

<style scoped>

</style>