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
        component: () => import('../views/Me.vue'),
        children: [
          {
            path: '/me/MyPurchase',
            name: 'MyPurchase',
            component: () => import('../components/Me/MyPurchase.vue')
          },
          {
            path: '/me/MyCreation',
            name: 'MyCreation',
            component: () => import('../components/Me/MyCreation.vue')
          },
          {
            path: '/me/MySales',
            name: 'MySales',
            component: () => import('../components/Me/MySales.vue')
          },
          {
            path: '/me/PublishNFT',
            name: 'PublishNFT',
            component: () => import('../components/Me/PublishNFT.vue')
          },
          {
            path: '/me/ReceiverAddress',
            name: 'ReceiverAddress',
            component: () => import('../components/Me/ReceiverAddress.vue')
          },
        ]
      },
      {
        path: '/NFTMarketplace',
        name: 'NFTMarketplace',
        component: () => import('../views/NFTMarketplace.vue')
      },
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
