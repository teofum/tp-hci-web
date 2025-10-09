import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from '../layouts/AuthLayout.vue';
import ProfileLayout from '../layouts/ProfileLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/lists/ShoppingListsView.vue'),
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
      path: '/products',
      children: [
        {
          path: '',
          name: 'products-list',
          component: () => import('../views/products/ProductListView.vue'),
        },
      ],
    },
    {
      path: '/products',
      children: [
        {
          path: '',
          name: 'products-list',
          component: () => import('../views/products/ProductListView.vue'),
        },
      ],
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
        {
          path: 'reset-password',
          name: 'reset-password',
          component: () => import('../views/auth/ResetPasswordView.vue'),
        },
      ],
    },
    {
      path: '/list/:id',
      name: 'list-detail',
      component: () => import('../views/list/ListDetailView.vue'),
    },
    {
      path: '/lists',
      name: 'lists',
      component: () => import('../views/lists/ShoppingListsView.vue'),
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
