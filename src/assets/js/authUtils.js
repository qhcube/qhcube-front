import { useUserStoreQHCube } from "@/assets/js/userSotorageQHCube.js";
import axios from "axios";

export default {

    logout() {
        const userStoreQHCube = useUserStoreQHCube();
        userStoreQHCube.$reset();
        // axios.defaults.headers.common['Authorization'] = '';
    },

    /*
    async login(user) {
        const userStore = useUserStore();
        await axios({
            method: "post",
            url: process.env.VUE_APP_FREEAPI + "/authenticate",
            data: user,
            headers: {"Content-Type": "application/json"},
        })
            .then((response) => {
                userStore.email = user.username;
                userStore.jwttoken = response.data.jwttoken;
                userStore.jwtexpiration = response.data.expiration;
        })
            .catch(() => {
                let resp = {
                    status: 'Credenciales NO válidas',
                    message: 'Por favor, vuelva a intentarlo de nuevo.'
                }
                router.push({name: 'error', params: {code: JSON.stringify(resp)}});
        });

        if (userStore.isAuthenticated) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.jwttoken;
            await axios({
                method: "get",
                url: process.env.VUE_APP_API + "/persona/get-by-email/" + userStore.email,
                headers: {"Content-Type": "application/json"}
            })
                .then((response) => {
                    userStore.nombre = response.data.nombre;
                    userStore.apellidos = response.data.apellidos;
                    userStore.rol = response.data.rol;
                    userStore.telefono = response.data.telefono;
            })
                .catch(() => {
                    console.log("AuthUtils.login(user): Error al obtener los datos del usuario");
            });
        }
    }
     */
    async registerNewPlayer(user) {
        const userStoreQHCube = useUserStoreQHCube();

        let resultado = "OK";

        await axios({
            method: "post",
            url: import.meta.env.VITE_APP_FREEAPI + "/player/register",
            data: user,
            headers: {"Content-Type": "application/json"},
        })
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.respStatus === "OK") {
                    userStoreQHCube.nombre = response.data.nombre;
                    userStoreQHCube.apellidos = response.data.apellidos;
                    userStoreQHCube.email = response.data.email;
                    userStoreQHCube.jwttoken = response.data.jwttoken;
                } else {
                    resultado = response.data.respMessage;
                    console.log("AuthUtils.registrar --> Error al registrar el usuario.");
                    console.log("Respuesta del servidor: " + response.data.respMessage);
                }
            })
            .catch((error) => {
                resultado = "Error en la petición/respuesta.";
                console.log("AuthUtils.registrar --> Error al registrar el usuario.");
                console.log("Error en la petición/respuesta: " + error.message);
                }
            );

        return resultado;
    }
}



