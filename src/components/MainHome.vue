<template>
    <div class="flex gap-3 py-4">

         <main-game />

         <div v-if="this.viewStoreQHCube.getErrorStatus.length === 0" class="flex flex-nowrap flex-column gap-3 w-full">
            <game-info-layout v-if="this.viewStoreQHCube.getPlayerComponent !== 'new-record'">
                <component :is="this.viewStoreQHCube.getGameInfoComponent" />
            </game-info-layout>

            <player-layout v-if="this.viewStoreQHCube.getGameInfoComponent !== 'game-description'">
                <component :is="this.viewStoreQHCube.getPlayerComponent" />
            </player-layout>
         </div>

         <div v-else class="flex flex-nowrap flex-column gap-3 w-full">
            <error-layout>
               <component is="general-error" />
            </error-layout>
         </div>

    </div>
</template>

<script>

import MainGame from "./MainGame.vue";
import GameInfoLayout from "./layouts/GameInfoLayout.vue";
import PlayerLayout from "./layouts/PlayerLayout.vue";
import ErrorLayout from "./layouts/ErrorLayout.vue";
import GameDescription from "./gameInfo/GameDescription.vue";
import BriefGameDescription from "./gameInfo/BriefGameDescription.vue";
import LoginAndRegister from "./playersManagement/LoginAndRegister.vue";
import NewRecord from "./playersManagement/NewRecord.vue";
import RegisteredPlayer from "./playersManagement/RegisteredPlayer.vue";
import GeneralError from "./errors/GeneralError.vue";
import PlayerProfile from "./playersManagement/PlayerProfile.vue";

export default {
    name: "MainHome",
    inject: ["playerStoreQHCube" , "viewStoreQHCube"],
    components: {
       ErrorLayout, PlayerLayout, GameInfoLayout, MainGame, BriefGameDescription,
        GameDescription, LoginAndRegister, NewRecord, RegisteredPlayer, PlayerProfile, GeneralError},
   mounted() {
       if (this.playerStoreQHCube.isAuthenticated) {
            this.viewStoreQHCube.setPlayerComponent("registered-player");
       }
   }
}
</script>

<style scoped>

</style>