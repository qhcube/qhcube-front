<template>
   <div class="flex flex-nowrap w-full">
   <Message :severity="this.status === 'OK' ? 'success' : 'warn'" icon="pi" style="margin: 5rem auto" @close="this.closeAlert()">
      <div class="flex flex-column gap-2 w-full ml-3 mr-3">
         <span class="font-bold"> {{ this.status }} </span>
         <span class="mt-2"> {{ this.message }} </span>
         <span> {{ this.optionalMessage }} </span>
         <span v-if="this.status !== 'OK'" class="text-xs">
            Si crees que hay algún error, puedes ponerte en <br />
            contacto con nosotros a través de correo electrónico:<br />
            <a href="mailto:tecnicos.si.etsisi@upm.es">tecnicos.si.etsisi@upm.es</a>
         </span>
      </div>
   </Message>
   </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
   name: "ActivatedAccountAlert",
   inject: ["viewStoreQHCube"],
   data() {
      return {
         status: "",
         message: "",
         optionalMessage: ""
      }
   },
   mounted() {
      this.status = this.$route.query.status;
      this.message = this.$route.query.message;
      if (this.status === "OK") {
         this.optionalMessage = "Ya puedes iniciar sesión como usuario registrado.";
      } else {
         this.optionalMessage = "No se ha podido llevar a cabo la activación de la cuenta.";
      }
   },
   methods: {
      closeAlert() {
         this.$router.push({name: 'home'});
      }
   }
})
</script>

<style scoped>

</style>