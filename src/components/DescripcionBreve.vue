<template>
    <div class="bg-red-50 p-2">
        <div class="flex flex-nowrap three">
            <h1>Descripción del juego</h1>
        </div>
        <div class="flex flex-nowrap">
            <p>
                El hipercubo cuántico representa una <i>puerta cuántica discreta de dos cúbits</i>, es decir, una <u>matriz
                4x4</u>
                cuyas entradas son <u>números complejos</u> de la forma <b>a+bi</b> con a y b enteros.
            </p>
        </div>
        <div class="flex flex-nowrap">
            <p>
                El <b>objetivo del juego</b> es
                conseguir, mediante una serie de movimientos, <b>que el hipercubo represente la matriz identidad</b>.
            </p>
        </div>
        <div class="flex flex-nowrap flex-column" style="margin: auto">
            <Button label="Aprende a jugar" link></Button>
        </div>
    </div>
</template>

<script>
export default {
    name: "DescripcionBreve",
}
</script>

<style scoped>
p {
    line-height: 1.5em;
}

.three h1 {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.5em;
    padding-bottom: 15px;
    position: relative;
}

.three h1:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 5px;
    width: 55px;
    background-color: #ff6459;
}

.three h1:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 2px;
    height: 1px;
    width: 115%;
    max-width: 255px;
    background-color: #ff8980;
}
</style>