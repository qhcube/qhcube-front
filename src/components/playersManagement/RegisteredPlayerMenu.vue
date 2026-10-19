<template>
    <Menubar :model="items"
             class="h-3rem"
             style="font-size: 0.9rem;"/>

    <Toast position="center" group="playerMenu"/>

    <ConfirmDialog
        group="pt"
        :pt="{
            headerTitle: { class: 'text-primary bg-blue-600' }
        }"
    />

</template>

<script>
import {defineComponent} from 'vue'
import Menubar from "primevue/menubar";
import Message from "primevue/message";
import ConfirmDialog from "primevue/confirmdialog";
import gameUtils from "@/assets/js/gameUtils.js";
import authUtils from "@/assets/js/authUtils.js";

export default defineComponent({
    name: "RegisteredPlayerMenu",
    components: {Message, Menubar, ConfirmDialog},
    inject: ['playerStoreQHCube', 'viewStoreQHCube'],
    data() {
        return {
            items: [
                {
                    label: 'Jugador',
                    icon: 'pi pi-user',
                    items: [
                        {
                            label: 'Ver Perfil',
                            icon: 'pi pi-user',
                            command: () => {
                                this.viewStoreQHCube.setPlayerComponent('player-profile');
                            }
                        },
                        {
                            label: 'Cerrar Sesión',
                            icon: 'pi pi-sign-out',
                            command: () => {
                                this.logout();
                            }
                        }
                    ]
                }
            ],
        }
    },

    methods: {
        logout() {
            this.$confirm.require({
                header: "Logging out...",
                message: "¿Realmente quieres salir?",
                icon: "pi pi-info-circle",
                acceptClass: "p-button-danger",
                acceptLabel: "Sí",
                group: "pt",
                accept: async () => {
                    gameUtils.resetPracticeGame();
                    this.$toast.add({severity: 'info', summary: 'Hasta pronto...', group: 'playerMenu', life: 1500});
                    setTimeout(() => {
                        authUtils.logout();
                    }, 1500);
                    this.viewStoreQHCube.setRegisteredPlayerComponent("game-list");
                },
                reject: () => {
                    this.$toast.add({
                        severity: 'info',
                        summary: 'Cancelado. Seguimos jugando...',
                        group: 'playerMenu',
                        life: 1500
                    });
                }
            });
        }
    }
})
</script>

<style scoped>

</style>
