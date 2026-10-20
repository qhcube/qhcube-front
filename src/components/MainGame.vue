<template>
    <div class="flex flex-nowrrap flex-column">
        <!-- <canvas id="myCanvas" width="1000" height="600" style="border: 3px solid rgb(164,82,0);"> -->
        <canvas id="myCanvas" width="960" height="550" class="shadow-6">
            Your browser does not support HTML5 Canvas. Please shift to a newer browser.
        </canvas>
    </div>
</template>

<script>
export default {
    name: "MainGame",
    mounted() {
        checkPrevGame();
        pageLoaded();
    }
    // TODO: On Mounted, it can be called a function to check if session is expired or not
}
</script>

<style scoped>

</style>
