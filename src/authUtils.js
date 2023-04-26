import {useUserStore} from "/userSotorage.js";

export default {

    logout() {
        const userStore = useUserStore();
        userStore.$reset();
        // axios.defaults.headers.common['Authorization'] = '';
    },

    async login(user) {
        const userStore = useUserStore();

        userStore.nombre = user.nombre;
        userStore.apellidos = user.apellidos;
        userStore.email = user.email;
        userStore.jwttoken = "Este es mi token de autenciación";
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



