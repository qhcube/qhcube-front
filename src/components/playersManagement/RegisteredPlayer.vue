<template>
    <div class="flex flex-column bg-indigo-50 shadow-6"
         :class="this.getShowDesc"
         style="min-width: 895px">
        <div class="flex flex-row flex-nowrap three pl-2 h-4rem" style="height: 75px">
            <div class="flex flex-row gap-6 align-items-center flex-grow-1">
                <h1 class="flex">Usuario:&nbsp;<span class="text-lg"> {{ this.getUserNameForTitle() }} </span></h1>
                <h4 class="flex font-light" style="padding-bottom: 12px">
                    (Modo <span class="ml-1 font-semibold">{{
                        this.playerStoreQHCube.getactiveGameModeAsString()
                    }}</span>)
                </h4>
            </div>

            <div class="flex flex-row-reverse align-items-center gap-6 pr-6 z-2 ml-4">
                <registered-player-menu/>

                <div class="flex flex-nowrap gap-2 self">
                    <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'game-list'"
                            label="Reiniciar Práctica"
                            @click="this.initPractice()"
                            size="small"
                            severity="success"
                            class="button"
                    />
                    <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'game-list'"
                            label="Nuevo Juego Registrado"
                            @click="this.createNewRegisteredGame()"
                            size="small"
                            severity="success"
                            class="button"
                    />
                    <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'active-game'"
                            label="Reiniciar Juego Actual"
                            @click="this.reinitRegisteredGame()"
                            size="small"
                            severity="warning"
                            class="button"
                    />
                    <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'active-game'"
                            label="Salir y Guardar"
                            @click="this.cancelGame()"
                            size="small"
                            severity="warning"
                            class="button"
                    />
                    <span v-if="this.viewStoreQHCube.registeredPlayerComponent === 'replay-game'"
                          v-tooltip.top="this.solvedGame ? 'Partida resuelta: no se puede continuar.' : null">
                        <Button :disabled="this.solvedGame"
                                label="Continuar desde aquí"
                                @click="this.continueFromReplay()"
                                size="small"
                                severity="warning"
                                class="button"
                        />
                    </span>
                    <Button v-if="this.viewStoreQHCube.registeredPlayerComponent === 'replay-game'"
                            label="Salir de Reproducción"
                            @click="this.exitReplay()"
                            size="small"
                            severity="warning"
                            class="button"
                    />
                </div>
            </div>
        </div>

        <Toast position="center" group="luck"/>

        <div class="flex z-1">
            <registered-player-layout>
                <component ref="activeComponent" :is="this.viewStoreQHCube.getRegisteredPlayerComponent"
                           :showDesc="this.showDesc"/>
            </registered-player-layout>
        </div>

    </div>
</template>

<script>

import RegisteredPlayerMenu from "./RegisteredPlayerMenu.vue";
import gameUtils from "../../assets/js/gameUtils.js";
import GameList from "../Games/GameList.vue";
import PlayerLayout from "../layouts/PlayerLayout.vue";
import RegisteredPlayerLayout from "../layouts/RegisteredPlayerLayout.vue";
import ActiveGame from "../Games/ActiveGame.vue";
import ReplayGame from "../Games/ReplayGame.vue";

export default {
    name: "RegisteredPlayer",
    components: {RegisteredPlayerLayout, PlayerLayout, GameList, RegisteredPlayerMenu, ActiveGame, ReplayGame},
    inject: ['playerStoreQHCube', 'viewStoreQHCube'],
    data() {
        return {
            heightClass: 'h-20rem'
        }
    },
    props: {
        showDesc: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        getShowDesc() {
            this.showDesc ? this.heightClass = 'h-20rem' : this.heightClass = 'h-30rem';
            return this.showDesc;
        },

        solvedGame() {
            return (this.playerStoreQHCube.movsList || '').endsWith('[5,1,1,1]');
        }
    },

    mounted() {
        if (this.playerStoreQHCube.gameId !== 0) {
            switch (this.playerStoreQHCube.activeGameMode) {
                case 1:
                    this.viewStoreQHCube.setRegisteredPlayerComponent("active-game");
                    break;
                case 3:
                    this.viewStoreQHCube.setRegisteredPlayerComponent("replay-game");
                    break;
                default:
                    this.playerStoreQHCube.setActiveGameMode(0);
                    this.viewStoreQHCube.setRegisteredPlayerComponent("game-list");
            }
        }
    },

    methods: {
        getUserNameForTitle() {
            let name = this.playerStoreQHCube.nombre + " " + this.playerStoreQHCube.apellidos;
            if (name.length > 15) {
                name = name.substring(0, 15) + "...";
            }
            return name;
        },

        async continueGame() {
            const movs = (JSON.parse('[' + this.playerStoreQHCube.movsList + ']')).slice(0, this.playerStoreQHCube.lastMoveReplayed);

            const result = await gameUtils.replayGameFromMovsList(this.playerStoreQHCube.gameId, movs);

            if (!result.player) {
                return;
            }

            this.playerStoreQHCube.setActiveGameMode(1);
            this.viewStoreQHCube.setRegisteredPlayerComponent("active-game");

            this.$toast.add({
                severity: 'info',
                summary: 'Continuando partida...',
                life: 1500,
                group: 'luck',
            });
        },

        continueFromReplay() {
            const totalMovs = JSON.parse('[' + this.playerStoreQHCube.movsList + ']').length;
            if (this.playerStoreQHCube.lastMoveReplayed === totalMovs) {
                this.continueGame();
            } else {

                this.$confirm.require({
                    header: "Continuar desde aquí...",
                    message: "¿Realmente quieres borrar los movimientos siguientes a este?",
                    icon: "pi pi-info-circle",
                    acceptClass: "p-button-danger",
                    acceptLabel: "Sí",
                    accept: () => {
                        this.continueGame();
                    },
                });
            }
        },

        async initPractice() {
            this.playerStoreQHCube.setActiveGameMode(0);
            this.playerStoreQHCube.gameId = 0;
            gameUtils.resetPracticeGame();
            this.viewStoreQHCube.setRegisteredPlayerComponent("game-list");
        },

        async createNewRegisteredGame() {
            await gameUtils.createNewRegisteredGame();
            if (this.viewStoreQHCube.errorStatus === "") {
                this.playerStoreQHCube.setActiveGameMode(1);
                this.$toast.add({
                    severity: 'info',
                    summary: 'Juego nuevo comenzado...',
                    detail: '¡Buena suerte!',
                    life: 1500,
                    group: 'luck',
                });
                this.viewStoreQHCube.setRegisteredPlayerComponent("active-game");
            }
        },

        cancelGame() {
            this.$confirm.require({
                header: "Cancelar juego actual...",
                message: "¿Realmente quieres salir y volver a la práctica?",
                icon: "pi pi-info-circle",
                acceptClass: "p-button-danger",
                acceptLabel: "Sí",
                accept: () => {
                    this.initPractice();
                },
                reject: () => {
                }
            });
        },

        exitReplay() {
            this.$toast.add({
                severity: 'info',
                summary: 'Saliendo de reproducción...',
                life: 1500,
                group: 'luck',
            });

            this.initPractice();
        },

        reinitRegisteredGame() {
            this.$confirm.require({
                header: "Reiniciar juego actual...",
                message: "¿Realmente quieres reiniciar el juego actual?",
                icon: "pi pi-info-circle",
                acceptClass: "p-button-danger",
                acceptLabel: "Sí",
                accept: async () => {
                    const game = await gameUtils.reinitRegisteredGame();
                    this.$toast.add({
                        severity: 'info',
                        summary: 'Juego reiniciado...',
                        detail: '¡Buena suerte!',
                        life: 1500,
                        group: 'luck',
                    });
                    this.$refs.activeComponent.refreshGame(game);
                },
                reject: () => {
                    this.$toast.add({
                        severity: 'info',
                        summary: 'Juego no reiniciado...',
                        detail: '¡Buena suerte!',
                        life: 1500,
                        group: 'luck',
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
.button {
    height: 40px;
    width: 120px;
}

.button:focus {
    box-shadow: none !important;
}

</style>
