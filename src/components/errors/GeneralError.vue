<template>
   <Message severity="warn" style="margin: 5rem auto" @close="this.closeError()">
      <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem"> {{ this.viewStoreQHCube.getErrorStatus }} </span><br /><br />
      <span style="margin-left: 1rem; margin-right: 1rem"> {{ this.viewStoreQHCube.getErrorMessage }} </span>
   </Message>
</template>

<script>
import {defineComponent} from 'vue'
import authUtils from "@/assets/js/authUtils.js";

export default defineComponent({
   name: "GeneralError",
   inject: ["playerStoreQHCube" , "viewStoreQHCube"],
   methods: {
      closeError() {
         this.viewStoreQHCube.setError("", "");
      }
   },
   beforeUpdate() {
      if (this.viewStoreQHCube.getErrorStatus === "401") {
         authUtils.logout();
      }
   }
})
</script>

<style scoped>

</style>