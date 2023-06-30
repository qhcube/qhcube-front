<template>

   <Toast position="center"/>
</template>

<script>
import {defineComponent} from 'vue';
import {useToast} from "primevue/usetoast";

export default defineComponent({
   name: "ActiveGame",
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   mounted() {
      const toast = useToast();
      this.$toast.add({
         severity: 'info',
         summary: 'Juego nuevo comenzado...',
         detail: '¡Buena suerte!',
         life: 1700
      });
   }
})
</script>

<style scoped>

</style>