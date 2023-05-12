<template>
    <div class="flex gap-3 py-4">

        <main-game />

        <div class="flex flex-nowrap flex-column gap-3 w-full">
            <game-info-layout v-if="this.userStoreQHCube.getUserComponent !== 'new-record'">
                <component :is="this.userStoreQHCube.getGameInfoComponent" />
            </game-info-layout>

            <user-layout v-if="this.userStoreQHCube.getGameInfoComponent !== 'game-description'">
                <component :is="this.userStoreQHCube.getUserComponent" />
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
    inject: ["userStoreQHCube"],
    data() {
        return {
            loginAndRegisterVisible: true
        }
    },
    components: {UserLayout, GameInfoLayout, MainGame, BriefGameDescription,
        GameDescription, LoginAndRegister, NewRecord, RegisteredPlayer}
}
</script>

<style scoped>

</style>