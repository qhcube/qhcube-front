
<template>
   <Menubar v-if="!this.loggedOutMessage && !this.logOutRegretMessage" :model="items"
            class="h-3rem"
            style="font-size: 0.9rem"/>

   <Message v-if="this.loggedOutMessage" severity="info"
            @close="this.loggedOutMessage = false; this.playerStoreQHCube.$reset(); this.viewStoreQHCube.$reset()"
            style="z-index: 0; margin: 2rem auto 4rem auto">
      <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">¡Gracias por jugar!</span><br/><br/>
      <span style="margin-left: 1rem; margin-right: 1rem">Esperamos volver a verte pronto.</span>
   </Message>

   <Message v-if="this.logOutRegretMessage" severity="info" @close="this.logOutRegretMessage=false"
            style="z-index: 0; margin: 2rem auto 4rem auto">
      <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">Seguimos jugando...</span><br/>
   </Message>

</template>

<script>
import {defineComponent} from 'vue'
import ConfirmDialog from "primevue/confirmdialog";
import Menubar from "primevue/menubar";
import Message from "primevue/message";

export default defineComponent({
   name: "RegisteredPlayerMenu",
   components: { Message, Menubar, ConfirmDialog },
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   emits: ['hideComponentEvent'],
   data() {
      return {
         items: [
            {
               label: 'Jugador',
               icon: 'pi pi-user',
               items: [
                  {
                     label: 'Ver Perfil',
                     icon: 'pi pi-user',
                     command: () => {
                        this.viewStoreQHCube.setPlayerComponent('player-profile');
                     }
                  },
                  {
                     label: 'Cerrar Sesión',
                     icon: 'pi pi-sign-out',
                     command: () => {
                        this.logout();
                     }
                  }
               ]
            }
         ],
         loggedOutMessage: false,
         logOutRegretMessage: false
      }
   },
   watch: {
      loggedOutMessage (newVal) {
         this.$emit('hideComponentEvent', newVal);
      },
      logOutRegretMessage (newVal) {
         this.$emit('hideComponentEvent', newVal);
      }
   },
   methods: {
      logout() {
         this.$confirm.require({
            header: "Logging out...",
            message: "¿Realmente quieres salir?",
            icon: "pi pi-info-circle",
            acceptClass: "p-button-danger",
            acceptLabel: "Sí",
            accept: () => {
               this.loggedOutMessage = true;
               gameType = 0;
            },
            reject: () => {
               this.logOutRegretMessage = true;
            }
         });
      }
   }
})
</script>

<style scoped>

</style>