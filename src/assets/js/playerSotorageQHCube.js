import { defineStore } from 'pinia';

export const usePlayerStoreQHCube = defineStore('playerStoreQHCube', {
    state: () => ({
        email: '',
        nombre: '',
        apellidos: '',
        jwttoken: '',
        gameId: 0,
        movsList: '',
    }),
    getters: {
        isAuthenticated: (state) => !!state.jwttoken,
    },
    actions: {
        addMoveToMovsList(move) {
            this.movsList = this.movsList + move;
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