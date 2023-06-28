<template>
   <DataTable :value="this.games"
              scrollable
              sortField="initialDate"
              :sortOrder="-1"
              scroll-height="218px"
              class="p-datatable-sm p-datatable-striped p-2"
              style="min-width: 670px">
      <ColumnGroup type="header">
         <Row>
            <Column header="Inicio" :colspan="2" style="background-color: var(--teal-200)"/>
            <Column header="Fin" :colspan="2" style="background-color: var(--red-200)"/>
            <Column header="" :colspan="3"/>
         </Row>
         <Row>
            <Column header="Fecha" sortable field="initialDate" style="color: #495057; background-color: var(--teal-200)"/>
            <Column header="Hora" field="initialTime" style="background-color: var(--teal-200)"/>
            <Column header="Fecha" sortable field="endDate" style="color: #495057; background-color: var(--red-200)"/>
            <Column header="Hora" field="endTime" style="background-color: var(--red-200)"/>
            <Column header="Tiempo de juego" field="diffTime" style="background-color: var(--orange-200)"/>
            <Column header="Estado" class="w-fit" field="state" style="background-color: var(--yellow-200)"/>
            <Column header="" />
         </Row>
      </ColumnGroup>
      <Column field="initialDate" style="background-color: var(--teal-100)"/>
      <Column field="initialTime" style="background-color: var(--teal-100)"/>
      <Column field="endDate" style="background-color: var(--red-100)"/>
      <Column field="endTime" style="background-color: var(--red-100)"/>
      <Column field="diffTime" style="background-color: var(--orange-100)"/>
      <Column field="state" class="w-fit" style="background-color: var(--yellow-100)" />

      <Column header="Opciones">
         <template #body="slotProps">
            <div class="flex flex-nowrap">
               <Button icon="pi pi-caret-right" class="p-button-sm btn-no-focus" text @click="alert('Play Clicked: ' + slotProps.data.gameId)"/>
               <Button icon="pi pi-trash" class="p-button-sm btn-no-focus" text @click="alert('Trash Clicked: ' + slotProps.data.gameId)"/>
               <Button icon="pi pi-replay" class="p-button-sm btn-no-focus" text @click="alert('Replay Clicked: ' + slotProps.data.gameId)"/>
            </div>
         </template>
      </Column>

   </DataTable>
</template>

<script>
import {defineComponent} from 'vue'
import gameUtils from "../../assets/js/gameUtils.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Button from "primevue/button";

export default defineComponent({
   name: "GameList",
   inject: ["playerStoreQHCube", "viewStoreQHCube"],
   components: {DataTable, Column, ColumnGroup, Row, Button},

   data() {
      return {
         games: null
      }
   },

   async mounted() {
      await this.getGamesByPlayer();
      // console.log(JSON.stringify(this.games, null, 4));
   },

   methods: {
      async getGamesByPlayer() {
         this.games = await gameUtils.getGamesByPlayer();
         this.games.map(game => {
            if (game.state === 'Abierto') {
               game.diffTime = "-";
            }
         })
      },
      alert(msg) {
         alert(msg);
      }
   }
})

</script>

<style scoped>

   .btn-no-focus:focus {
      outline: none;
      box-shadow: none;
   }

</style>