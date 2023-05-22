import { defineStore } from 'pinia';

export const viewStoreQHCube = defineStore('viewStoreQHCube', {
    state: () => ({
        gameInfoComponent: 'brief-game-description',
        userComponent: 'login-and-register',
        errorStatus: '',
        errorMessage: ''
    }),
    getters: {
        getGameInfoComponent: (state) => state.gameInfoComponent,
        getUserComponent: (state) => state.userComponent,
        getErrorStatus: (state) => state.errorStatus,
        getErrorMessage: (state) => state.errorMessage
    },
    actions: {
        setGameInfoComponent(component) {
            this.gameInfoComponent = component;
        },
        setUserComponent(component) {
            this.userComponent = component;
        },
        setError(errorStatus, errorMessage) {
            this.errorStatus = errorStatus;
            this.errorMessage = errorMessage;
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