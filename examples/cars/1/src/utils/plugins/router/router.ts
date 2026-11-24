import { createRouter, createWebHistory } from 'vue-router';

import Auth from '@/routes/auth/Auth.vue';
import Car from '@/routes/car/Car.vue';
import History from '@/routes/history/History.vue';
import Home from '@/routes/home/Home.vue';
import Profile from '@/routes/profile/Profile.vue';

import { LOCAL_STORAGE_KEYS, ROUTES } from '../../constants';

export interface RouteMeta {
  requireAuth: boolean;
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: ROUTES.AUTH, name: ROUTES.AUTH, component: Auth, meta: { requireAuth: false } },
    { path: ROUTES.HOME, name: ROUTES.HOME, component: Home, meta: { requireAuth: true } },
    { path: ROUTES.HISTORY, name: ROUTES.HISTORY, component: History, meta: { requireAuth: true } },
    { path: ROUTES.CAR, name: ROUTES.CAR, component: Car, meta: { requireAuth: true } },
    { path: ROUTES.PROFILE, name: ROUTES.PROFILE, component: Profile, meta: { requireAuth: true } }
  ]
});

router.beforeEach(async (to, _, next) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

  if (to.meta.requireAuth && !token?.length) {
    next({ name: ROUTES.AUTH });
    return;
  }
  if (!to.meta.requireAuth && token?.length) {
    next({ name: ROUTES.HOME });
    return;
  }
  next();
});
