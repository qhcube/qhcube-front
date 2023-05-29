<template>
   <div class="flex flex-column bg-indigo-50 p-2 shadow-6">
      <div class="flex flex-row flex-nowrap three" style="height: 75px">
         <div class="flex">
            <h1>Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
         </div>
      </div>
      <div v-if="!this.erasedPlayerMessage && !this.erasedRegretMessage" class="flex flex-column px-3">
         <p>
            Estos son los datos que tenemos sobre ti:
         </p>
         <table class="w-max ml-4 m-2">
            <tbody class="p-datatable p-datatable-tbody">
            <tr>
               <td class="left-column font-semibold">Nombre:</td>
               <td class="right-column">{{ this.playerStoreQHCube.nombre }}</td>
            </tr>
            <tr>
               <td class="left-column font-semibold">Apellidos:</td>
               <td class="right-column">{{ this.playerStoreQHCube.apellidos }}</td>
            </tr>
            <tr>
               <td class="left-column font-semibold">E-Mail:</td>
               <td class="right-column">{{ this.playerStoreQHCube.email }}</td>
            </tr>
            </tbody>
         </table>
         <p>Si quieres modificarlos, escribe un correo a
            <a :href="'mailto:' + this.systemEmail">{{ this.systemEmail }}</a>.
         </p>
         <p>
            Si te das de baja, borraremos todos tus datos de nuestra base de datos, incluyendo partidas y puntuaciones.
         </p>
         <div class="flex flex-row gap-2">
            <Button label="Borrar usuario" severity="danger" @click="this.deletePlayer()" class="mt-4 mb-2"/>
            <Button label="Volver" severity="success"
                    @click="this.viewStoreQHCube.setPlayerComponent('registered-player')" class="mt-4 mb-2"/>
         </div>
      </div>
      <ConfirmDialog />

      <Message v-if="this.erasedPlayerMessage" severity="warn"
               @close="this.closeErasedPlayerMessage()"
               style="margin: 2rem auto 4rem auto">
         <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">¡Tu usuario ha sido borrado!</span><br/><br/>
         <span style="margin-left: 1rem; margin-right: 1rem">Gracias por haber estado aquí.</span>
      </Message>
      <Message v-if="this.erasedRegretMessage" severity="info" @close="this.erasedRegretMessage=false"
               style="margin: 2rem auto 4rem auto">
         <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">No se ha borrado nada...</span><br/>
      </Message>
   </div>
</template>

<script>
import axios from "axios";
import authUtils from "../../assets/js/authUtils.js";

export default {
   name: "PlayerProfile",
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         systemEmail: "",
         erasedPlayerMessage: false,
         erasedRegretMessage: false,
      }
   },
   mounted() {
      this.systemEmail = import.meta.env.VITE_APP_SYSTEM_EMAIL;
   },
   methods: {
      async deletePlayer() {
         this.$confirm.require ({
            header: "Borrar jugador...",
            message: "¿Estás seguro de que quieres borrar tu usuario?",
            icon: "pi pi-info-circle",
            acceptClass: "p-button-danger",
            acceptLabel: "Sí",
            accept: async () => {
               await axios({
                     method: "post",
                     url: import.meta.env.VITE_APP_API + "/player/delete",
                     data: {
                        "email": this.playerStoreQHCube.email
                     },
                     headers: {"Content-Type": "application/json"},
                  })
                     .then((response) => {
                        this.erasedPlayerMessage = true;
                     }).catch((error) => {
                        this.viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.", error.message);
                        console.log("Error deleting player: " + error);
                  });
            },
            reject: () => {
               this.erasedRegretMessage = true;
            }
         });
      },
      closeErasedPlayerMessage() {
         this.erasedPlayerMessage = false;
         authUtils.logout();
      }
   }
}
</script>

<style scoped>
p {
   line-height: 1.2em;
}

.left-column {
   text-align: right;
   padding-right: 1em;
}

.right-column {
   text-align: left;
   padding-left: 1em;
}

</style>