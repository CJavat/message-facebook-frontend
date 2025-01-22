<template>
  <div class="w-[450px] rounded">
    <h1 class="text-center text-4xl">Iniciar Sesión</h1>

    <form action="" class="flex flex-col" autocomplete="off" @submit.prevent="onSubmit">
      <label for="email" class="text-zinc-200 mt-5 mb-2">Email</label>
      <input
        v-model="myform.email"
        id="email"
        name="email"
        type="email"
        class="border-none focus:outline-none focus:placeholder:text-white bg-transparent text-red-500 focus:text-red-400"
        autofocus
        placeholder="Escribe un correo"
        required
      />

      <label for="password" class="text-zinc-200 mt-5 mb-2">Password</label>
      <div class="relative">
        <input
          v-model="myform.password"
          id="password"
          name="password"
          :type="changeEyeValue ? 'password' : 'text'"
          class="border-none focus:outline-none focus:placeholder:text-white bg-transparent text-red-500 focus:text-red-400 w-full"
          placeholder="Escribe una contraseña"
          required
        />

        <button type="button" @click.prevent="changeEye" class="absolute right-0">
          <i v-if="changeEyeValue" class="fa-regular fa-eye"></i>
          <i v-else class="fa-regular fa-eye-slash"></i>
        </button>
      </div>

      <button type="submit" class="bg-red-500 hover:bg-red-600 mt-5 p-2 uppercase">Ingresar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import Swal from 'sweetalert2'

import { useAuthStore } from '../stores/auth.store'
import { useRouter } from 'vue-router'

const user = import.meta.env.VITE_USER
const password = import.meta.env.VITE_PASSWORD
const router = useRouter()
const authStore = useAuthStore()

const changeEyeValue = ref<boolean>(false)
const myform = reactive({
  email: '',
  password: '',
})

onMounted(() => {
  changeEyeValue.value = true
})

const changeEye = () => {
  changeEyeValue.value = !changeEyeValue.value
}

const onSubmit = async () => {
  try {
    if (myform.email !== user) return Swal.fire('Error', 'Email incorrecto', 'error')
    if (myform.password !== password) return Swal.fire('Error', 'Password incorrecto', 'error')
    await authStore.login(myform.email, myform.password)

    router.replace('/')
  } catch (error) {
    console.log('Ocurrió un error al ingresar', error)
    Swal.fire('Error', 'Ocurrió un error al iniciar sesión', 'error')
  }
}
</script>
