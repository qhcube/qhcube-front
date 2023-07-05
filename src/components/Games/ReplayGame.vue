<template>
   <div class="flex flex-column p-3">
      <table>
         <tbody>
            <tr>
               <td class="first-td">Id:</td>
               <td class="second-td">{{ this.game.id }}</td>
            </tr>
            <tr>
               <td class="first-td">Último movimiento:</td>
               <td class="second-td">{{ this.lastMov }} de {{ this.movs.length}}</td>
            </tr>
            <tr>
               <td class="first-td">Girar cubo: </td>
               <td class="flex flew-row second-td align-items-center gap-3">
                  <input-switch v-model="this.considerPositions" />
                  <span v-if="this.considerPositions">(El cubo sigue las posiciones de la partida original)</span>
                  <span v-else>(El cubo mantendrá la posición que se le asigne manualmente)</span>
               </td>
            </tr>
         </tbody>
      </table>

      <ul>
         <li>Input inicial: {{ this.game.input }}</li>
         <li>Número de movs: {{ this.movs.length }}</li>
         <li>Último movimiento realizado: {{ this.lastMov - 1 }} --> {{ this.movs[this.lastMov - 1] }}</li>
         <li>
            Ahora: {{ this.var_coor_test }}
            <Button text size="small" icon="pi pi-copy" @click="toClipboard(var_coor_test)" />
         </li>
         <li>Posiciones: {{ this.positions.length }}</li>
      </ul>
      <div class="flex flex-row gap-2">
         <Button :label="'< Prev. mov.: ' + (this.lastMov - 1)" @click="this.makePrevMove()" />
         <Button :label="'Sig. mov.: ' + (this.lastMov) + ' >'"  @click="this.makeNextMove()" />
      </div>
   </div>
</template>

<script>
import {defineComponent} from 'vue'
import gameUtils from "@/assets/js/gameUtils.js";
import { toClipboard } from '@soerenmartius/vue3-clipboard'


export default defineComponent({
   name: "ReplayGame",
   inject: ['playerStoreQHCube', 'viewStoreQHCube'],
   data() {
      return {
         game: {},
         movs: [],
         positions: [],
         lastMov: 0,
         solved: false,
         considerPositions: true,
         var_coor_test: []
      }
   },
   watch: {
      considerPositions: function (val) {
         if (val) {
            this.makeMov(this.positions[this.positions.length - 1]);
         }
      }
   },
   async mounted() {
      this.game = await gameUtils.loadRegisteredGame(this.playerStoreQHCube.gameId);
      gameUtils.resetGame(JSON.parse(this.game.input));
      this.movs = JSON.parse('[' + this.game.movsList + ']');
      if (this.movs[this.movs.length - 1][0] === 5) {
         this.movs.pop();
         this.solved = true;
      }
      this.makeNextMove();
      this.var_coor_test = var_coor;
   },
   methods: {
      toClipboard,
      makeNextMove() {
         if (this.lastMov < this.movs.length) {
            if (this.movs[this.lastMov][0] === 4) {
               this.positions.push(this.movs[this.lastMov]);
               if (this.considerPositions) {
                  this.makeMov(this.movs[this.lastMov]);
               }
            } else {
               this.makeMov(this.movs[this.lastMov]);
            }
            this.lastMov++;
         } else {
            console.log("No hay más movimientos hacia adelante.");
         }
      },

      makePrevMove() {
         if(this.lastMov > 1) {
            this.lastMov--;
            switch (this.movs[this.lastMov][0]) {
               case 0:
               case 2:
                  this.makeMov(this.movs[this.lastMov]);
                  break;
               case 1:
                  for (let i = 0; i < 3; i++) {
                     this.makeMov(this.movs[this.lastMov]);
                  }
                  break;
               case 3:
                  console.log("Probando rotar")
                  for (let i = 0; i < 11; i++) {
                     this.makeMov(this.movs[this.lastMov]);
                  }
                  break;
               case 4:
                  if (this.positions.length > 1) {
                     this.positions.pop();
                  }
                  if (this.considerPositions) {
                     this.makeMov(this.positions[this.positions.length - 1]);
                  }
                  break;
            }
         } else {
            console.log("No hay más movimientos hacia atrás.");
         }
      },

      makeMov(mov) {
         switch (mov[0]) {
            case 0:
               Permutar(mov[1], mov[2], mov[3]);
               break;
            case 1:
               Intercambiar(mov[1], mov[2]);
               break;
            case 2:
               Reducir(mov[1]);
               break;
            case 3:
               Rotar(mov[1], mov[2]);
               break;
            case 4:
               gameUtils.setQHCUbePosition(mov);
               break;
         }
         SistemaReferencia();
         CalcularVista();
         RepresentacionVista();
      }
   }
})
</script>

<style scoped>
   table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      border: 1px solid #000;
   }

   .first-td {
      width: 15%;
      padding: 8px;
      text-align: left;
      border: 1px solid #888;
   }

   .second-td {
      padding: 8px;
      text-align: left;
      border: 1px solid #888;
   }

</style>