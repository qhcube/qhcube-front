<template>
   <div class="flex flex-column bg-indigo-50 shadow-6">
       <label for="email" class="block text-900 font-medium mb-2 mt-2">eMail</label>
       <InputText id="email" placeholder="eMail" v-model="this.user.email" type="email"/>

       <label for="name" class="block text-900 font-medium mb-2 mt-4">Nombre</label>
       <InputText id="name" placeholder="Nombre" v-model="this.user.name" type="text"/>

       <label for="surname" class="block text-900 font-medium mb-2 mt-4">Apellidos</label>
       <InputText id="surname" placeholder="Apellidos" v-model="this.user.surname" type="text"/>

       <label for="password" class="block text-900 font-medium mb-2 mt-4">Password</label>
       <InputText id="password" type="password" class="w-full mb-3" />

       <label for="passwordConfirm" class="block text-900 font-medium mb-2 mt-4">Password</label>
       <InputText id="passwordConfirm" type="password" class="w-full mb-3" />

       <Button label="Cancelar" @click="$emit('closeRegistroNuevo')"/>

   </div>
</template>

<script>
export default {
    name: "RegistroNuevo",
    emits: ['closeRegistroNuevo'],
    data() {
        return {
            user: {
                email: "",
                name: "",
                surname: "",
                password: ""
            },
        }
    },
}
</script>

<style scoped>

</style>