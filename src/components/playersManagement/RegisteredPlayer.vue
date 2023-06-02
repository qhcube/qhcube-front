<template>
   <div class="flex flex-column bg-indigo-50 shadow-6" :class="this.hiddenComponent ? 'h-12rem' : ''">
         <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
            <div class="flex">
               <h1>Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
            </div>
            <div class="flex flex-row-reverse flex-grow-1 align-self-start pt-4 pr-4">
               <registered-player-menu @hide-component-event="this.onHideComponent"/>
            </div>
         </div>

      <div v-if="!this.hiddenComponent">
         <div class="flex flex-column px-3">
            <div class="flex flex-column align-items-start">
               <p v-if="this.activeGameType === 0">
                  Ahora estás en modo <b>Juego Práctica</b>.
               </p>
               <p v-else-if="this.activeGameType === 1">
                  Ahora estás en modo <b>Juego Registrado</b>.
               </p>
               <p v-else>
                  Ahora estás en modo <b>Presentación</b>. No estás jugando en ningún modo concreto, pero que por defecto
                  debería ser el modo Práctica.
               </p>
            </div>
            <div class="flex flex-row gap-2 align-items-start mt-4 mb-3">
               <Button label="Iniciar Práctica" @click="this.initPractice()" severity="success" />
               <Button label="Iniciar Juego Registrado" @click="this.initRegisteredGame()" severity="success" />
               <Button label="Continuar Último Juego Registrado" @click="this.loadRegisteredGame()" severity="success" />
               <Button label="Cancelar Juego Actual" @click="this.cancelGame()" severity="warning"/>
               <!-- <Button label="Salir" @click="this.logout()" severity="danger"/> -->
            </div>
         </div>
      </div>
   </div>
</template>

<script>

import RegisteredPlayerMenu from "@/components/playersManagement/RegisteredPlayerMenu.vue";

export default {
   name: "RegisteredPlayer",
   components: {RegisteredPlayerMenu},
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         activeGameType: 0, // 0: Practice, 1: Registered Game, 2: Contest, 3: Presentation
         hiddenComponent: false
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
         console.log("hideComponenttttttttttttttt: " + newVal);
      },
      initPractice() {
         this.activeGameType = 0;
      },
      initRegisteredGame() {
         this.activeGameType = 1;
      },
      loadRegisteredGame() {
         this.activeGameType = 1;
      },
      cancelGame() {
         this.activeGameType = 3;
      }
   }
}
</script>

<style scoped>

</style>