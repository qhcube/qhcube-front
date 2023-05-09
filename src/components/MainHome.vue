<template>
    <div class="flex gap-3 py-4">
        <div class="flex flex-nowrrap flex-column">
            <!-- <canvas id="myCanvas" width="1000" height="600" style="border: 3px solid rgb(164,82,0);"> -->
            <canvas id="myCanvas" width="300" height="600" class="shadow-6">
                Your browser does not support HTML5 Canvas. Please shift to a newer browser.
            </canvas>
        </div>
        <div class="flex flex-nowrap flex-column gap-3 w-full">
            <brief-game-description v-if="this.briefGameDescriptionVisible"
                               @showGameDescription="this.showGameDescription()"
                               @hideGameDescription="this.hideGameDescription()"/>
            <login-and-register v-if="this.loginAndRegisterVisible"
                                @hideNewRecord="this.hideNewRecord()"
                                @showNewRecord="this.showNewRecord()"/>
        </div>
    </div>
    <div class="flex gap-3">
        <MainFooter/>
    </div>
</template>

<script>

import MainFooter from "@/components/MainFooter.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
import BriefGameDescription from "@/components/BriefGameDescription.vue";

export default {
    name: "MainHome",
    data() {
        return {
            briefGameDescriptionVisible: true,
            loginAndRegisterVisible: true
        }
    },
    components: {BriefGameDescription, LoginAndRegister, MainFooter},
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
    },
    mounted() {
        pageLoaded();
    }
}
</script>

<style scoped>

</style>