<template>
   <div class="flex flex-column bg-indigo-50 shadow-6">
      <div class="flex flex-row flex-nowrap three px-2">
         <div class="flex">
            <h1>Registro de jugador</h1>
         </div>
      </div>

      <div class="grid px-2 mb-3">
         <div class="col-6 pr-2" style="border-right: black dashed 1px">
            <p>
               Si ya estás registrado, puedes iniciar sesión:
            </p>

            <div class="flex flex-column">
               <div class="grid p-inputgroup align-items-center">
                  <label for="email" class="col-3">E-Mail:</label>
                  <div class="col-9">
                     <div class="flex">
                        <span class="p-inputgroup-addon">
                               <i class="pi pi-user"></i>
                           </span>
                        <InputText placeholder="eMail" type="email" v-model="this.player.email" autocomplete="on"/>
                     </div>
                  </div>
               </div>
               <div class="grid p-inputgroup align-items-center">
                  <label for="password" class="col-3">Password:</label>
                  <div class="col-9">
                     <div class="flex">
                        <span class="p-inputgroup-addon">
                               <i class="pi pi-key"></i>
                           </span>
                        <InputText placeholder="Password" name="password" type="password" v-model="this.player.password"
                                autocomplete="on"/>
                     </div>
                  </div>
               </div>
               <div class="flex p-inputgroup w-fit">
                  <Button label="Login" type="submit" @click="this.performLogin() "/>
               </div>
            </div>
         </div>

         <div class="col-6 pl-3 pr-3">
            <div class="flex flex-column h-full">
               <p class="text-justify">
                  Puedes jugar sin registrarte, pero si te registras, podremos medir el tiempo que tardas en resolver
                  el juego y registrarlo en la tabla de puntuaciones.
               </p>
               <div class="flex h-full align-content-end">
                  <Button label="Resgistrarse" severity="info"
                          @click="this.viewStoreQHCube.setPlayerComponent('new-record')"
                          class="align-self-end w-fit"></Button>
               </div>
            </div>
         </div>

      </div>
   </div>
</template>

<script>
import authUtils from "../../assets/js/authUtils.js";

export default {
   name: "LoginAndRegister",
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         player: {
            email: "",
            password: ""
         },
      }
   },
   methods: {
      async performLogin() {
         await authUtils.login({
            email: this.player.email,
            password: this.player.password,
         });

         if (this.playerStoreQHCube.isAuthenticated) {
            this.viewStoreQHCube.setPlayerComponent('registered-player');
         }
      }
   }
}
</script>

<style scoped>

</style>