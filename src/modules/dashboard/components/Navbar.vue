<template>
  <nav class="flex justify-between absolute text-white w-full py-2 px-5">
    <h1 class="font-bold text-blue-500 relative text-5xl">
      MESSAGE <span class="text-white">FACEBOOK</span>
      <span class="text-xs ml-2 p-2 absolute border border-indigo-500 text-indigo-500 rounded-lg"
        >FRONTEND</span
      >
    </h1>

    <ul class="flex gap-3 justify-center items-center">
      <li class="hover:text-red-500 hover:cursor-pointer">
        <RouterLink to="/dashboard/home" >Simple Template</RouterLink>
      </li>
      <li class="hover:text-red-500 hover:cursor-pointer">
        <RouterLink to="/dashboard/coupon-template" >Cupon Template</RouterLink>
      </li>
    </ul>

    <button
      type="button"
      class="border border-red-500 text-red-500 p-2 rounded-sm hover:bg-red-500 hover:text-white"
      @click="logoutBtn"
    >
      Cerrar Sesión
    </button>
  </nav>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { useRouter, RouterView } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()

const logoutBtn = async () => {
  authStore.logout()

  router.replace('/auth')
}
</script>
