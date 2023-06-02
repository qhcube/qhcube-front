<template>
   <div class="flex flex-column bg-indigo-50 shadow-6" :class="this.hiddenComponent ? 'h-12rem' : ''">
         <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
            <div class="flex flex-row gap-7 align-items-center">
               <h1 class="flex">Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
               <h4 class="flex font-light" style="padding-bottom: 15px">(Modo {{ this.gameMode }})</h4>
            </div>
            <div class="flex flex-row-reverse flex-grow-1 align-self-start pt-4 pr-4">
               <registered-player-menu @hide-component-event="this.onHideComponent"/>
            </div>
         </div>

      <div v-if="!this.hiddenComponent">
         <div class="flex flex-column px-3">
            <div class="flex flex-column align-items-start">
               <p>
                  Ahora estás en modo <b>{{ this.gameMode }}</b>
               </p>

            </div>
            <div class="flex flex-row gap-2 align-items-start mt-4 mb-3">
               <Button label="Iniciar Práctica" @click="this.initPractice()" severity="success" />
               <Button label="Iniciar Juego Registrado" @click="this.initRegisteredGame()" severity="success" />
               <Button label="Continuar Último Juego Registrado" @click="this.loadRegisteredGame()" severity="success" />
               <Button v-if="this.activeGameType !== 0" label="Cancelar Juego Actual" @click="this.cancelGame()" severity="warning"/>
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
         this.activeGameType = 0;
      }
   }
}
</script>

<style scoped>

</style>