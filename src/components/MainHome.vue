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

import MainGame from "@/components/MainGame.vue";
import GameInfoLayout from "@/components/layouts/GameInfoLayout.vue";
import PlayerLayout from "@/components/layouts/PlayerLayout.vue";
import ErrorLayout from "@/components/layouts/ErrorLayout.vue";
import GameDescription from "@/components/gameInfo/GameDescription.vue";
import BriefGameDescription from "@/components/gameInfo/BriefGameDescription.vue";
import LoginAndRegister from "@/components/playersManagement/LoginAndRegister.vue";
import NewRecord from "@/components/playersManagement/NewRecord.vue";
import RegisteredPlayer from "@/components/playersManagement/RegisteredPlayer.vue";
import GeneralError from "@/components/errors/GeneralError.vue";
import PlayerProfile from "@/components/playersManagement/PlayerProfile.vue";

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