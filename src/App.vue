<template>
    <main-title></main-title>
    <main-home />
</template>

<script>
import {defineComponent} from "vue";
import MainTitle from "./components/MainTitle.vue";
import MainHome from "./components/MainHome.vue";

export default defineComponent({
    components: {MainHome, MainTitle}
})
</script>

<style scoped>
</style>
