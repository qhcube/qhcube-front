import { defineStore } from 'pinia';

export const useUserStoreQHCube = defineStore('userStoreQHCube', {
    state: () => ({
        email: '',
        nombre: '',
        apellidos: '',
        jwttoken: ''
    }),
    getters: {
        isAuthenticated: (state) => !!state.jwttoken,
        getGameInfoComponent: (state) => state.gameInfoComponent,
        getUserComponent: (state) => state.userComponent
    },
    actions: {
        setGameInfoComponent(component) {
            this.gameInfoComponent = component;
        },
        setUserComponent(component) {
            this.userComponent = component;
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