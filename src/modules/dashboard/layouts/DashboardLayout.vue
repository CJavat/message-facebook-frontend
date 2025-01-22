<template>
  <Navbar />

  <main
    class="min-h-screen w-full bg-zinc-950 text-white flex flex-col justify-center items-center"
  >
    <RouterView />
  </main>
</template>

<script lang="ts" setup>
import Navbar from '../components/Navbar.vue'
</script>
