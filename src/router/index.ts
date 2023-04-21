import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/TheLogin.vue'),
  },
  {
    path: '/direct-message',
    name: 'direct-message',
    component: () => import('@/views/pages/TheDirectMessage.vue'),
  },
  {
    path: '/home',
    redirect: '/people',
    component: () => import('@/views/TheMain.vue'),
    children: [
      {
        path: '/people',
        name: 'people',
        component: () => import('@/views/pages/ThePeople.vue'),
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('@/views/pages/TheChatHeads.vue'),
      },
      {
        path: '/calls',
        name: 'calls',
        component: () => import('@/views/pages/TheCalls.vue'),
      }
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

export default router;