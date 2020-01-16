import Vue from 'vue'
import Router from 'vue-router'
import Login from "../pages/login.vue"
import Index from "../pages/index.vue"
import ProductList from "../pages/productList.vue"
import Detail from "../pages/detail.vue"
import Mine from "../pages/mine.vue"
import User from "../pages/user.vue"

Vue.use(Router)

const index = [
  {
    path: '/index',
    name: 'index',
    component: Index
  }
]

const mine = [
  {
    path: "/mine",
    name: 'mine',
    component: Mine,
    children: [

    ]
  }
]

const user = [
  {
    path: "/user",
    name: 'user',
    component: User
  }
]

const routes = [
  {
    path: "*",
    redirect: "/login",
    component: Login
  },
  {
    path: "/",
    redirect: "/login",
    component: Login
  },
  {
    path: "/login",
    name: 'login',
    component: Login
  },
  {
    path: "/detail/:id",
    name: 'detail',
    component: Detail
  },
  {
    path: "/productList",
    name: 'productList',
    component: ProductList
  },
  ...index,
  ...mine,
  ...user
]

export default new Router({
  routes,
  mode: "history"
})
