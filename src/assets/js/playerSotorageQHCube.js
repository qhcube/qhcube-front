import { defineStore } from 'pinia';

export const usePlayerStoreQHCube = defineStore('playerStoreQHCube', {
    state: () => ({
        email: '',
        nombre: '',
        apellidos: '',
        jwttoken: '',
        gameId: 0
    }),
    getters: {
        isAuthenticated: (state) => !!state.jwttoken,
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