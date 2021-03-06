import Vue from 'vue'
import Router from 'vue-router'
import Login from "../pages/login.vue"
import Index from "../pages/index.vue"
import ProductList from "../pages/productList.vue"
import Success from "../pages/success.vue"
import OrderList from "../pages/orderList.vue"
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
    redirect: "/productList",
    component: ProductList
  },
  {
    path: "/",
    redirect: "/productList",
    component: ProductList
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
  {
    path: "/success",
    name: 'success',
    component: Success
  },
  {
    path: "/orderList",
    name: 'orderList',
    component: OrderList
  },
  ...index,
  ...mine,
  ...user
]

export default new Router({
  routes,
  mode: "history"
})
