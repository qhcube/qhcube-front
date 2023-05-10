<template>
    <div class="flex gap-3 py-4">
        <main-game />
        <div class="flex flex-nowrap flex-column gap-3 w-full">
            <brief-game-description v-if="this.briefGameDescriptionVisible"
                               @showGameDescription="this.showGameDescription()"
                               @hideGameDescription="this.hideGameDescription()"/>
            <login-and-register v-if="this.loginAndRegisterVisible"
                                @hideNewRecord="this.hideNewRecord()"
                                @showNewRecord="this.showNewRecord()"/>
        </div>
    </div>
</template>

<script>

import LoginAndRegister from "@/components/LoginAndRegister.vue";
import BriefGameDescription from "@/components/BriefGameDescription.vue";
import MainGame from "@/components/MainGame.vue";

export default {
    name: "MainHome",
    data() {
        return {
            briefGameDescriptionVisible: true,
            loginAndRegisterVisible: true
        }
    },
    components: {MainGame, BriefGameDescription, LoginAndRegister},
    methods: {
        showGameDescription() {
            this.loginAndRegisterVisible = false;
        },
        hideGameDescription() {
            this.loginAndRegisterVisible = true;
        },
        showNewRecord() {
            this.briefGameDescriptionVisible = false;
        },
        hideNewRecord() {
            this.briefGameDescriptionVisible = true
        }
    }
}
</script>

<style scoped>

</style>