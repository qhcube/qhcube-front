<template>
    <div class="flex">
        <div class="flex flex-nowrrap">
            <canvas id="myCanvas" width="1000" height="600" style="border: 3px solid rgb(164,82,0);">
                Your browser does not support HTML5 Canvas. Please shift to a newer browser.
            </canvas>
        </div>
        <div class="flex flex-nowrap">
            <h2><a href="https://quantum-explore.com/es/qhcube-descripcion.html" target="_blank">Descripción del juego</a></h2>
            <p>&nbsp;</p>
            <h2>Contacto:</h2>
            <h3>&nbsp;&nbsp;&nbsp; jesus.glopezdelacalle@upm.es</h3>
        </div>
    </div>
</template>

<script>

export default {
    name: "MainHome",
    mounted() {
        pageLoaded();
        //window.addEventListener('load', () => {
        //    pageLoaded();
        //})
        //document.body.setAttribute('onload', 'pageLoaded();');
        //pageLoaded();
        //this.$el.querySelector('body').setAttribute('onload', 'pageLoaded();');
        //let juegoScript = document.createElement('script');
        //juegoScript.setAttribute('src', '../assets/juego.js');
        //document.head.appendChild(juegoScript);

    }
}
</script>

<style scoped>

</style>