<template>
   <div class="flex gap-3 py-4">

      <main-game class="z-5"/>

      <confirm-dialog id="confirmDialog" class="w-30rem"/>

      <div v-if="this.viewStoreQHCube.getErrorStatus.length === 0" class="flex flex-nowrap flex-column gap-3 w-full">
         <game-info-layout v-if="this.viewStoreQHCube.getPlayerComponent !== 'new-record'">
            <component :is="this.viewStoreQHCube.getGameInfoComponent" :showDesc="this.showDesc" @updateShowDesc="this.updateShowDesc()"/>
         </game-info-layout>

         <player-layout v-if="this.viewStoreQHCube.getGameInfoComponent === 'brief-game-description'">
            <component :is="this.viewStoreQHCube.getPlayerComponent" :showDesc="this.showDesc"/>
         </player-layout>
      </div>

      <div v-else class="flex flex-nowrap flex-column gap-3 w-full">
         <error-layout>
            <component is="general-error"/>
         </error-layout>
      </div>

   </div>
</template>

<script>

import MainGame from "./MainGame.vue";
import GameInfoLayout from "./layouts/GameInfoLayout.vue";
import PlayerLayout from "./layouts/PlayerLayout.vue";
import ErrorLayout from "./layouts/ErrorLayout.vue";
import LearnToPlay from "./gameInfo/LearnToPlay.vue";
import GameMeaning from "./gameInfo/GameMeaning.vue";
import BriefGameDescription from "./gameInfo/BriefGameDescription.vue";
import LoginAndRegister from "./playersManagement/LoginAndRegister.vue";
import NewRecord from "./playersManagement/NewRecord.vue";
import RegisteredPlayer from "./playersManagement/RegisteredPlayer.vue";
import GeneralError from "./errors/GeneralError.vue";
import PlayerProfile from "./playersManagement/PlayerProfile.vue";
import RegisteredGameInfo from "@/components/gameInfo/RegisteredGameInfo.vue";

export default {
   name: "MainHome",
   inject: ["playerStoreQHCube", "viewStoreQHCube"],
   components: {
      ErrorLayout, PlayerLayout, GameInfoLayout, MainGame, BriefGameDescription,
      LearnToPlay, GameMeaning, LoginAndRegister, NewRecord, RegisteredPlayer,
      PlayerProfile, GeneralError, RegisteredGameInfo
   },
  data() {
     return {
        showDesc: true
     }
   },
   methods: {
      updateShowDesc() {
         this.showDesc = !this.showDesc;
      }
   },
   mounted() {
      if (this.playerStoreQHCube.isAuthenticated) {
         this.viewStoreQHCube.setPlayerComponent("registered-player");
      }
   }
}
</script>

<style scoped>

</style>