import { defineStore } from 'pinia';

export const useViewStoreQHCube = defineStore('viewStoreQHCube', {
    state: () => ({
        gameInfoComponent: 'brief-game-description',
        playerComponent: 'login-and-register',
        errorStatus: '',
        errorMessage: '',
        optionalErrorMessage: ''
    }),
    getters: {
        getGameInfoComponent: (state) => state.gameInfoComponent,
        getPlayerComponent: (state) => state.playerComponent,
        getErrorStatus: (state) => state.errorStatus,
        getErrorMessage: (state) => state.errorMessage,
        getOptionalErrorMessage: (state) => state.optionalErrorMessage
    },
    actions: {
        setGameInfoComponent(component) {
            this.gameInfoComponent = component;
        },
        setPlayerComponent(component) {
            this.playerComponent = component;
        },
        setError(errorStatus, errorMessage, optionalErrorMessage) {
            this.errorStatus = errorStatus;
            this.errorMessage = errorMessage;
            this.optionalErrorMessage = optionalErrorMessage;
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