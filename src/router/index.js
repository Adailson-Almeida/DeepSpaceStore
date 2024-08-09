/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes as autoRoutes } from 'vue-router/auto-routes'; // Renomeado para evitar conflito
import formUser from '@/pages/formUser.vue';

// Combine as rotas automáticas e manuais em uma única constante 'routes'
const routes = [
  ...autoRoutes,
  {
    path: '/form-user',
    name: 'formUser',
    component: formUser,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // Use a constante combinada aqui
});

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
