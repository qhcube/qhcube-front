<template>
   <Message @close="this.viewStoreQHCube.setRegisteredPlayerComponent('game-list')"
            severity="info"
            class="z-2"
            style="margin: 2rem auto 4rem auto">
      <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">Juego nuevo comenzado...</span><br/>
      <span style="font-weight: bold; margin-left: 1rem; margin-right: 1rem">¡Buena suerte!</span>
   </Message>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
   name: "ActiveGame",
   inject: ['playerStoreQHCube', 'viewStoreQHCube']
})
</script>

<style scoped>

</style>