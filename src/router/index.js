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
      },
      {
        path: '/cats',
        name: 'Cats',
        component: () => import('../views/Cats.vue')
      },
      {
        path: '/me',
        name: 'Me',
        component: () => import('../views/Me.vue')
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
