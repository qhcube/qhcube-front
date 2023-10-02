import {usePlayerStoreQHCube} from "./playerSotorageQHCube.js";
import axios from "axios";
import {useViewStoreQHCube} from "./viewStoreQHCube.js";

export default {

    resetGame(input) {
        var_coor = input;
        var_mensaje = "Bienvenidos al juego del QHCube";
        this.setQHCubeLastPosition();
        pageLoaded();
    },

    resetPracticeGame() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        playerStoreQHCube.gameid = 0;
        playerStoreQHCube.movsList = "[4,0.7483314773547882,0.6324555320336759,0.2]";
        gameType = 0;
        this.resetGame([
            [
                [7, -2, 1, 0], [3, 6, 1, 0], [-1, -1, 7, -1], [0, 1, -1, 6]],
            [
                [2, -2, -1, 1], [0, 4, 1, -1], [-1, 1, 1, 3], [0, -1, 3, 4]]
        ]);

    },

    async getActiveGame() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        let result = {};

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/get-game",
            data: {email: playerStoreQHCube.email, games: [{id: playerStoreQHCube.gameId}]},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            result = response.data;
        }).catch((error) => {
            console.log("ERROR in gameUtils.getActiveGame: " + error.message + " - " + error.response.status);
        });

        return result;
    },

    async createNewRegisteredGame() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/create-new",
            data: {email: playerStoreQHCube.email},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            if (response.data.player["respStatus"] === "OK") {
                playerStoreQHCube.gameId = response.data.id;
                playerStoreQHCube.movsList = response.data.movsList;
                this.resetGame(JSON.parse(response.data.input));
            } else {
                viewStoreQHCube.setError(response.data.player["respStatus"], response.data.player["respMessage"], "");
            }

        }).catch((error) => {
            console.log("ERROR in gameUtils.createNewRegisteredGame: " + error.message + " - " + error.response.status);
        });
    },

    async loadRegisteredGame(gameId) {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();

        let result = {};

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/get-game",
            data: {email: playerStoreQHCube.email, games: [{id: gameId}]},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            if (response.data.player["respStatus"] === "OK") {
                playerStoreQHCube.gameId = response.data.id;
                playerStoreQHCube.movsList = response.data.movsList;
                result = response.data;
            } else {
                viewStoreQHCube.setError(response.data.player["respStatus"], response.data.player["respMessage"], "");
            }
        }).catch((error) => {
            console.log("ERROR in gameUtils.createNewRegisteredGame: " + error.message + " - " + error.response.status);
        });

        return result;
    },

    async replayGameFromMovsList(gameId, movsList) {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();

        let result = {};

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/replay-game-from-movs-list",
            data: {id: gameId, movsList: JSON.stringify(movsList), player: {email: playerStoreQHCube.email}},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            if (response.data.player["respStatus"] === "OK") {
                playerStoreQHCube.movsList = movsList;
                result = response.data;
            } else {
                viewStoreQHCube.setError(response.data.player["respStatus"], response.data.player["respMessage"], "");
            }
        }).catch((error) => {
            console.log("ERROR in gameUtils.replayGameFromMovsList: " + error.message + " - " + error.response.status);
        });

        return result;

    },

    async reinitRegisteredGame() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();
        let result = {};

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/reinit-game",
            data: {email: playerStoreQHCube.email, games: [{id: playerStoreQHCube.gameId}]},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            if (response.data.player["respStatus"] === "OK") {
                playerStoreQHCube.movsList = response.data.movsList;
                this.resetGame(JSON.parse(response.data.input));
                result = response.data;
            } else {
                viewStoreQHCube.setError(response.data.player["respStatus"], response.data.player["respMessage"], "");
            }

        }).catch((error) => {
            console.log("ERROR in gameUtils.reinitRegisteredGame: " + error.message + " - " + error.response.status);
        });

        return result;
    },

    getDate(date) {
        const auxDate = new Date(date);
        return ("0" + auxDate.getDate()).slice(-2) + "/"
            + ("0" + (auxDate.getMonth() + 1)).slice(-2) + "/"
            + auxDate.getFullYear();
    },

    getHour(date) {
        const auxDate = new Date(date);
        return ("0" + auxDate.getHours()).slice(-2) + ":"
            + ("0" + auxDate.getMinutes()).slice(-2) + ":"
            + ("0" + auxDate.getSeconds()).slice(-2);
    },

    getDiffTime(totalGameTime) {
        let aux = new Date(totalGameTime).getTime();
        let delta = Math.floor(aux / 1000);
        let days = Math.floor(delta / 86400);
        delta -= days * 86400;
        let hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        let seconds = delta % 60;
        return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    },

    getState(movsList) {
        const lastMove = JSON.parse((movsList.replace(/],\[/g, "]:[").split(":").slice(-1))[0]);
        return lastMove[0] === 5 ? (lastMove[1] === 1 ? "Resuelto" : "Cancelado") : "Abierto";
    },

    async getGamesByPlayer() {
        const playerStoreQHCube = usePlayerStoreQHCube();

        let result = [];

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/get-games-by-player",
            data: {email: playerStoreQHCube.email, jwttoken: playerStoreQHCube.jwttoken},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            response.data.forEach((game) => {
                const state = this.getState(game.movsList);
                result.push({
                    gameId: game.id,
                    initialDate: this.getDate(game.initialTime),
                    initialTime: this.getHour(game.initialTime),
                    endDate: state === "Abierto" ? " - " : this.getDate(game.endTime),
                    endTime: state === "Abierto" ? " - " : this.getHour(game.endTime),
                    diffTime: this.getDiffTime(game.totalGameTime),
                    moves: game.movsList.endsWith('[5,1,1,1]') ? JSON.parse('[' + game.movsList + ']').length -1 : JSON.parse('[' + game.movsList + ']').length,
                    state: state
                });
            });
        }).catch((error) => {
            console.log("ERROR in gameUtils.getGamesByPlayer: " + error.message + " - " + error.response.status);
        });

        return result;
    },

    // String [4, x, y, z] or Array [4, x, y, z]
    setQHCUbePosition(mov) {
        if (typeof mov === "string") {
            mov = JSON.parse(mov);
        }

        var_e3[0] = mov[1];
        var_e3[1] = mov[2];
        var_e3[2] = mov[3];
    },

    setQHCubeLastPosition() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const movs = playerStoreQHCube.movsList.replace(/],\[/g, "]:[").split(":");

        let i = movs.length;
        let encontrado = false
        while (i > 0 && !encontrado) {
            const mov = JSON.parse(movs[i - 1]);
            if (mov[0] === 4) {
                encontrado = true;
                this.setQHCUbePosition(mov);
            }
            i--;
        }
    },

    async deleteGame(gameId) {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();
        let result = { status: "", respMessage: ""};
        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/delete",
            data: { email: playerStoreQHCube.email, games: [{ id: gameId }] },
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            result.status = response.data.player["respStatus"];
            result.respMessage = response.data.player["respMessage"];
            if (result.status !== "OK") {
                viewStoreQHCube.setError(response.data.player["respStatus"], response.data.player["respMessage"], "");
            }
            return result;
        }).catch((error) => {
            console.log("ERROR in gameUtils.deleteGame: " + error.message + " - " + error.response.status);
        });
    }
}