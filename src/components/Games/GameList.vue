<template>

   <DataTable :value="this.games" striped-rows tableStyle="min-width: 30rem">
      <Column field="initialTime" header="Fecha y hora de inicio"></Column>
      <Column field="endTime" header="Fecha y hora de finalización"></Column>
      <Column field="totalGameTime" header="Tiempo total de juego"></Column>
   </DataTable>

</template>

<script>
import {defineComponent} from 'vue'
import gameUtils from "../../assets/js/gameUtils.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
   name: "GameList",
   inject: ["playerStoreQHCube", "viewStoreQHCube"],
   components: {DataTable, Column},

   data() {
      return {
         games: null
      }
   },

   async mounted() {
      this.games = await gameUtils.getGamesByPlayer();
      console.log(JSON.stringify(this.games, null, 4));
   }
})

</script>

<style scoped>

</style>