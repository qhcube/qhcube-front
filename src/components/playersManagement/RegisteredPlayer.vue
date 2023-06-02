<template>
   <div class="flex flex-column bg-indigo-50 shadow-6">

      <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
         <div class="flex">
            <h1>Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
         </div>
         <div v-if=" !this.logOutRegretMessage && !this.loggedOutMessage" class="flex flex-row-reverse flex-grow-1 align-self-start pt-4 pr-4">
            <Button label="Mi perfil" icon="pi pi-user" severity="info"
                    @click="this.viewStoreQHCube.setPlayerComponent('player-profile')"
                    class="p-button-raised p-button-outlined p-button-rounded"/>
         </div>
      </div>

      <div v-if=" !this.logOutRegretMessage && !this.loggedOutMessage" class="flex flex-column px-3">
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

      <ConfirmDialog/>

      <Message v-if="this.loggedOutMessage" severity="info"
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
         activeGameType: 0, // 0: Practice, 1: Registered Game, 2: Contest, 3: Presentation
         loggedOutMessage: false,
         logOutRegretMessage: false
      }
   },
   watch: {
      activeGameType: function (newVal) {
         gameType = newVal;
      }
   },
   methods: {
      logout() {
         this.$confirm.require({
            header: 'Logging out...',
            message: '¿Realmente quieres salir?',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            acceptLabel: 'Sí',
            accept: () => {
               this.loggedOutMessage = true;
               gameType = 0;
            },
            reject: () => {
               this.logOutRegretMessage = true;
            }
         });
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