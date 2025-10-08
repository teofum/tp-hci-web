import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import ProfileLayout from '../layouts/ProfileLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      component: ProfileLayout,
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('../views/profile/ProfileView.vue'),
        },
        {
          path: 'change-password',
          name: 'change-password',
          component: () => import('../views/profile/ChangePasswordView.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'signin',
          name: 'signin',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'verify',
          name: 'verify',
          component: () => import('../views/auth/VerifyAccountView.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');
  const isAuthRoute = to.path.startsWith('/auth');

  if (isAuthRoute && token) {
    next('/');
  } else if (!isAuthRoute && !token) {
    next('/auth/signin');
  } else {
    next();
  }
});

export default router;
