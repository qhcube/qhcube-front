<template>
   <DataTable :value="this.games"
              :loading="this.loading"
              scrollable
              sortField="initialDate"
              :sortOrder="1"
              :scroll-height="this.showDesc ? '218px' : '378px'"
              class="p-datatable-sm p-2 py-3"
              style="min-width: 860px">
      <template #empty>
         <div class="flex">
            <p class="mt-2 mb-2 m-auto">
               Aún no tienes juegos registrados.
            </p>
         </div>
      </template>
      <template #loading>
         <div class="flex flex-column" style="height: 100%; width: 100%; background-color: var(--surface-50)">
            <ProgressSpinner class="align-self-center"/>
            <p class="mt-2 mb-2 m-auto">
               Cargando juegos...
            </p>
         </div>
      </template>
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
      <Column field="state" bodyStyle="height: 1px; width: 1px; background-color: var(--yellow-100)" >
         <template #body="slotProps">
            <div :class="['game-state',
               {'open': slotProps.data.state === 'Abierto'},
               {'cancelled': slotProps.data.state === 'Cancelado'},
               {'solved': slotProps.data.state === 'Resuelto'}
            ]" >
               <span class="m-auto pr-2 pl-2">{{slotProps.data.state}}</span>
            </div>
         </template>
      </Column>


      <Column header="Opciones" style="max-width: 85px">
         <template #body="slotProps">
            <div class="flex flex-nowrap">
               <Button
                     @click="this.loadGame(slotProps.data.gameId)"
                     icon="pi pi-download"
                     text
                     v-tooltip.top="'Continuar juego'"
                     class="p-button-sm btn-no-focus"/>
               <Button
                     @click="this.deleteGame(slotProps.data.gameId)"
                     icon="pi pi-trash"
                     text
                     v-tooltip.top="'Eliminar juego'"
                     class="p-button-sm btn-no-focus" />
               <Button
                     @click="this.replayGame(slotProps.data.gameId)"
                     icon="pi pi-replay"
                     text
                     v-tooltip.top="'Reproducir juego'"
                     class="p-button-sm btn-no-focus" />
               &nbsp;
            </div>
         </template>
      </Column>
   </DataTable>

   <Toast position="center" group="cc"/>

   <ConfirmDialog group="gameList"/>

</template>

<script>
import {defineComponent} from 'vue'
import gameUtils from "../../assets/js/gameUtils.js";
import activeGame from "@/components/Games/ActiveGame.vue";

export default defineComponent({
   name: "GameList",
   inject: ["playerStoreQHCube", "viewStoreQHCube"],
   data() {
      return {
         loading: false,
         games: null,
      }
   },
   props: {
      showDesc: {
         type: Boolean,
         default: false
      }
   },
   async mounted() {
      await this.getGamesByPlayer();
   },

   methods: {
      async getGamesByPlayer() {
         this.loading = true;
         this.games = await gameUtils.getGamesByPlayer();
         this.games.map(game => {
            if (game.state === 'Abierto') {
               game.diffTime = "-";
            }
         });
         this.loading = false;
      },

      deleteGame(gameId) {
         this.$confirm.require({
            message: "¿Seguro que quieres borrar el juego?",
            header: "Borrar juego",
            icon: "pi pi-exclamation-triangle",
            acceptClass: "p-button-danger",
            acceptLabel: "Sí",
            group: "gameList",
            accept: async () => {
               await gameUtils.deleteGame(gameId);
               this.$toast.add({severity: 'info', summary: 'Juego eliminado.', group: 'cc', life: 1500});
               await this.getGamesByPlayer();
            },
            reject: () => {
               this.$toast.add({severity: 'info', summary: 'Cancelado. No se borra el juego', group: 'cc', life: 1500});
            }
         });
      },

      async loadGame(gameId) {
         let game = await gameUtils.loadRegisteredGame(gameId);
         if (this.viewStoreQHCube.errorStatus === "") {
            gameUtils.resetGame(JSON.parse(game.currentInput));
            this.playerStoreQHCube.setActiveGameMode(1);
            this.$toast.add({severity: 'info', summary: 'Juego cargado...', group: 'cc', life: 1500});
            this.viewStoreQHCube.setRegisteredPlayerComponent("active-game");
         }
      },

      async replayGame(gameId) {
         this.$toast.add({severity: 'info', summary: 'Reproduciendo juego...' + gameId, group: 'cc', life: 1500});

         this.playerStoreQHCube.gameId = gameId;
         this.playerStoreQHCube.setActiveGameMode(3);
         this.viewStoreQHCube.setRegisteredPlayerComponent("replay-game");
      },
   }
})

</script>

<style scoped>

   .p-datatable-sm {
      font-size: 0.9rem;
   }

   .btn-no-focus:focus {
      outline: none;
      box-shadow: none;
   }

   .game-state {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
   }

   .open {
      background-color: var(--purple-100);
   }
   .cancelled {
      background-color: var(--red-200);
   }
   .solved {
      background-color: var(--green-200);
   }

</style>