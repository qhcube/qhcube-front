<template>
    <div class="flex gap-3">
        <div class="flex flex-nowrrap flex-column">
            <!-- <canvas id="myCanvas" width="1000" height="600" style="border: 3px solid rgb(164,82,0);"> -->
            <canvas id="myCanvas" width="1000" height="600" class="shadow-6">
                Your browser does not support HTML5 Canvas. Please shift to a newer browser.
            </canvas>
        </div>
        <div class="flex flex-nowrap flex-column">
            <descripcion-breve />
        </div>
    </div>
    <div class="flex gap-3">
        <MainFooter />
    </div>
</template>

<script>

import DescripcionBreve from "./DescripcionBreve.vue";
import MainFooter from "./MainFooter.vue";

export default {
    name: "MainHome",
    components: {MainFooter, DescripcionBreve},
    mounted() {
        pageLoaded();
    }
}
</script>

<style scoped>

</style>