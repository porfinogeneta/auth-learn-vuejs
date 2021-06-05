import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {middleware: 'auth'}

  },
  {
    path: '/about',
    name: 'About',
    meta: {middleware: 'auth'},
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/globalData',
    name: 'GlobalData',
    component: () => import('../views/GlobalData.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: 'history',
  routes
})

// router.beforeEach((to, _, next) => {
//   if (to.meta.middleware) {
//     const middleware = require(`../middleware/${to.meta.middleware}`);
//     if (middleware) {
//       middleware.default(to, next, store);
//     }else {
//       next()
//     }
//   }else {
//     next();
//   }
// })

export default router
