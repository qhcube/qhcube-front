<template>
   <Message severity="error" icon="pi" class="flex flex-column w-fit align-self-center" @close="this.closeError()">
      <span class="flex font-bold m-1 mr-3"> {{ this.viewStoreQHCube.getErrorStatus }} </span>
      <span class="flex m-1 mt-3 mr-3"> {{ this.viewStoreQHCube.getErrorMessage }} </span>
      <span v-if="this.viewStoreQHCube.getOptionalErrorMessage" class="flex text-xs m-1 mt-3 mr-3"> ({{ this.viewStoreQHCube.getOptionalErrorMessage }}) </span>
   </Message>
</template>

<script>
import {defineComponent} from 'vue'
import authUtils from "../../assets/js/authUtils.js";

export default defineComponent({
   name: "GeneralError",
   inject: ["playerStoreQHCube" , "viewStoreQHCube"],
   methods: {
      closeError() {
         const errorMsgFromServer = this.viewStoreQHCube.getOptionalErrorMessage;
         if (errorMsgFromServer.includes("401") || errorMsgFromServer.includes("403")) {
            authUtils.logout();
         }
         this.viewStoreQHCube.setError("", "", "");
      }
   }
})
</script>

<style scoped>

</style>