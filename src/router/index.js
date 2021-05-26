import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass:'active',
  base: process.env.BASE_URL,
  routes
})

export default router
