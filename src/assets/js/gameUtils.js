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

        this.resetGame([
            [
                [7, -2, 1, 0], [3, 6, 1, 0], [-1, -1, 7, -1], [0, 1, -1, 6]],
            [
                [2, -2, -1, 1], [0, 4, 1, -1], [-1, 1, 1, 3], [0, -1, 3, 4]]
        ]);

    },

    async beginRegisteredGame() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();
        let result = { status: "ERROR", input: "", movsList: "", gameId: 0 };

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/init-registered-game",
            data: {email: playerStoreQHCube.email, jwttoken: playerStoreQHCube.jwttoken},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            result.status = response.data.player["respStatus"];
            result.input = response.data["input"];
            result.gameId = response.data["id"];
            result.movsList = response.data["movsList"];
            if (result.status !== "OK 0" && result.status !== "OK 1") {
                viewStoreQHCube.setError(response.data.player["respStatus"], response.data.player["respMessage"], "");
            }
        }).catch((error) => {
            viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.", error.message);
        });

        return result;
    },

    async forceInitRegisteredGame() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();
        let result = { status: "ERROR", input: "", movsList: "", gameId: 0 };
        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/init-registered-game-forced",
            data: { email: playerStoreQHCube.email,
                    jwttoken: playerStoreQHCube.jwttoken,
                    games: [
                        {
                            id: 56, player: {
                                id: 83
                            }
                        }
                    ]
            },
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            result.status = response.data.player["respStatus"];
            result.input = response.data["input"];
            result.gameId = response.data["id"];
            result.movsList = response.data["movsList"];
            result.input = response.data["input"];
            if (result.status !== "OK 0" && result.status !== "OK 1") {
                viewStoreQHCube.setError(response.data.player["respStatus"], response.data.player["respMessage"], "");
            }
        }).catch((error) => {
            console.log("ERROR AL FORZAR PARTIDA NUEVA..." + error.message);
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
            result = response.data;
        }).catch((error) => {
            console.log("ERROR PEDIR LOS JUEGOS DE UN JUGADOR... " + error.message);
            viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.", error.message);
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

        console.log("MOVSLIST: " + playerStoreQHCube.movsList);
    }
}