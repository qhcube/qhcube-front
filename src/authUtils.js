import { useUserStoreQHCube } from "/userSotorageQHCube.js";

export default {

    logout() {
        const userStoreQHCube = useUserStoreQHCube();
        userStoreQHCube.$reset();
        // axios.defaults.headers.common['Authorization'] = '';
    },

    async login(user) {
        const userStoreQHCube = useUserStoreQHCube();

        userStoreQHCube.nombre = user.nombre;
        userStoreQHCube.apellidos = user.apellidos;
        userStoreQHCube.email = user.email;
        userStoreQHCube.jwttoken = "Este es mi token de autenciación";
        /*
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
        */
    }
}



