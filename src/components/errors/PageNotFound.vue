<template>

</template>

<script>
export default {
   name: "PageNotFound",
   inject: ["viewStoreQHCube"],
   mounted() {
      this.viewStoreQHCube.setError("404", "Parece que esa página no existe.", "");
      this.$router.push({name: "home"});
   }
}
</script>

<style scoped>

</style>