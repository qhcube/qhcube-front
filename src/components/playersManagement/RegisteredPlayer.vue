<template>
   <div class="flex flex-column bg-indigo-50 shadow-6">
      <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
         <div class="flex">
            <h1>Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
         </div>
         <div class="flex flex-row-reverse flex-grow-1 align-self-start pt-4 pr-4">
            <Button label="Mi perfil" icon="pi pi-player" severity="success"
                    @click="this.viewStoreQHCube.setPlayerComponent('player-profile')"
                    class="p-button-raised p-button-outlined p-button-rounded"/>
         </div>
      </div>
      <div v-if=" !this.logOutRegretMessage && !this.loggedOutMessage" class="flex flex-column">
         <div class="flex flex-column px-2 align-items-start">
            <p v-if="!this.startedGame">
               Ahora puedes comenzar el juego pulsando el botón. Si así lo haces, se te asignará una
               puntuación si consigues completarlo.
            </p>
            <p v-else>
               El juego ya ha comenzado. ¡ Buena Suerte !
            </p>
         </div>
         <div class="flex flex-row gap-2" style="margin: auto">
            <Button label="Comenzar juego" v-if="!this.startedGame" @click="this.startGame()" severity="success"
                    class=" mt-4 mb-3"/>
            <Button label="Cancelar juego" v-else @click="this.cancelGame()" severity="warning" class=" mt-4 mb-3"/>
            <Button label="Salir" @click="this.logout()" severity="danger" class=" mt-4 mb-3"/>
         </div>
      </div>
      <ConfirmDialog/>
      <Message v-if="this.loggedOutMessage" severity="warn"
               @close="this.loggedOutMessage = false; this.playerStoreQHCube.$reset(); this.viewStoreQHCube.$reset()"
               style="margin: 2rem auto 4rem auto">
         <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">¡Gracias por jugar!</span><br/><br/>
         <span style="margin-left: 1rem; margin-right: 1rem">Esperamos volver a verte pronto.</span>
      </Message>
      <Message v-if="this.logOutRegretMessage" severity="info" @close="this.logOutRegretMessage=false"
               style="margin: 2rem auto 4rem auto">
         <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">Seguimos jugando...</span><br/>
      </Message>
   </div>
</template>

<script>

export default {
   name: "RegisteredPlayer",
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         startedGame: false,
         loggedOutMessage: false,
         logOutRegretMessage: false
      }
   },
   methods: {
      logout() {
         this.$confirm.require({
            header: 'Logging out...',
            message: 'Realmente quieres salir?',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: () => {
               this.loggedOutMessage = true;
               gameType = 0;
            },
            reject: () => {
               this.logOutRegretMessage = true;
            }
         });
      },
      startGame() {
         this.startedGame = true;
         gameType = 1;
      }
      ,
      cancelGame() {
         this.startedGame = false;
         gameType = 0;
      }
   }
}
</script>

<style scoped>

</style>