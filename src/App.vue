<template>
    <router-view name="MainTitle"/>
    <router-view />
    <div class="flex gap-3">
        <router-view name="MainFooter" />
    </div>
</template>

<script>
export default {
    name: "App",
    inject: ["playerStoreQHCube", "viewStoreQHCube"],
   mounted() {
       this.viewStoreQHCube.$reset();
   }
}
</script>

<style scoped>
</style>
