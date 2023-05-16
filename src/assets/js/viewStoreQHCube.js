import { defineStore } from 'pinia';

export const viewStoreQHCube = defineStore('viewStoreQHCube', {
    state: () => ({
        gameInfoComponent: 'brief-game-description',
        userComponent: 'login-and-register'
    }),
    getters: {
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
                storage: sessionStorage
            }
        ]
    }
});