import {usePlayerStoreQHCube} from "./playerSotorageQHCube.js";
import axios from "axios";
import {useViewStoreQHCube} from "./viewStoreQHCube.js";

export default {

    resetGame(input) {
        var_coor = input;
        var_mensaje = "Bienvenidos al juego del QHCube";
        pageLoaded();
    },

    resetPracticeGame() {
        this.resetGame([
            [
                [7, -2, 1, 0], [3, 6, 1, 0], [-1, -1, 7, -1], [0, 1, -1, 6]],
            [
                [2, -2, -1, 1], [0, 4, 1, -1], [-1, 1, 1, 3], [0, -1, 3, 4]]
        ]);

    },

    // type: 0 -> init new game, 1 -> load last registered game
    async beginRegisteredGame() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();
        let result = { status: "ERROR", input: "" };

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/init-registered-game",
            data: {email: playerStoreQHCube.email, jwttoken: playerStoreQHCube.jwttoken},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            //console.log("EMPEZANDO JUEGO... " + JSON.stringify(response.data));
            gameType = 1;
            result.status = response.data.player["respStatus"];
            result.input = response.data["input"];
            if (result.status !== "OK 0" && result.status !== "OK 1") {
                viewStoreQHCube.setError(response.data.player["respStatus"], response.data.player["respMessage"], "");
            }
            this.resetGame(JSON.parse(response.data["input"]));
        }).catch((error) => {
            console.log("ERROR AL EMPEZAR JUEGO... " + error.message);
            viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.", error.message);
        });

        return result;
    },

    async getGamesByPlayer() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();

        let result = [];

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/get-games-by-player",
            data: {email: playerStoreQHCube.email, jwttoken: playerStoreQHCube.jwttoken},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            console.log("JUEGOS DEL JUGADOR... " + JSON.stringify(response.data));
            result = response.data;
        }).catch((error) => {
            console.log("ERROR PEDIR LOS JUEGOS DE UN JUGADOR... " + error.message);
            viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.", error.message);
        });

        return result;
    }
}