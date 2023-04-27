<template>
    <main-title />
    <main-home />
</template>

<script>

import MainHome from "./components/MainHome.vue";
import MainTitle from "./components/MainTitle.vue";

export default ({
    name: "App",
    components: {
        MainTitle,
        MainHome
    }
})
</script>

<style scoped>
</style>
