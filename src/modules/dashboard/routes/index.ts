import type { RouteRecordRaw } from 'vue-router'
import isAuthenticatedGuard from '../guards/is-authenticated.guard'

export const dashboardRoutes: RouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  beforeEnter: [isAuthenticatedGuard],
  redirect: { name: 'home' },
  component: () => import('@/modules/dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: 'home',
      name: 'home',
      component: () => import('@/modules/dashboard/views/Home.vue'),
    },
    {
      path: 'coupon-template',
      name: 'couponTemplate',
      component: () => import('@/modules/dashboard/views/CouponTemplate.vue'),
    },
  ],
}
