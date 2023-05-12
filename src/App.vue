<template>
    <main-title />
    <router-view />
    <div class="flex gap-3">
        <main-footer />
    </div>
</template>

<script>

import MainHome from "@/components/MainHome.vue";
import MainTitle from "@/components/MainTitle.vue";
import MainFooter from "@/components/MainFooter.vue";

export default ({
    name: "App",
    inject: ["userStoreQHCube"],
    components: {
        MainTitle,
        MainHome,
        MainFooter
    }
})
</script>

<style scoped>
</style>
