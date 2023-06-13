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

    async initRegisteredGame() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        //const viewStoreQHCube = useViewStoreQHCube();

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_API + "/game/init-registered-game",
            data: {email: playerStoreQHCube.email, jwttoken: playerStoreQHCube.jwttoken},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            //console.log("EMPEZANDO JUEGO... " + JSON.stringify(response.data));
            gameType = 1;
            this.resetGame(JSON.parse(response.data.input));

            //viewStoreQHCube.setError(response.data.respStatus, response.data.respMessage, "");
        }).catch((error) => {
            console.log("ERROR AL EMPEZAR JUEGO... " + error.message);
            //viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.", error.message);
        });
    }
}