import { AuthStatus } from '@/modules/auth/interfaces'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()
  console.log(authStore.authStatus)
  authStore.authStatus === AuthStatus.Unauthenticated ? next({ name: 'login' }) : next()
}

export default isAuthenticatedGuard
