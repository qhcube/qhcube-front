<template>

   <ul>
      <li v-for="game in gameList" :key="game.id">
         {{ game["initialTime"] }} --- {{ game["endTime"] }} --- {{ game["totalGameTime"]}}
      </li>
   </ul>
</template>

<script>
import {defineComponent} from 'vue'
import gameUtils from "../../assets/js/gameUtils.js";

export default defineComponent({
   name: "GameList",
   inject: ["playerStoreQHCube", "viewStoreQHCube"],
   data() {
      return {
         gameList: []
      }
   },
   async mounted() {
      this.gameList = await gameUtils.getGamesByPlayer();
      for (let i = 0; i < this.gameList.length; i++) {
         let auxInitialTime = new Date(this.gameList[i]["initialTime"]);
         this.gameList[i]["initialTime"] = ("0" + auxInitialTime.getDate()).slice(-2) + "/"
               + ("0" + (auxInitialTime.getMonth() + 1)).slice(-2) + "/"
               + auxInitialTime.getFullYear() + " "
               + auxInitialTime.getHours() + ":"
               + auxInitialTime.getMinutes() + ":"
               + auxInitialTime.getSeconds();

         let auxEndTime = new Date(this.gameList[i]["endTime"]);

         if (auxEndTime > auxInitialTime) {
            this.gameList[i]["endTime"] = ("0" + auxEndTime.getDate()).slice(-2) + "/"
                  + ("0" + (auxEndTime.getMonth() + 1)).slice(-2) + "/"
                  + auxEndTime.getFullYear() + " "
                  + auxEndTime.getHours() + ":"
                  + auxEndTime.getMinutes() + ":"
                  + auxEndTime.getSeconds();

            let auxTotalGameTime = new Date(this.gameList[i]["totalGameTime"]).getTime();
            let delta = Math.floor(auxTotalGameTime / 1000);
            let days = Math.floor(delta / (3600 * 24));
            delta -= days * 3600 * 24;
            let hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            let minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            let seconds = delta % 60;

            this.gameList[i]["totalGameTime"] = days + " días, " + hours + " horas, " + minutes + " minutos y " + seconds + " segundos";
         } else {
            this.gameList[i]["endTime"] = "Juego no finalizado";
            this.gameList[i]["totalGameTime"] = "";
         }


      }
   }
})

</script>

<style scoped>

</style>