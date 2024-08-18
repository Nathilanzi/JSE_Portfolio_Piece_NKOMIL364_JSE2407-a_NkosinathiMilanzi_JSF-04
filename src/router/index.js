// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import ProductList from '../components/ProductList.vue';
import ProductDetails from '../components/ProductDetails.vue';
import WishList from '../components/WishList.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Cart from '../components/Cart.vue';
import Comparison from '../components/ComparisonPage.vue';

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true
  },
  {
    path: '/loading',
    name: 'LoadingSpinner',
    component: LoadingSpinner,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: '/wishList',
    name: 'wishList',
    component: WishList,
    meta: { requiresAuth: true },
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: Comparison,
    meta: { requiresAuth: true }, 
    // beforeEnter: (to, from, next) => {
    //   const authStore = useAuthStore();
    //   if (authStore.isAuthenticated) {
    //     next();
    //   } else {
    //     next('/login'); // Redirect to login if not authenticated
      }
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
