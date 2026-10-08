<template>
   <div class="flex flex-column bg-red-50 shadow-6">
      <div class="flex flex-row flex-nowrap three px-2" style="height: 90px">
         <div class="flex">
            <h1>Significado del juego</h1>
         </div>
         <div class="flex flex-row-reverse flex-grow-1 align-self-start pt-4 pr-4">
            <Button icon="pi pi-times" severity="danger" size="small"
                    @click="this.viewStoreQHCube.setGameInfoComponent('brief-game-description')"
                    class="p-button-raised p-button-outlined p-button-rounded"/>
         </div>
      </div>
      <div class="flex flex-auto">
         <scroll-panel class="custombar1" style="width: 100%; height: 460px">
            <div class="two -mt-2">
               <h3>Estados cuánticos discretos</h3>
            </div>
            <p>
               En computación cuántica, la unidad elemental de información es el cúbit. Al igual que un bit, en
               computación clásica, un cúbit puede estar en dos estados –que denotamos con |0❭ y |1❭– pero también
               puede estar en estados intermedios –por ejemplo, el estado 0,8|0❭ + 0,6|1❭–. Matemáticamente, se
               puede expresar cualquier cúbit con dos coordenadas, en el ejemplo anterior, (0,8, 0,6). Si tenemos
               un sistema de dos cúbits, el estado de cada uno de ellos se expresa con cuatro coordenadas. Los
               valores de cada una de estas coordenadas son números complejos, es decir, números de la forma <i>a +
               bi</i>, siendo <i>a</i> y <i>b</i> números reales e <i>i</i> la unidad compleja, definida como raíz
               cuadrada de -1.
            </p>
            <p>
               Es posible considerar modelos de computación más sencillos, en los que las coordenadas de los
               estados cuánticos no pueden ser cualquier número complejo sino solo aquellos de la forma <i>a +
               bi</i>, con <i>a</i> y <i>b</i> números enteros, salvo un factor que depende de un número natural <i>k</i>.
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
               <img src="../../assets/images/figura_5.png" alt="Figura 4" style="max-width: 100%; margin: auto"/>
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
               <img src="../../assets/images/figura_6.png" alt="Figura 5" style="max-width: 100%; margin: auto"/>
            </div>
            <p>
               El factor 1/2 de <i>R</i> aumenta el nivel en dos, pero si todas las coordenadas quedan pares se
               dividen por 2 y el nivel se vuelve a reducir en 2, quedando la puerta cuántica discreta del
               hipercubo en el mismo nivel.
            </p>

            <div class="two">
               <h3>Hipercubo cuántico</h3>
            </div>
            <p>
               En general, el hipercubo cuántico representa una puerta cuántica discreta de un determinado nivel <i>k</i>.
               En el juevo del hipercubo cuántico el objetivo es bajar el nivel del hipercubo hasta el nivel cero,
               que corresponde a la matriz identidad (véase la figura 2.a) formada por ceros, excepto en los
               elementos de la diagonal principal, que tiene unos. Para ello, los movimientos permitidos son:
               permutar filas o columnas, intercambiar las partes real e imaginaria de una fila o columna, rotar
               dos filas o columnas y reducir el nivel.
            </p>
            <p>
               Que siempre se pueda resolver el hipercubo cuántico equivale a que cualquier puerta cuántica
               discreta de dos cúbits se puede construir utilizando exclusivamente las dos puertas cuánticas
               elementales H y G. Se conjetura que el resultado es cierto para cualquier número de cúbits, aunque
               esto todavía no se ha demostrado.
            </p>

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