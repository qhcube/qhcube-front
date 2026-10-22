<template>
    <div class="flex flex-column pl-5 p-5 align-items-center w-full"
         :style="'height:' + (this.showDesc ? '239px' : '375px')">
        <table>
            <tbody>
            <tr>
                <td class="first-td">Inicio del juego:</td>
                <td class="second-td">{{ gameUtils.getDate(this.activeGame.initialTime) }} &nbsp;
                    ({{ gameUtils.getHour(this.activeGame.initialTime) }})
                </td>
            </tr>
            <tr>
                <td class="first-td">Tiempo trancurrido:</td>
                <td class="second-td" style="color: var(--blue-700)">{{ this.gameTime }}</td>
            </tr>
            </tbody>
        </table>

        <!--
        <ul>
           <li>Fecha inicial: {{ gameUtils.getDate(this.activeGame.initialTime) }}</li>
           <li>Hora inicial: {{ gameUtils.getHour(this.activeGame.initialTime)}}</li>
           <li>Input Inicial: {{ this.activeGame.input }}</li>
           <li>Input Actual: {{ this.activeGame.currentInput }}</li>
           <li>Últimos movs: {{ this.activeGame.movsList.slice(25) }}</li>
           <li>Store Mmovs: {{ this.storeMovs.slice(25) }}</li>
        </ul>
        -->
        <Toast position="center" group="solved-game" @close="this.returnToList()" :style="{ width: '50rem' }">
            <template #message="slotProps">
                <div class="flex flex-column align-items-center text-center w-full gap-2">
                    <div class="flex flex-row gap-8 mb-4">
                        <i v-for="n in 3" :key="n" class="pi pi-trophy" style="font-size: 2rem"></i>
                    </div>
                    <div class="text-3xl font-bold">{{ slotProps.message.summary }}</div>
                    <div class="flex flex-row gap-8 mt-4">
                        <i v-for="n in 3" :key="n" class="pi pi-trophy" style="font-size: 2rem"></i>
                    </div>
                    <div class="text-2xl" style="margin-top: 2em">{{ slotProps.message.detail }}</div>
                </div>
            </template>
        </Toast>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import gameUtils from "../../assets/js/gameUtils.js";


export default defineComponent({
    name: "ActiveGame",
    inject: ['playerStoreQHCube', 'viewStoreQHCube'],
    data() {
        return {
            interval: null,
            gameTime: "",
            activeGame: {
                "id": 0,
                "initialTime": "",
                "endTime": "",
                "totalGameTime": "",
                "movsList": "",
                "input": "",
                "currentInput": "",
                "player": {"respStatus": "", "respMessage": ""}
            },
            movsNumber: 0
        }
    },
    props: {
        showDesc: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        gameUtils() {
            return gameUtils;
        },
        storeMovs() {
            return this.playerStoreQHCube.movsList;
        }
    },
    async mounted() {
        this.activeGame = await gameUtils.getActiveGame();
        this.interval = setInterval(() => {
            this.gameTime = gameUtils.getDiffTime(this.activeGame.totalGameTime);
            this.activeGame.totalGameTime = new Date(this.activeGame.totalGameTime).getTime() + 1000;
        }, 1000);

        window.addEventListener('qhcube:solved-game', this.whenSolvedGame);
    },
    unmounted() {
        window.removeEventListener('qhcube:solved-game', this.whenSolvedGame);
        clearInterval(this.interval);
    },
    methods: {
        refreshGame(game) {
            this.activeGame = game;
        },
        getGameTime() {
            this.started = setInterval(() => {
                this.gameTime = gameUtils.getDiffTime(this.activeGame.totalGameTime);
            }, 10);
        },
        whenSolvedGame(event) {
            clearInterval(this.interval);
            this.gameTime = gameUtils.getDiffTime(event.detail.totalGameTime);
            this.movsNumber = event.detail.numMovs;
            this.$toast.add({
                severity: 'success',
                summary: '¡Enhorabuena!',
                detail: `Has resuelto la partida en ${this.gameTime} con ${this.movsNumber} movimientos.`,
                group: 'solved-game'
            });
        },
        returnToList() {
            this.playerStoreQHCube.setActiveGameMode(0);
            this.playerStoreQHCube.gameId = 0;
            gameUtils.resetPracticeGame();
            this.viewStoreQHCube.setRegisteredPlayerComponent("game-list");
        }
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
    width: 20%;
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
