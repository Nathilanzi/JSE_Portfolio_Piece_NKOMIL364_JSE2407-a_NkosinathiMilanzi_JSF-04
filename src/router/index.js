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
  },
  {
    path: '/loading',
    name: 'LoadingSpinner',
    component: LoadingSpinner,
  },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: Cart,
  // },
  // {
  //   path: '/wishList',
  //   name: 'wishList',
  //   component: WishList,
  // },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
