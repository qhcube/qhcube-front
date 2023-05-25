import { useUserStoreQHCube } from "@/assets/js/userSotorageQHCube.js";
import { useViewStoreQHCube } from "@/assets/js/viewStoreQHCube.js";

import axios from "axios";

export default {

    logout() {
        const userStoreQHCube = useUserStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube()
        userStoreQHCube.$reset();
        viewStoreQHCube.$reset();
        axios.defaults.headers.common['Authorization'] = '';
    },

    async login(user) {

        const userStoreQHCube = useUserStoreQHCube();
        const viewStoreQHCube = useViewStoreQHCube();
        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_FREEAPI + "/login",
            data: user,
            headers: {"Content-Type": "application/json"},
        })
            .then((response) => {
                userStoreQHCube.email = user.email;
                if (response.data.respStatus === "OK") {
                    userStoreQHCube.nombre = response.data.nombre;
                    userStoreQHCube.apellidos = response.data.apellidos;
                    userStoreQHCube.jwttoken = response.data.jwttoken;
                    if (userStoreQHCube.isAuthenticated) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStoreQHCube.jwttoken;
                    }
                } else {
                    viewStoreQHCube.setError(response.data.respStatus, response.data.respMessage);
                }
            })
            .catch((error) => {
                console.log("AuthUtils.login(user): Error al hacer login del usuario.\n--- " + error.message + " ---");
                viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.");
            });
    },

    async emailValidation(email, code) {
        let result = {
            status: "OK",
            message: "Ya puedes iniciar sesión como usuario registrado."
        }

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_FREEAPI + "/emailvalidation",
            data: {email: email, code: code},
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            result.status = response.data.respStatus;
            result.message = response.data.respMessage;
        }).catch((error) => {
            result.status = "ERROR";
            result.message = "Ha habido un problema con servidor.";
            console.log("AuthUtils.emailValidation(email, code): Error en servidor al validar el email.\n--- " + error.message + " ---");
        });

        return result;
    },

    async registerNewPlayer(user) {
        const userStoreQHCube = useUserStoreQHCube();

        let resultado = "OK";

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_FREEAPI + "/register",
            data: user,
            headers: {"Content-Type": "application/json"},
        })
            .then((response) => {
                if (response.data.respStatus === "OK") {
                    userStoreQHCube.nombre = response.data.nombre;
                    userStoreQHCube.apellidos = response.data.apellidos;
                    userStoreQHCube.email = response.data.email;
                    userStoreQHCube.jwttoken = response.data.jwttoken;
                } else {
                    resultado = response.data.respMessage;
                }
            })
            .catch((error) => {
                resultado = "Error en la petición/respuesta.";
                console.log("AuthUtils.registrar(user): Error al registrar el usuario.\n--- " + error.message + " ---");
                viewStoreQHCube.setError("¡ ERROR !", "Ha habido un problema con servidor.");
                }
            );

        return resultado;
    }
}



