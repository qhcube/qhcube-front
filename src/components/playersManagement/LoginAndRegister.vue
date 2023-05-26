<template>
   <div class="flex flex-column bg-indigo-50 shadow-6">
      <div class="flex flex-row flex-nowrap three px-2" style="height: 75px">
         <div class="flex">
            <h1>Registro de jugador</h1>
         </div>
      </div>
      <div class="flex flex-column px-2 align-items-start">
         <p>
            Puedes jugar sin registrarte, pero si te registras, podremos medir el tiempo que tardas en resolver
            el juego y registrarlo en la tabla de puntuaciones.
         </p>
         <Button label="Resgistrarse" link @click="this.viewStoreQHCube.setPlayerComponent('new-record')"></Button>
         <p>
            Si ya estás registrado, puedes iniciar sesión:
         </p>

         <div class="flex align-items-start pl-3">
            <div class="flex flex-nowrap align-content-center align-items-start gap-2 pb-4">
               <div class="flex p-inputgroup w-15rem">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-player"></i>
                        </span>
                  <InputText placeholder="eMail" type="email" v-model="this.player.email" autocomplete="on"/>
               </div>
               <div class="flex p-inputgroup w-9rem">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                  <InputText placeholder="Password" name="password" type="password" v-model="this.player.password"
                             autocomplete="on"/>
               </div>
               <div class="flex p-inputgroup w-fit">
                  <Button label="Login" type="submit" @click="this.performLogin() "/>
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