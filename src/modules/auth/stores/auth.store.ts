import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import bcrypt from 'bcryptjs'

import { AuthStatus } from '@/modules/auth/interfaces'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const authStatus = ref<AuthStatus>(AuthStatus.Unauthenticated)
    const token = ref(useLocalStorage('token', ''))

    const login = async (email: string, password: string) => {
      try {
        const emailPassword = email.concat(password)
        const localToken = bcrypt.hashSync(emailPassword, 10)
        localStorage.setItem('token', localToken)

        authStatus.value = AuthStatus.Authenticated
        token.value = localToken
      } catch (error) {
        console.log(error)
        logout()
        throw error as string
      }
    }

    const logout = () => {
      localStorage.removeItem('token')
      authStatus.value = AuthStatus.Unauthenticated
      token.value = ''
    }

    return {
      authStatus,
      token,

      //* Getters
      isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

      //* Actions
      login,
      logout,
    }
  },
  {
    persist: {
      key: 'authStore',
      storage: window.localStorage,
    },
  },
)
