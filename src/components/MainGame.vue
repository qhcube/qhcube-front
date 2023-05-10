<template>
    <div class="flex flex-nowrrap flex-column">
        <!-- <canvas id="myCanvas" width="1000" height="600" style="border: 3px solid rgb(164,82,0);"> -->
        <canvas id="myCanvas" width="300" height="600" class="shadow-6">
            Your browser does not support HTML5 Canvas. Please shift to a newer browser.
        </canvas>
    </div>
</template>

<script>
export default {
    name: "MainGame",
    mounted() {
        pageLoaded();
    }
}
</script>

<style scoped>

</style>