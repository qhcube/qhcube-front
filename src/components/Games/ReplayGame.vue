<template>
    <div class="flex flex-row pl-5 p-5 align-items-center" :style="'height:' + (this.showDesc ? '239px' : '375px')">
        <table>
            <tbody>
            <tr>
                <td class="first-td">Id:</td>
                <td class="second-td">{{ this.game.id }}</td>
            </tr>
            <tr>
                <td class="first-td">Último movimiento:</td>
                <td class="second-td">
                    {{ this.playerStoreQHCube.lastMoveReplayed }} de {{ this.movs.length }} <span
                        class="font-bold mr-2">&rArr;</span>
                    <span v-if="this.playerStoreQHCube.lastMoveReplayed > 0" style="color: var(--blue-700)">{{
                            this.getMovString(this.movs[this.playerStoreQHCube.lastMoveReplayed - 1])
                        }}</span>
                </td>
            </tr>
            <tr>
                <td class="first-td">Acciones:</td>
                <td class="second-td">
                    <div class="flex flex-row gap-2 align-content-center">
                        <table style="border: 0; max-width: 50%">
                            <tbody>
                                <tr style="padding-top: 6px">
                                    <td class="text-center">
                                        <Button text rounded raised label="" icon="pi pi-step-backward"
                                                @click="this.goToBeginning()"/>
                                    </td>
                                    <td class="text-center pl-4">
                                        <Button text rounded raised icon="pi pi-angle-double-left"
                                                @click="this.makePrevTenMoves()"/>
                                    </td>
                                    <td class="text-center pl-2">
                                        <Button text rounded raised label="" icon="pi pi-angle-left"
                                                @click="this.makePrevMove()"/>
                                    </td>
                                    <td class="text-center pl-2">
                                        <Button text rounded raised label="" icon="pi pi-angle-right"
                                                @click="this.makeNextMove()"/>
                                    </td>
                                    <td class="text-center pl-2">
                                        <Button text rounded raised label="" icon="pi pi-angle-double-right"
                                                @click="this.makeNextTenMoves()"/>
                                    </td>
                                    <td class="text-center pl-4">
                                        <Button text rounded raised label="" icon="pi pi-step-forward"
                                                @click="this.goToEnd()"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center text-blue-600 pt-2 text-xs">Inicio</td>
                                    <td class="text-center text-blue-600 pt-2 pl-4 text-xs">-10</td>
                                    <td class="text-center text-blue-600 pt-2 pl-2 text-xs">-1</td>
                                    <td class="text-center text-blue-600 pt-2 pl-2 text-xs">+1</td>
                                    <td class="text-center text-blue-600 pt-2 pl-2 text-xs">+10</td>
                                    <td class="text-center text-blue-600 pt-2 pl-4 text-xs">Fin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="first-td">Girar cubo:</td>
                <td class="second-td">
                    <div class="flex flew-row align-items-center gap-3">
                        <input-switch v-model="this.considerPositions"/>
                        <span v-if="this.considerPositions">(El cubo sigue las posiciones de la partida original)</span>
                        <span v-else>(El cubo mantendrá la posición que se le asigne manualmente)</span>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <!--
              <ul>
                 <li>Input inicial: {{ this.game.input }}</li>
                 <li>Último movimiento realizado: {{ this.lastMov - 1 }} --&gt; {{ this.movs[this.lastMov - 1] }}</li>
                 <li>
                    Input Actual: {{ this.var_coor_test }}
                    <Button text size="small" icon="pi pi-copy" @click="toClipboard(var_coor_test)" />
                 </li>
                 <li>Posiciones almacenadas: {{ this.positions.length }}</li>
              </ul>
        -->
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import gameUtils from "../../assets/js/gameUtils.js";


export default defineComponent({
    name: "ReplayGame",
    inject: ['playerStoreQHCube', 'viewStoreQHCube'],
    data() {
        return {
            game: {},
            movs: [],
            positions: [],
            //lastMov: 0,
            solved: false,
            considerPositions: true,
            var_coor_test: []
        }
    },
    props: {
        showDesc: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        considerPositions: async function (val) {
            if (val) {
                await this.makeMov(this.positions[this.positions.length - 1]);
            }
        }
    },

    async mounted() {
        this.game = await gameUtils.loadRegisteredGame(this.playerStoreQHCube.gameId);
        gameUtils.resetGame(JSON.parse(this.game.input));
        this.movs = JSON.parse('[' + this.game.movsList + ']');
        if (this.movs[this.movs.length - 1][0] === 5) {
            this.movs.pop();
            this.solved = true;
        }
        await this.makeNextMove();
        this.var_coor_test = var_coor;
        this.playerStoreQHCube.lastMoveReplayed = 1;
        replayMode = true;
    },

    methods: {
        async toClipboard(text) {
            await navigator.clipboard.writeText(typeof text === "string" ? text : JSON.stringify(text));
        },

        async makeNextMove() {
            if (this.playerStoreQHCube.lastMoveReplayed < this.movs.length) {
                if (this.movs[this.playerStoreQHCube.lastMoveReplayed][0] === 4) {
                    this.positions.push(this.movs[this.playerStoreQHCube.lastMoveReplayed]);
                    if (this.considerPositions) {
                        await this.makeMov(this.movs[this.playerStoreQHCube.lastMoveReplayed]);
                    }
                } else {
                    await this.makeMov(this.movs[this.playerStoreQHCube.lastMoveReplayed]);
                }
                this.playerStoreQHCube.lastMoveReplayed++;
            }
        },

        async makePrevMove() {
            if (this.playerStoreQHCube.lastMoveReplayed > 1) {
                this.playerStoreQHCube.lastMoveReplayed--;

                switch (this.movs[this.playerStoreQHCube.lastMoveReplayed][0]) {
                    case 0:
                    case 2:
                        await this.makeMov(this.movs[this.playerStoreQHCube.lastMoveReplayed]);
                        break;
                    case 1:
                        for (let i = 0; i < 3; i++) {
                            await this.makeMov(this.movs[this.playerStoreQHCube.lastMoveReplayed]);
                        }
                        break;
                    case 3:
                        await this.makeMov(this.movs[this.playerStoreQHCube.lastMoveReplayed], true);
                        break;
                    case 4:
                        if (this.positions.length > 1) {
                            this.positions.pop();
                        }
                        if (this.considerPositions) {
                            await this.makeMov(this.positions[this.positions.length - 1]);
                        }
                        break;
                }
            }
        },

        async makeMov(mov, inverse = false) {
            switch (mov[0]) {
                case 0:
                    await Permutar(mov[1], mov[2], mov[3]);
                    break;
                case 1:
                    await Intercambiar(mov[1], mov[2]);
                    break;
                case 2:
                    await Reducir(mov[1]);
                    break;
                case 3:
                    if (inverse) {
                        await Rotar(mov[1], mov[2], mov[3], true);
                    } else {
                        await Rotar(mov[1], mov[2], mov[3], false);
                    }
                    break;
                case 4:
                    gameUtils.setQHCUbePosition(mov);
                    break;
            }

            SistemaReferencia();
            CalcularVista();
            RepresentacionVista();
        },

        async makeNextTenMoves() {
            for (let i = 0; i < 10; i++) {
                await this.makeNextMove();
            }
        },

        async makePrevTenMoves() {
            for (let i = 0; i < 10; i++) {
                await this.makePrevMove();
            }
        },

        async goToBeginning() {
            await this.goToMove(0);
        },

        async goToEnd() {
            await this.goToMove(this.movs.length);
        },

        async goToMove(move) {
            if (move > this.playerStoreQHCube.lastMoveReplayed) {
                for (let i = this.playerStoreQHCube.lastMoveReplayed; i < move; i++) {
                    await this.makeNextMove();
                }
            } else {
                for (let i = this.playerStoreQHCube.lastMoveReplayed; i > move; i--) {
                    await this.makePrevMove();
                }
            }
        },

        getMovString(mov) {
            if (mov === undefined)
                mov = [4, 0, 0, 0];

            switch (mov[0]) {
                case 0:
                    return "Permutación de " + (mov[1] === 1 ? "filas" : "columnas") + " " + (mov[2] + 1) + " y " + (mov[3] + 1) + ".";
                case 1:
                    return "Intercambio en " + (mov[1] === 1 ? "fila" : "columna") + " " + (mov[2] + 1) + ".";
                case 2:
                    return "Reducción por " + (mov[1] === 1 ? "filas" : "columnas") + ".";
                case 3:
                    return "Rotación de " + (mov[1] === 1 ? "filas" : "columnas") + " " + (mov[2] + 1) + " y " + (mov[2] + 2) % 4 + ".";
                case 4:
                    return "Cambio de perpectiva.";
            }
        },

    }
})
</script>

<style scoped>
table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
}

.first-td {
    min-width: 15%;
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

.second-td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

</style>