<template>
   <DataTable :value="this.games"
              scrollable
              scrollHeight="218px"
              class="p-datatable-sm p-datatable-striped"
              style="min-width: 30rem">
      <ColumnGroup type="header">
         <Row>
            <Column header="Inicio" :colspan="2" style="background-color: #cae6fc"/>
            <Column header="Fin" :colspan="2" />
         </Row>
         <Row>
            <Column header="Fecha" sortable field="initialDate" style="background-color: #cae6fc"/>
            <Column header="Hora" field="initialTime" style="background-color: #cae6fc"/>
            <Column header="Fecha" sortable field="endDate" />
            <Column header="Hora" field="endTime" />
            <Column header="Tiempo de juego" field="diffTime" />
         </Row>
      </ColumnGroup>
      <Column field="initialDate" style="background-color: #cae6fc"/>
      <Column field="initialTime" style="background-color: #cae6fc"/>
      <Column sortable field="endDate" />
      <Column field="endTime" />
      <Column field="diffTime" />
   </DataTable>
</template>

<script>
import {defineComponent} from 'vue'
import gameUtils from "../../assets/js/gameUtils.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";

export default defineComponent({
   name: "GameList",
   inject: ["playerStoreQHCube", "viewStoreQHCube"],
   components: {DataTable, Column, ColumnGroup, Row},

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
.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even) {
   background-color: red;
}
</style>