import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  //  {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import(/* webpackChunkName: "about" */ '../components/layout/layout.vue'),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页"
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/home/index.vue')
      },
      {
        path: "/member",
        name: "member",
        meta: {
          title: "会员管理"
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/member/index.vue'),
      },
      {
        path: "/goods",
        name: "goods",
        meta: {
          title: "商品管理"
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/goods/index.vue'),
      },
      {
        path: "/supplier",
        name: "supplier",
        meta: {
          title: "供应商管理"
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/supplier/index.vue'),
      },
      {
        path: "/staff",
        name: "staff",
        meta: {
          title: "员工功能"
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/staff/index.vue'),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "用户列表"
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/index.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
