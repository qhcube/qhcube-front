<template>
   <Message severity="warn" style="margin: 5rem auto" @close="alert('Cerrando error')">
      <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem"> {{ this.status }} </span><br /><br />
      <span style="margin-left: 1rem; margin-right: 1rem"> {{ this.mensaje }} </span>
   </Message>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "RegisterError",
    data() {
        return {
            status: "NO se ha podido registrar usuario: ",
            mensaje: "Aquí debe poner el por qué (recogido de la respuesta del servidor)..."
        }
    },
})
</script>

<style scoped>

</style>