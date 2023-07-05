<template>
   <div class="flex flex-column bg-red-50 shadow-6">
      <div class="flex flex-row flex-nowrap three px-2" style="height: 90px">
         <div class="flex">
            <h1>Instrucciones para el juego registrado</h1>
         </div>
         <div class="flex flex-row-reverse flex-grow-1 align-self-start pt-4 pr-4">
            <Button icon="pi pi-times" severity="danger" size="small"
                    @click="this.viewStoreQHCube.setGameInfoComponent('brief-game-description')"
                    class="p-button-raised p-button-outlined p-button-rounded"/>
         </div>
      </div>
      <div class="flex flex-auto">
         <scroll-panel class="custombar1" style="width: 100%; height: 460px">
            <div class="two -mt-2">
               <h3>Presentación</h3>
            </div>
            <p>
               Aquí se explicará la diferencia entre el modo de práctica y el modo de juego registrado.
            </p>
         </scroll-panel>
      </div>
   </div>
</template>

<script>

import {defineComponent} from 'vue'

export default defineComponent({
   name: "RegisteredGameInfo",
   inject: ["playerStoreQHCube", "viewStoreQHCube"]
})

</script>

<style scoped>
h1 {
   font-size: 1.75rem;
   font-weight: 500;
}

p {
   text-align: justify;
}

img {
   max-width: 100%;
   margin: auto;
   min-width: 200px;
}

table {
   border-collapse: collapse;
}

tr {
   border: #080808 1px solid;
}

.two h3 {
   font-size: 1.1rem;
   font-weight: 600;
   letter-spacing: 0;
   line-height: 1.5em;
   padding-bottom: 10px;
   position: relative;
   margin-top: 2rem;
}

.two h3:after {
   content: "";
   position: absolute;
   left: 0;
   bottom: 2px;
   height: 1px;
   width: 35%;
   background-color: #ff8980;
}

::v-deep(.p-scrollpanel-content) {
   padding-right: 2.5rem;
   padding-left: 1rem;
}

::v-deep(.p-scrollpanel.custombar1 .p-scrollpanel-wrapper) {
   border-right: 10px solid var(--surface-ground);
}

::v-deep(.p-scrollpanel.custombar1 .p-scrollpanel-bar) {
   background-color: var(--primary-200);
   opacity: 1;
   transition: background-color 0.3s;
}

::v-deep(.p-scrollpanel.custombar1 .p-scrollpanel-bar:hover) {
   background-color: var(--primary-400);
}
</style>