<template>
    <main-title></main-title>
    <router-view />
</template>

<script>
import {defineComponent} from "vue";
import MainTitle from "./components/MainTitle.vue";

export default defineComponent({
    components: {MainTitle}
})
</script>

<style scoped>
</style>
