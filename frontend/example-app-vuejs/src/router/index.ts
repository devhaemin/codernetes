import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Views
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import BoardListView from '@/views/BoardListView.vue';
import BoardDetailView from '@/views/BoardDetailView.vue';
import BoardCreateView from '@/views/BoardCreateView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/boards',
      name: 'boards',
      component: BoardListView,
      meta: { requiresAuth: true }
    },
    {
      path: '/boards/create',
      name: 'board-create',
      component: BoardCreateView,
      meta: { requiresAuth: true }
    },
    {
      path: '/boards/:id',
      name: 'board-detail',
      component: BoardDetailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.guest && isAuthenticated) {
    next('/boards');
  } else {
    next();
  }
});

export default router; 