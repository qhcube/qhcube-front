<template>
   <div class="flex flex-column bg-indigo-50 shadow-6"
        :class="this.getShowDesc"
        style="min-width: 895px">
      <div class="flex flex-row flex-nowrap three pl-2 h-4rem"  style="height: 75px">
         <div class="flex flex-row gap-6 align-items-center flex-grow-1">
            <h1 class="flex">Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
            <h4 class="flex font-light" style="padding-bottom: 12px">
               (Modo <span class="ml-1 font-semibold">{{ this.playerStoreQHCube.getactiveGameModeAsString() }}</span>)
            </h4>
         </div>

         <div class="flex flex-row-reverse align-items-center gap-6 pr-6 z-2">
            <registered-player-menu />

            <div class="flex flex-nowrap gap-2 self">
               <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'game-list'"
                       label="Reiniciar Práctica"
                       @click="this.initPractice()"
                       size="small"
                       severity="success"
                       class="button"
               />
               <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'game-list'"
                       label="Nuevo Juego Registrado"
                       @click="this.createNewRegisteredGame()"
                       size="small"
                       severity="success"
                       class="button"
               />
               <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'active-game'"
                       label="Reiniciar Juego Actual"
                       @click="this.reinitRegisteredGame()"
                       size="small"
                       severity="warning"
                       class="button"
               />
               <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'active-game'"
                       label="Salir y Guardar"
                       @click="this.cancelGame()"
                       size="small"
                       severity="warning"
                       class="button"
               />
               <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'replay-game'"
                       label="Continuar desde aquí"
                       @click="this.continueFromReplay()"
                       size="small"
                       severity="warning"
                       class="button"
               />
               <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'replay-game'"
                       label="Salir de Reproducción"
                       @click="this.exitReplay()"
                       size="small"
                       severity="warning"
                       class="button"
               />
            </div>
         </div>
      </div>

      <Toast position="center" group="luck"/>

      <div class="flex z-1">
         <registered-player-layout>
            <component ref="activeComponent" :is="this.viewStoreQHCube.getRegisteredPlayerComponent" :showDesc="this.showDesc"/>
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
import ReplayGame from "@/components/Games/ReplayGame.vue";

export default {
   name: "RegisteredPlayer",
   components: {RegisteredPlayerLayout, PlayerLayout, GameList, RegisteredPlayerMenu, ActiveGame, ReplayGame},
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         heightClass: 'h-20rem'
      }
   },
   props: {
      showDesc: {
         type: Boolean,
         default: true
      }
   },
   computed: {
      getShowDesc() {
         this.showDesc ? this.heightClass = 'h-20rem' : this.heightClass = 'h-30rem';
         return this.showDesc;
      }
   },

   mounted() {
      if (this.playerStoreQHCube.gameId !== 0) {
         this.playerStoreQHCube.setActiveGameMode(1);
         this.viewStoreQHCube.setRegisteredPlayerComponent("active-game");
      } else {
         this.playerStoreQHCube.setActiveGameMode(0);
         this.viewStoreQHCube.setRegisteredPlayerComponent("game-list");
      }
   },

   methods: {
      continueFromReplay() {
         const movs = (JSON.parse('[' + this.playerStoreQHCube.movsList + ']')).slice(0, this.playerStoreQHCube.lastMoveReplayed);

         gameUtils.replayGameFromMovsList(this.playerStoreQHCube.gameId, movs);


         this.$toast.add({
            severity: 'info',
            summary: 'Has pulsado continuar desde el movimiento: ' + this.playerStoreQHCube.lastMoveReplayed,
            detail: '(Por implementar)',
            life: 1500,
            group: 'luck',
         });
         /* TODO:
         1.- Enviar al servidor el juego con la lista de moviemientos desde la 0 hasta la
               posición que indique el índice del replay.
         2.- El servidor comprueba que ese juego le pertenece a ese jugador y que la
               lista de movimientos se corresponde con los N primeros movimientos del
               juego que tiene almacenado.
         3.- Si es correcto, el servidor graba en la base de datos el juego con la lista
               de movimientos cortada y devuelve el mismo juego con dicho corte y el
               currentInput actualizado. No se altera el timestamp inicial del juego.
         4.- El cliente recibe el juego y pasa a juego registrado con ese juego.
          */
      },

      exitReplay() {
         this.$toast.add({
            severity: 'info',
            summary: 'Saliendo de reproducción...',
            life: 1500,
            group: 'luck',
         });

         this.initPractice();
      },

      async initPractice() {
         this.playerStoreQHCube.setActiveGameMode(0);
         this.playerStoreQHCube.gameId = 0;
         gameUtils.resetPracticeGame();
         this.viewStoreQHCube.setRegisteredPlayerComponent("game-list");
      },

      async createNewRegisteredGame() {
         await gameUtils.createNewRegisteredGame();
         if(this.viewStoreQHCube.errorStatus === "") {
            this.playerStoreQHCube.setActiveGameMode(1);
            this.$toast.add({
               severity: 'info',
               summary: 'Juego nuevo comenzado...',
               detail: '¡Buena suerte!',
               life: 1500,
               group: 'luck',
            });
            this.viewStoreQHCube.setRegisteredPlayerComponent("active-game");
         }
      },

      cancelGame() {
         this.$confirm.require({
            header: "Cancelar juego actual...",
            message: "¿Realmente quieres salir y volver a la práctica?",
            icon: "pi pi-info-circle",
            acceptClass: "p-button-danger",
            acceptLabel: "Sí",
            accept: () => {
               this.initPractice();
            },
            reject: () => {
            }
         });
      },

      reinitRegisteredGame() {
         this.$confirm.require({
            header: "Reiniciar juego actual...",
            message: "¿Realmente quieres reiniciar el juego actual?",
            icon: "pi pi-info-circle",
            acceptClass: "p-button-danger",
            acceptLabel: "Sí",
            accept: async () => {
               const game = await gameUtils.reinitRegisteredGame();
               this.$toast.add({
                  severity: 'info',
                  summary: 'Juego reiniciado...',
                  detail: '¡Buena suerte!',
                  life: 1500,
                  group: 'luck',
               });
               this.$refs.activeComponent.refreshGame(game);
            },
            reject: () => {
               this.$toast.add({
                  severity: 'info',
                  summary: 'Juego no reiniciado...',
                  detail: '¡Buena suerte!',
                  life: 1500,
                  group: 'luck',
               });
            }
         });
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