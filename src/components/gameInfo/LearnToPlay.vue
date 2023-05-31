<template>
    <div class="flex flex-column bg-red-50 shadow-6">
        <div class="flex flex-row flex-nowrap three px-2" style="height: 90px">
            <div class="flex">
                <h1>Aprende a jugar</h1>
            </div>
            <div class="flex flex-row-reverse flex-grow-1 align-self-start pt-4 pr-4">
                <Button icon="pi pi-times" severity="danger" size="small"
                        @click="this.viewStoreQHCube.setGameInfoComponent('brief-game-description')"
                        class="p-button-raised p-button-outlined p-button-rounded"/>
            </div>
        </div>
        <div class="flex flex-auto">
            <scroll-panel class="custombar1" style="width: 100%; height: 510px">
               <p>
                  El hipercubo cuántico representa una puerta cuántica discreta de dos cúbits, es decir, una
                  matriz <i>4x4</i>
                  cuyas entradas son números complejos de la forma <i>a+bi</i> con <i>a</i> y <i>b</i> enteros. Pero en
                  el hipercubo no se representan los enteros (partes reales e imaginarias) de los elmentos de la
                  matriz, sino sus paridades, mediante un código de dos colores: <span style="color: #f2c005; text-shadow: 1px 1px #888888">par</span>
                  e <span style="color: #2690f1; text-shadow: 1px 1px #888888">impar</span>. En la siguiente
                  figura se puede ver el hipercubo correspondiente a una puerta cuántica discreta.
               </p>

               <div class="flex align-self-center">
                  <img src="../../assets/images/figura_1.png" alt="figura 1" style="max-width: 100%; margin: auto"/>
               </div>

               <div class="two">
                  <h3>Objetivo del juego</h3>
               </div>
               <p>
                  El objetivo del juego es conseguir, mediante una serie de movimientos, que el hipercubo represente
                  la matriz identidad. Para ello hay que ir bajando el nivel del hipercubo hasta cero, tal como se
                  observa en la siguiente figura.
               </p>

               <div class="flex align-self-center">
                  <img src="../../assets/images/figura_2.png" alt="figura 2" style="max-width: 100%; margin: auto"/>
               </div>

               <div class="two -mt-3">
                    <h3>Movimientos del hipercubo cuántico</h3>
                </div>
                <p>
                    Para ejecutar los movimientos el hipercubo utiliza dos puertas cuánticas concretas
                    llamadas <i>H</i> y <i>G</i>. En general, al aplicar <i>H</i> a un cúbit, éste aumenta en uno su
                    nivel, pero, si cuando se aplica, las partes real e imaginaria de las dos coordenadas tienen las
                    mismas paridades –es decir, que ambas son pares o ambas son impares– se reduce el nivel en uno. La
                    puerta <i>G</i> intercambia las partes reales e imaginarias de ciertas coordenadas, pero deja
                    invariante el nivel. Finalmente, la permutación y la rotación de filas o columnas son movimientos
                    que resultan de combinaciones específicas de puertas <i>G</i> y <i>H</i>.
                </p>
                <div class="flex align-self-center">
                    <img src="../../assets/images/figura_3.png" alt="figura 3" style="max-width: 100%; margin: auto"/>
                </div>
                <p>
                    Entonces, para bajar el nivel del hipercubo hay que conseguir que las filas 1 y 2, por un lado, y 3
                    y 4, por otro, tengan la misma configuración de paridades y aplicar <i>H</i>. Por lo tanto, la
                    información realmente importante es la paridad de las coordenadas. Por esta razón, en el hipercubo
                    estas paridades se representan mediante un código de dos colores, tal como se observa en las figuras
                    1.b y 2.b. El movimiento reducción también puede realizarse, de manera análoga, por columnas.
                </p>
                <p>
                    Pero, ¡ojo!, si no se tiene cuidado con los movimientos escogidos se puede aumentar el nivel del
                    hipercubo, en vez de reducirlo. Si el hipercubo no tiene la configuración de paridades indicada, al
                    aplicar <i>H</i> se aumentará el nivel. Lo mismo ocurre con la rotación de filas o columnas, si la
                    configuración no es adecuada aumenta el nivel del hipercubo mientras que, si ésta es adecuada,
                    mantiene el nivel. Sin embargo, si jugamos siguiendo una estrategia adecuada, siempre podremos
                    resolver este juego.
                </p>

                <div class="two">
                    <h3>Lista de movimientos</h3>
                </div>

                <table>
                    <tr>
                        <td class="movimiento">Mover el hipercubo</td>
                        <td class="descripcion">
                            Pinchar fuera del hipercubo y arrastar
                        </td>
                        <td>
                            <img src="../../assets/images/figura_4.png"
                                 alt="Figura tabla 1" style="max-width: 100%; margin: auto"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Permutar dos filas</td>
                        <td class="descripcion">
                            Pinchar una de las caras que separa las dos filas (hay 4 caras posibles). Se puden permutar
                            las filas 1-2, 2-3 y 3-4.
                        </td>
                        <td>
                            <img src="../../assets/images/figura_permutacion-rotacion_filas.png"
                                 alt="Figura tabla 2" style="max-width: 100%; margin: auto"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Permutar dos columnas</td>
                        <td class="descripcion">
                            Pinchar una de las caras que separa las dos columnas (hay 3 caras posibles). Se puden
                            permutar las columnas 1-2, 2-3, 3-4 y 4-1.
                        </td>
                        <td>
                            <img src="../../assets/images/figura_permutacion-rotacion_columnas.png"
                                 alt="Figura tabla 3" style="max-width: 100%; margin: auto"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Intercambio en una fila</td>
                        <td class="descripcion">
                            Pinchar en una de las caras correspondiente a la parte real de un vértice de la fila (hay 4
                            caras posibles).
                        </td>
                        <td>
                            <img src="../../assets/images/figura_intercambio_fila.png"
                                 alt="Figura tabla 4" style="max-width: 100%; margin: auto"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Intercambio en una columna</td>
                        <td class="descripcion">
                            Pinchar en una de las caras correspondiente a la parte imaginaria de un vértice de la
                            columna (hay 4 caras posibles).
                        </td>
                        <td>
                            <img src="../../assets/images/figura_intercambio_columna.png"
                                 alt="Figura tabla 5" style="max-width: 100%; margin: auto"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Rotar dos filas</td>
                        <td class="descripcion">
                            Hacer doble click en una de las caras que separa las dos filas (hay 4 caras posibles). Se
                            puden rotar las filas 1-2, 2-3 y 3-4.
                        </td>
                        <td>
                            <img src="../../assets/images/figura_permutacion-rotacion_filas.png"
                                 alt="Figura tabla 6" style="max-width: 100%; margin: auto"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Rotar dos columnas</td>
                        <td class="descripcion">
                            Hacer doble click en una de las caras que separa las dos columnas (hay 3 caras posibles). Se
                            puden rotar las columnas 1-2, 2-3, 3-4 y 4-1.
                        </td>
                        <td>
                            <img src="../../assets/images/figura_permutacion-rotacion_columnas.png"
                                 alt="Figura tabla 7" style="max-width: 100%; margin: auto"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Reducción por filas</td>
                        <td class="descripcion">
                            Hacer doble click en una de las caras correspondiente a la parte real de un vértice (hay 16
                            caras posibles).
                        </td>
                        <td>
                            <img src="../../assets/images/figura_reduccion_filas.png"
                                 alt="Figura tabla 8" style="max-width: 100%; margin: auto"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Reducción por columnas</td>
                        <td class="descripcion">
                            Hacer doble click en una de las caras correspondiente a la parte imaginaria de un vértice
                            (hay 16 caras posibles).
                        </td>
                        <td>
                            <img src="../../assets/images/figura_reduccion_columnas.png"
                                 alt="Figura tabla 9" style="max-width: 100%; margin: auto"/>
                        </td>
                    </tr>
                </table>
            </scroll-panel>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameDescription",
    inject: ["playerStoreQHCube", "viewStoreQHCube"]
}
</script>

<style scoped>
h1 {
    font-size: 1.75rem;
    font-weight: 500;
}

p {
    text-align: justify;
}

img {
    max-width: 100%;
    margin: auto;
    min-width: 200px;
}

table {
    border-collapse: collapse;
}

tr {
    border: #080808 1px solid;
}

.movimiento {
    padding-top: 2rem;
    font-weight: 800;
    text-align: left;
    vertical-align: top;
    white-space: nowrap;
}

.descripcion {
    padding-left: 1rem;
    padding-top: 2rem;
    padding-right: 1rem;
    text-align: left;
    vertical-align: top;
}

.two h3 {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 1.5em;
    padding-bottom: 10px;
    position: relative;
    margin-top: 2rem;
}

.two h3:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 2px;
    height: 1px;
    width: 35%;
    background-color: #ff8980;
}

::v-deep(.p-scrollpanel-content) {
    padding-right: 2.5rem;
    padding-left: 1rem;
}

::v-deep(.p-scrollpanel.custombar1 .p-scrollpanel-wrapper) {
    border-right: 10px solid var(--surface-ground);
}

::v-deep(.p-scrollpanel.custombar1 .p-scrollpanel-bar) {
    background-color: var(--primary-200);
    opacity: 1;
    transition: background-color 0.3s;
}

::v-deep(.p-scrollpanel.custombar1 .p-scrollpanel-bar:hover) {
    background-color: var(--primary-400);
}
</style>