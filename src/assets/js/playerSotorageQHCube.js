import { defineStore } from 'pinia';

export const usePlayerStoreQHCube = defineStore('playerStoreQHCube', {
    state: () => ({
        email: '',
        nombre: '',
        apellidos: '',
        jwttoken: '',
        gameId: 0,
        movsList: '',
        activeGameMode: 0
    }),
    getters: {
        isAuthenticated: (state) => !!state.jwttoken,
    },
    actions: {
        addMoveToMovsList(move) {
            this.movsList = this.movsList + move;
        },
        getactiveGameModeAsString() {
            switch (this.activeGameMode) {
                case 0:
                    return "Pŕacita";
                case 1:
                    return "Registrado";
                case 2:
                    return "Concurso";
                default:
                    return "MODO NO DEFINIDO";
            }
        },
        setActiveGameMode(mode) {
            this.activeGameMode = mode;
            gameType = mode;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage
            }
        ]
    }
});