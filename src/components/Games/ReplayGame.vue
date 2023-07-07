<template>
   <div class="flex flex-row pl-5 p-5 align-items-center" :style="'height:' + (this.showDesc ? '239px' : '375px')">
      <table>
         <tbody>
            <tr>
               <td class="first-td">Id:</td>
               <td class="second-td">{{ this.game.id }}</td>
            </tr>
            <tr>
               <td class="first-td">Último movimiento:</td>
               <td class="second-td">
                  {{ this.lastMov }} de {{ this.movs.length}} <span class="font-bold mr-2">&rArr;</span>
                  <span v-if="this.lastMov > 0" style="color: var(--blue-700)">{{ this.getMovString(this.movs[this.lastMov - 1]) }}</span>
               </td>
            </tr>
            <tr>
               <td class="first-td">Acciones: </td>
               <td class="second-td">
                  <div class="flex flex-row gap-2 align-content-center">
                     <Button text rounded raised icon="pi pi-angle-double-left" @click="this.makePrevTenMoves()" />
                     <Button text rounded raised label="" icon="pi pi-angle-left" @click="this.makePrevMove()" />
                     <Button text rounded raised label="" icon="pi pi-angle-right"  @click="this.makeNextMove()" />
                     <Button text rounded raised label="" icon="pi pi-angle-double-right" @click="this.makeNextTenMoves()" />
                  </div>
               </td>
            </tr>
            <tr>
               <td class="first-td">Girar cubo: </td>
               <td class="second-td">
                  <div class="flex flew-row align-items-center gap-3">
                     <input-switch v-model="this.considerPositions" />
                     <span v-if="this.considerPositions">(El cubo sigue las posiciones de la partida original)</span>
                     <span v-else>(El cubo mantendrá la posición que se le asigne manualmente)</span>
                  </div>
               </td>
            </tr>
         </tbody>
      </table>
<!--
      <ul>
         <li>Input inicial: {{ this.game.input }}</li>
         <li>Último movimiento realizado: {{ this.lastMov - 1 }} --&gt; {{ this.movs[this.lastMov - 1] }}</li>
         <li>
            Input Actual: {{ this.var_coor_test }}
            <Button text size="small" icon="pi pi-copy" @click="toClipboard(var_coor_test)" />
         </li>
         <li>Posiciones almacenadas: {{ this.positions.length }}</li>
      </ul>
-->
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
   props: {
      showDesc: {
         type: Boolean,
         default: false
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
      makeNextTenMoves() {
         for (let i = 0; i < 10; i++) {
            this.makeNextMove();
         }
      },
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

      makePrevTenMoves() {
         for (let i = 0; i < 10; i++) {
            this.makePrevMove();
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
      },

      getMovString(mov) {
         switch (mov[0]) {
            case 0:
               return "Permutación de " + (mov[1] === 1 ? "filas" : "columnas") + " " + (mov[2] + 1) + " y " + (mov[3] + 1) + ".";
            case 1:
               return "Intercambio en " + (mov[1] === 1 ? "fila" : "columna" ) + " " + (mov[2] + 1) + ".";
            case 2:
               return "Reducción por " + (mov[1] === 1 ? "filas" : "columnas") + ".";
            case 3:
               return "Rotación de " + (mov[1] === 1 ? "filas" : "columnas") + " " + mov[2] + 1 + " y " + (mov[2] + 2) % 4 + ".";
            case 4:
               return "Cambio de perpectiva.";
         }
      },

   }
})
</script>

<style scoped>
   table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      border: 1px solid #ddd;
   }

   .first-td {
      width: 15%;
      padding: 10px;
      text-align: left;
      border: 1px solid #ddd;
   }

   .second-td {
      padding: 10px;
      text-align: left;
      border: 1px solid #ddd;
   }

</style>