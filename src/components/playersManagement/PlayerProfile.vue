<template>
   <div class="flex flex-column bg-indigo-50 p-2 shadow-6">
      <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
         <div class="flex">
            <h1>Usuario: {{ this.playerStoreQHCube.nombre }} {{ this.playerStoreQHCube.apellidos }}</h1>
         </div>
      </div>
      <div class="flex flex-column">
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
            <Button label="Borrar usuario" severity="warn" @click="this.deletePlayer()" class="mt-4 mb-2"/>
            <Button label="Volver" severity="success"
                    @click="this.viewStoreQHCube.setPlayerComponent('registered-player')" class="mt-4 mb-2"/>
         </div>
      </div>
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
      }
   },
   mounted() {
      this.systemEmail = import.meta.env.VITE_APP_SYSTEM_EMAIL;
   },
   methods: {
      async deletePlayer() {
         await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/player/delete",
            data: {
               "email": this.playerStoreQHCube.email
            },
            headers: {"Content-Type": "application/json"},
            })
               .then((response) => {
                  console.log("Player deleted: " + response.data);
                  authUtils.logout();
               }).catch((error) => {
                  console.log("Error deleting player: " + error);
               });

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