<template>
    <div class="flex flex-column align-items-center gap-1 text-color-secondary text-lg py-5" style="width: 1000px">
        <p class="m-0">
            © Copyright 2023 Jesús Lacalle
            <a href="mailto:jesus.glopezdelacalle@upm.es" class="pi pi-envelope ml-2" target="_blank"/>
        </p>
        <p class="m-0 text-xs opacity-60 flex align-items-center gap-2">
            <span title="Versión de la interfaz web"><i class="pi pi-desktop mr-1 text-xs"/>{{ versionFront }}</span>
            <span>·</span>
            <span title="Versión del servidor"><i class="pi pi-server mr-1 text-xs"/>{{ versionBack }}</span>
        </p>
    </div>


<script>
import axios from "axios";

export default {
    name: "MainFooter",
    data() {
        return {
            versionFront: __APP_VERSION__,
            versionBack: "..."
        }
    },

    async mounted() {
        await axios({
            method: "get",
            url: import.meta.env.VITE_APP_FREEAPI + "/version-back",
        }).then((response) => {
            this.versionBack = response.data.version;
        }).catch((err) => {
            console.log("Error leyendo versión del back: " + err);
            this.versionBack = "desconocida"
        })
    }
}
</script>

<style scoped>
a {
    color: inherit;
    text-decoration: none;
}
</style>
