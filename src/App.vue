<template>
    <router-view name="MainTitle"/>
    <router-view />
    <div class="flex gap-3">
        <router-view name="MainFooter" />
    </div>
</template>

<script>

import MainHome from "@/components/MainHome.vue";
import MainTitle from "@/components/MainTitle.vue";
import MainFooter from "@/components/MainFooter.vue";

export default ({
    name: "App",
    inject: ["userStoreQHCube", "viewStoreQHCube"],
    components: {
        MainTitle,
        MainHome,
        MainFooter
    }
})
</script>

<style scoped>
</style>
