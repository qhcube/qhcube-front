import { defineStore } from 'pinia';

export const usePlayerStoreQHCube = defineStore('playerStoreQHCube', {
    state: () => ({
        email: '',
        nombre: '',
        apellidos: '',
        jwttoken: ''
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