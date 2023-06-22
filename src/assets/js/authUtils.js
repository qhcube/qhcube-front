import {usePlayerStoreQHCube} from "./playerSotorageQHCube.js";
import { useViewStoreQHCube } from "./viewStoreQHCube.js";
import axios from "axios";


export default {

    logout() {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube()
        playerStoreQHCube.$reset();
        viewStoreQHCube.$reset();
        axios.defaults.headers.common['Authorization'] = '';
    },

    async login(player) {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();
        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_FREEAPI + "/login",
            data: player,
            headers: {"Content-Type": "application/json"},
        })
            .then((response) => {
                playerStoreQHCube.email = player.email;
                if (response.data["respStatus"] === "OK") {
                    playerStoreQHCube.nombre = response.data.nombre;
                    playerStoreQHCube.apellidos = response.data.apellidos;
                    playerStoreQHCube.jwttoken = response.data.jwttoken;
                    if (playerStoreQHCube.isAuthenticated) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + playerStoreQHCube.jwttoken;
                    }
                } else if (response.data["respMessage"] === "Usuario no activado.") {
                    viewStoreQHCube.setError(response.data["respStatus"], response.data["respMessage"], "");
                } else {
                    playerStoreQHCube.$reset();
                    viewStoreQHCube.setError(response.data["respStatus"], response.data["respMessage"], "");
                }
            })
            .catch((error) => {
                viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.", error.message);
            });
    },

    async emailValidation(email, code) {
        let result = {
            status: "OK",
            message: "Ya puedes iniciar sesión como usuario registrado.",
            optionalMessage: ""
        }

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_FREEAPI + "/emailvalidation",
            data: {email: email, code: code},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            result.status = response.data["respStatus"];
            result.message = response.data["respMessage"];
        }).catch((error) => {
            result.status = "ERROR";
            result.message = "Ha habido un problema con servidor.";
            result.optionalMessage = error.message;
            console.log("AuthUtils.emailValidation(email, code): Error en servidor al validar el email.\n--- " + error.message + " ---");
        });

        return result;
    },

    async resendValidationEmail(email) {
        let result = {
            status: "OK",
            message: "Ya se ha reenviado el correo electrónico.",
            optionalMessage: ""
        }

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_FREEAPI + "/resend-email",
            data: {email: email},
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            result.status = response.data["respStatus"];
            result.message = response.data["respMessage"];

        }).catch((error) => {
            result.status = "ERROR";
            result.message = "Ha habido un problema con servidor.";
            result.optionalMessage = error.message;
            console.log("AuthUtils.resendValidationEmail(email): Error en servidor al validar el email.\n--- " + error.message + " ---");
        });

        return result;
    },

    async registerNewPlayer(player) {
        const playerStoreQHCube = usePlayerStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();

        let resultado = "OK";

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_FREEAPI + "/register",
            data: player,
            headers: {"Content-Type": "application/json"},
        })
            .then((response) => {
                if (response.data["respStatus"] === "OK") {
                    playerStoreQHCube.nombre = response.data.nombre;
                    playerStoreQHCube.apellidos = response.data.apellidos;
                    playerStoreQHCube.email = response.data.email;
                    playerStoreQHCube.jwttoken = response.data.jwttoken;
                } else {
                    viewStoreQHCube.setError(response.data["respStatus"], response.data["respMessage"], "");
                    resultado = response.data["respMessage"];
                }
            })
            .catch((error) => {
                resultado = "Error en la petición/respuesta.";
                viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.", error.message);
            });

        return resultado;
    }
}



