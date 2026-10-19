<template>
    <div class="flex flex-column bg-red-50 shadow-6">
        <div class="flex flex-row flex-nowrap three px-2" style="height: 90px">
            <div class="flex">
                <h1>Instrucciones para el juego registrado</h1>
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
                    <h3>¿Por qué registrarse?</h3>
                </div>
                <p>
                    Esta aplicación admite dos modos de juego: <span class="font-semibold">Práctica</span> y
                    <span class="font-semibold">Registrado</span>. En el modo <span
                    class="font-semibold">Práctica</span> se
                    puede jugar sin necesidad de registrarse. En el modo
                    <span class="font-semibold">Registrado</span> tendrás acceso a múltiples opciones como guardar tus
                    partidas para continuarlas en otro momento, o reproducir tus partidas anteriores.
                </p>
                <p>
                    No se piden muchos datos para registrarse, y <span class="underline">en cualquier momento podrás borrar
               tus datos </span>accediendo a tu perfil de usuario <span class="underline">con un solo click</span>. La
                    información que facilites sólo será utilizada para asociar
                    tus partidas a tu perfil de usuario. Una vez finalizado el proceso de registro, en ningún momento se
                    enviarán correos electrónicos a tu dirección ni se utilizará tu información para otros fines. Y, por
                    supuesto, <span class="underline">no se cederá a terceros</span>.
                </p>
                <p>
                    Para registrarse se pide <strong>nombre y apellidos</strong>, un <strong>correo electrónico</strong>
                    y
                    una <strong>contraseña</strong>. El correo electrónico se validará mediante un mensaje que se
                    enviará.
                    (Este será el único correo que recibas por nuestra parte).
                </p>

                <div class="two -mt-2">
                    <h3>Modo práctica</h3>
                </div>
                <p>
                    En este modo <span
                    class="underline">siempre se comienza desde un mismo estado inicial del juego</span>.
                    <span class="underline">Para reiniciarlo, basta con que recargues la página</span>. De hecho, cada
                    vez
                    que lo hagas, perderás tu progreso y volverá a comenzar.
                </p>

                <div class="two -mt-2">
                    <h3>Modo registrado</h3>
                </div>
                <p>
                    Al visitar la web, estarás en modo práctica y puedes jugarla. Una vez introduzcas tu usuario y
                    contraseña, seguirás jugando en modo práctica, pero verás un botón para iniciar un
                    <span class="font-semibold">Nuevo Juego Registrado</span>. Al pulsarlo, se generará un estado
                    inicial
                    del juego aleatorio de nivel 6. A partir de ese momento, podrás jugar en modo registrado. Esto
                    significa
                    que cada vez que actúes sobre el juego, se guardará lo que hayas hecho en un servidor. Así, tu
                    partida
                    quedará registrada.
                </p>
                <p>
                    Al principio, y mientras te encuentres en modo pŕactica, verás una tabla con las partidas anteriores
                    registradas. Puedes tener abiertas un máximo de 10 partidas (para las resueltas no hay límite). En
                    la
                    tabla verás lo siguiente de cada partida:
                </p>
                <ul>
                    <li>la fecha y hora en la que la iniciaste,</li>
                    <li>la fecha y hora de resolución,</li>
                    <li>tiempo transcurrido desde que la iniciaste,</li>
                    <li>el número de movimientos que tiene realizados</li>
                    <li>y su estado (resuelta o abierta),</li>
                </ul>
                <p>
                    A continuación de cada partida verás tres botones para realizar alguna de estas tres acciones:
                </p>
                <ul>
                    <li>
                        <span class="font-semibold">Continuar juego</span>: si la partida está abierta, puedes
                        continuarla
                        desde donde la dejaste.
                    </li>
                    <li>
                        <span class="font-semibold">Reproducir juego</span>: podrás reproducir paso a paso todos los
                        movimientos que realizaste en la partida hasta su estado actual.
                    </li>
                    <li>
                        <span class="font-semibold">Eliminar juego</span>: borrará esa partida de manera definitiva del
                        servidor (no se puede recuperar).
                    </li>
                </ul>
                <div class="two -mt-2">
                    <h3>Reproducir juego</h3>
                </div>
                <p>
                    Al pulsar el botón <span class="font-semibold">Reproducir juego (<span
                    class="pi pi-replay text-blue-600"/>)</span>,
                    podrás ver la evolución de tu partida en el cubo de la izquierda.
                </p>
                <p>
                    En la tabla se indica el número de movimento que muestra el cubo con respecto el número total de
                    movimientos realizados para que puedas ubicarte.
                </p>
                <p>
                    Con los botones de la siguiente fila podrás <span class="underline">avanzar y retroceder paso a
               paso</span> (<span class="pi pi-angle-left text-blue-600"/> y <span
                    class="pi pi-angle-right text-blue-600"/>),
                    o de 10 en 10 movimientos (<span class="pi pi-angle-double-left text-blue-600"/> y
                    <span class="pi pi-angle-double-right text-blue-600"/>).
                    También podrás avanzar hasta el útimo movimento directamente (<span
                    class="pi pi-step-forward text-blue-600"/>) o
                    retroceder hasta el primero (<span class="pi pi-step-backward text-blue-600"/>). En cualquier
                    momento podrás salir de la
                    reproducción y volver a la tabla con tus juegos registrados .
                </p>
                <p>
                    El interruptor que hay debajo de la tabla te permite elegir si quieres que el cubo siga las
                    posiciones
                    originales con las que jugaste la partida, o si quieres que el cubo mantenga la posición que le
                    estés
                    asignando mientras reproduces la partida.
                </p>

                <div class="two -mt-2">
                    <h3>¿Dudas? ¿Sugerencias?</h3>
                </div>
                <p>
                    En caso de que estés interesado en conocer más detalles sobre el funcionamiento del juego o la web,
                    ya
                    sea para resolver dudas, sugerirnos alguna mejora o avisarnos de algún error, puedes ponerte en
                    contacto
                    con nosotros a través de correo electrónico <a href="mailto:jesus.glopezdelacalle@upm.es"
                                                                   target="_blank">
                    jesus.glopezdelacalle@upm.es</a>.
                </p>
                <p>
                    Agradecemos mucho tu visita y esperamos que disfrutes con nuestro trabajo.
                </p>
            </scroll-panel>
        </div>
    </div>
</template>

<script>

import {defineComponent} from 'vue'

export default defineComponent({
    name: "RegisteredGameInfo",
    inject: ["playerStoreQHCube", "viewStoreQHCube"]
})

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
<script setup>
</script>
