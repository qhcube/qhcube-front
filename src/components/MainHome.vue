<template>
    <div class="flex gap-3 py-4">

        <main-game />

        <div class="flex flex-nowrap flex-column gap-3 w-full">
            <game-info-layout v-if="this.viewStoreQHCube.getUserComponent !== 'new-record'">
                <component :is="this.viewStoreQHCube.getGameInfoComponent" />
            </game-info-layout>

            <user-layout v-if="this.viewStoreQHCube.getGameInfoComponent !== 'game-description'">
                <component :is="this.viewStoreQHCube.getUserComponent" />
            </user-layout>
        </div>

    </div>
</template>

<script>

import MainGame from "@/components/MainGame.vue";
import GameInfoLayout from "@/components/layouts/GameInfoLayout.vue";
import UserLayout from "@/components/layouts/UserLayout.vue";
import GameDescription from "@/components/gameInfo/GameDescription.vue";
import BriefGameDescription from "@/components/gameInfo/BriefGameDescription.vue";
import LoginAndRegister from "@/components/usersManagement/LoginAndRegister.vue";
import NewRecord from "@/components/usersManagement/NewRecord.vue";
import RegisteredPlayer from "@/components/usersManagement/RegisteredPlayer.vue";

export default {
    name: "MainHome",
    inject: ["userStoreQHCube" , "viewStoreQHCube"],
    components: {UserLayout, GameInfoLayout, MainGame, BriefGameDescription,
        GameDescription, LoginAndRegister, NewRecord, RegisteredPlayer}
}
</script>

<style scoped>

</style>