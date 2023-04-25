<template>
    <div class="flex flex-column bg-red-50">
        <div class="flex flex-row flex-nowrap three" style="height: 90px">
            <div class="flex">
                <h1>Juego del del hipercubo cuántico</h1>
            </div>
            <div class="flex flex-row-reverse flex-grow-1 align-self-start">
                <Button link class="pi pi-times-circle text-red-400 mx-1 my-3 text-4xl"
                        @click="this.$emit('close')"></Button>
            </div>
        </div>
        <div class="flex flex-auto">
            <scroll-panel style="width: 100%; height: 510px" class="custombar1">
                <p>
                    El hipercubo cuántico representa una puerta cuántica discreta de dos cúbits, es decir, una matriz
                    4x4 cuyas entradas son números complejos de la forma a+bi con a y b enteros. Pero en el hipercubo no
                    se representan los enteros (partes reales e imaginarias) de los elmentos de la matriz, sino sus
                    paridades, mediante un código de dos colores: par e impar. En la siguiente figura se puede ver el
                    hipercubo correspondiente a una puerta cuántica discreta.
                </p>

                <div class="flex align-self-center">
                    <img src="/src/assets/figura_1.bmp" alt="figura 1" style="max-width: 100%; margin: auto"/>
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
                    <img src="/src/assets/figura_2.bmp" alt="figura 2" style="max-width: 100%; margin: auto"/>
                </div>

                <div class="two">
                    <h3>Estados cuánticos discretos</h3>
                </div>
                <p>
                    En computación cuántica, la unidad elemental de información es el cúbit. Al igual que un bit, en
                    computación clásica, un cúbit puede estar en dos estados –que denotamos con |0 y |1– pero también
                    puede estar en estados intermedios –por ejemplo, el estado 0,8|0 + 0,6|1–. Matemáticamente, se
                    puede expresar cualquier cúbit con dos coordenadas, en el ejemplo anterior, (0,8, 0,6). Si tenemos
                    un sistema de dos cúbits, el estado de cada uno de ellos se expresa con cuatro coordenadas. Los
                    valores de cada una de estas coordenadas son números complejos, es decir, números de la forma <i>a +
                    bi</i>, siendo <i>a</i> y <i>b</i> números reales e <i>i</i> la unidad compleja, definida como raíz
                    cuadrada de -1.
                </p>
                <p>
                    Es posible considerar modelos de computación más sencillos, en los que las coordenadas de los
                    estados cuánticos no pueden ser cualquier número complejo si no solo aquellos de la forma <i>a +
                    bi</i>, con <i>a</i> y <i>b</i> números enteros, salvo unfactor que depende de un número natural <i>k</i>.
                    Estas coordenadas corresponden a los llamados estados discretos de nivel k. Si tenemos un sistema de
                    dos cúbits en estado discreto, éste se escribirá (<i>a+ib</i>, <i>c+id</i>, <i>e+if</i>, <i>g+ih</i>),
                    con <i>a</i>, <i>b</i>, <i>c</i>, <i>d</i>, <i>e</i>, <i>f</i> y <i>g</i> números enteros. Y su
                    nivel es <i>k</i> si las coordenadas satisfacen la ecuación:
                </p>
                <p style="text-align: center">
                    <i>a<sup>2</sup> + b<sup>2</sup> + c<sup>2</sup> + d<sup>2</sup> + e<sup>2</sup> + f<sup>2</sup> + g<sup>2</sup>
                        + h<sup>2</sup> = 2<sup>k</sup></i>
                </p>

                <div class="two">
                    <h3>Puertas cuánticas discretas</h3>
                </div>
                <p>
                    Podemos disponer las coordenadas de cuatro estados discretos de dos cúbits en una cuadrícula –una
                    matriz– como en las figuras 1.a y 2.a anteriores. Cuando estos estados tienen el mismo nivel
                    <i>k</i> y cumplen cierta propiedad –son ortogonales entre sí–, la matriz es una puerta cuántica –es
                    decir, un circuito cuántico básico sobre un pequeño número de cúbits– discreta de nivel <i>k</i>. En
                    la figura 1.a, cada fila y columna de la matriz se corresponde con las coordenadas de un estado
                    discreto de dos cúbits de nivel 6, y, por tanto, la matriz es una puerta cuántica discreta de ese
                    nivel.
                </p>

                <div class="two">
                    <h3>Hipercubo cuántico</h3>
                </div>
                <p>
                    En general, el hipercubo cuántico representa una puerta cuántica discreta de un determinado nivel<i>k</i>.
                    En el juevo del hipercubo cuántico el objetivo es bajar el nivel del hipercubo hasta el nivel cero,
                    que corresponde a la matriz identidad (véase la figura 2.a) formada por ceros, excepto en los
                    elementos de la diagonal principal, que tiene unos. Para ello, los movimientos permitidos son:
                    permutar filas o columnas, intercambiar las partes real e imaginaria de una fila o columna, rotar
                    dos filas o columnas y reducir el nivel.
                </p>

                <div class="two">
                    <h3>Movimientos del hipercubo cuántico</h3>
                </div>
                <p>
                    Para ejecutar estos movimientos el hipercubo utiliza dos puertas cuánticas concretas
                    llamadas<i>H</i> y <i>G</i>. En general, al aplicar <i>H</i> a un cúbit, éste aumenta en uno su
                    nivel, pero, si cuando se aplica, las partes real e imaginaria de las dos coordenadas tienen las
                    mismas paridades –es decir, que ambas son pares o ambas son impares– se reduce el nivel en uno. La
                    puerta <i>G</i> intercambia las partes reales e imaginarias de ciertas coordenadas, pero deja
                    invariante el nivel. Finalmente, la permutación y la rotación de filas o columnas son movimientos
                    que resultan de combinaciones específicas de puertas <i>G</i> y <i>H</i>.
                </p>
                <div class="flex align-self-center">
                    <img src="/src/assets/figura_3.bmp" alt="figura 3"/>
                </div>
                <p>
                    Entonces, para bajar el nivel del hipercubo hay que conseguir que las filas 1 y 2, por un lado, y 3
                    y 4, por otro, tengan la misma configuración de paridades y aplicar <i>H</i>. Por lo tanto, la
                    información realmente importante es la paridad de las coordenadas. Por esta razón, en el hipercubo
                    estas paridades se representan mediante un código de dos colores, tal como se observa en las figuras
                    1.b y 2.b. El movimiento reducción también puede realizarse, de manera análoga, por columnas.
                </p>
                <p>
                    Pero, ¡ojo!, si no se tiene cuidado con los movimientos escogidos se puede ampliar el nivel del
                    hipercubo, en vez de reducirlo. Si el hipercubo no tiene la configuración de paridades indicada, al
                    aplicar <i>H</i> se aumentará el nivel. Lo mismo ocurre con la rotación de filas o columnas, si la
                    configuración no es adecuada aumenta el nivel del hipercubo mientras que, si ésta es adecuada,
                    mantiene el nivel. Sin embargo, si jugamos siguiendo una estrategia adecuada, siempre podremos
                    resolver este juego.
                </p>
                <p>
                    Que siempre se pueda resolver el hipercubo cuántico equivale a que cualquier puerta cuántica
                    discreta de dos cúbits se puede construir utilizando exclusivamente las dos puertas cuánticas
                    elementales H y G. Se conjetura que el resultado es cierto para cualquier número de cúbits, aunque
                    esto todavía no se ha demostrado.
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
                        <td><img src="/src/assets/figura_4.bmp" width="406" height="173" alt="Figura tabla 1"></td>
                    </tr>
                    <tr>
                        <td class="movimiento">Permutar dos filas</td>
                        <td class="descripcion">
                            Pinchar una de las caras que separa las dos filas (hay 4 caras posibles). Se puden permutar
                            las filas 1-2, 2-3 y 3-4.
                        </td>
                        <td><img src="/src/assets/figura_permutacion-rotacion_filas.bmp" width="207" height="198"
                                 alt="Figura tabla 2"></td>
                    </tr>
                    <tr>
                        <td class="movimiento">Permutar dos columnas</td>
                        <td class="descripcion">
                            Pinchar una de las caras que separa las dos columnas (hay 3 caras posibles). Se puden
                            permutar las columnas 1-2, 2-3, 3-4 y 4-1.
                        </td>
                        <td><img src="/src/assets/figura_permutacion-rotacion_columnas.bmp" width="210" height="200"
                                 alt="Figura tabla 3">
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Intercambio en una fila</td>
                        <td class="descripcion">
                            Pinchar en una de las caras correspondiente a la parte real de un vértice de la fila (hay 4
                            caras posibles).
                        </td>
                        <td><img src="/src/assets/figura_intercambio_fila.bmp" width="210" height="189"
                                 alt="Figura tabla 4"></td>
                    </tr>
                    <tr>
                        <td class="movimiento">Intercambio en una columna</td>
                        <td class="descripcion">
                            Pinchar en una de las caras correspondiente a la parte imaginaria de un vértice de la
                            columna (hay 4 caras posibles).
                        </td>
                        <td><img src="/src/assets/figura_intercambio_columna.bmp" width="211" height="199"
                                 alt="Figura tabla 5"></td>
                    </tr>
                    <tr>
                        <td class="movimiento">Rotar dos filas</td>
                        <td class="descripcion">
                            Hacer doble click en una de las caras que separa las dos filas (hay 4 caras posibles). Se
                            puden rotar las filas 1-2, 2-3 y 3-4.
                        </td>
                        <td><img src="/src/assets/figura_permutacion-rotacion_filas.bmp" width="207" height="198"
                                 alt="Figura tabla 6"></td>
                    </tr>
                    <tr>
                        <td class="movimiento">Rotar dos columnas</td>
                        <td class="descripcion">
                            Hacer doble click en una de las caras que separa las dos columnas (hay 3 caras posibles). Se
                            puden rotar las columnas 1-2, 2-3, 3-4 y 4-1.
                        </td>
                        <td><img src="/src/assets/figura_permutacion-rotacion_columnas.bmp" width="210" height="200"
                                 alt="Figura tabla 7">
                        </td>
                    </tr>
                    <tr>
                        <td class="movimiento">Reducción por filas</td>
                        <td class="descripcion">
                            Hacer doble click en una de las caras correspondiente a la parte real de un vértice (hay 16
                            caras posibles).
                        </td>
                        <td><img src="/src/assets/figura_reduccion_filas.bmp" width="212" height="202"
                                 alt="Figura tabla 8"></td>
                    </tr>
                    <tr>
                        <td class="movimiento">Reducción por columnas</td>
                        <td class="descripcion">
                            Hacer doble click en una de las caras correspondiente a la parte imaginaria de un vértice
                            (hay 16 caras posibles).
                        </td>
                        <td><img src="/src/assets/figura_reduccion_columnas.bmp" width="216" height="198"
                                 alt="Figura tabla 9"></td>
                    </tr>
                </table>

                <div class="two">
                    <h3>Detalles del movimiento reducción</h3>
                </div>
                <p>
                    Este movimiento se realiza aplicando <i>H</i> sobre la puerta cuántica discreta que representa el
                    hipercubo. Si la aplicamos por la izquierda (derecha) actúa sobre las filas (columnas) del
                    hipercubo. En la siguiente figura se ve el efecto que produce en las coordenadas de las filas 1 y 2,
                    por un lado, y 3 y 4 por otro. Se muestra el efecto sobre un par de coordenadas dado que sobre el
                    resto de pares es idéntico.
                </p>
                <div class="flex align-self-center">
                    <img src="/src/assets/figura_5.bmp" alt="Figura 4"/>
                </div>
                <p>
                    El factor 1/sqrt(2) de <i>H</i> aumenta el nivel en uno, pero si todas las coordenadas quedan pares
                    se dividen por 2 y el nivel se reduce en 2, quedando como efecto global una redución del nivel en
                    uno.
                </p>

                <div class="two">
                    <h3>Detalles del movimiento rotación</h3>
                </div>
                <p>
                    Este movimiento se realiza aplicando <i>R</i> (combinación de dos puertas <i>H</i> y dos puertas <i>G</i>)
                    sobre la puerta cuántica discreta que representa el hipercubo. Si la aplicamos por la izquierda
                    (derecha) actúa sobre las filas (columnas) del hipercubo. En la siguiente figura se ve el efecto que
                    produce en las coordenadas de las filas 1 y 2 (las filas 3 y 4 se quedan igual). Se muestra el
                    efecto sobre un par de coordenadas dado que sobre el resto de pares es idéntico.
                </p>
                <div class="flex align-self-center">
                    <img src="/src/assets/figura_6.bmp" alt="Figura 5"/>
                </div>
                <p>
                    El factor 1/2 de <i>R</i> aumenta el nivel en dos, pero si todas las coordenadas quedan pares se
                    dividen por 2 y el nivel se vuelve a reducir en 2, quedando la puerta cuántica discreta del
                    hipercubo en el mismo nivel.
                </p>
            </scroll-panel>
        </div>
    </div>


</template>

<script>
export default {
    name: "DescripcionJuego",
    emits: ['close']
}
</script>

<style scoped>
h1 {
    font-size: 1.75rem;
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