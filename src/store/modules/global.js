/**
 * Created by admin on 2018/3/28.
 */

import {
  bycourse,
  commitData, courselist, getmycourse, getorders, getshareinfo,
  getWordsTest, listInfo, projectlist, userinfo,
  getVerificationCode,
  login,
  createOrder,
  orderClose,
  orderPay,
  queryOrderStatus,
  queryUserOrderInfo,
  getOpenId,
  getCommodityList,
  getCommodityDetail,
  getCodeUrl
} from "../server/global-server"

const state = {

}

const getters = {

}

const actions = {
  async getWordsTest_ ({ commit, state }, body = {}) {
    return await getWordsTest(body)
  },

  async commitData_ ({ commit, state }, body) {
    return await commitData(body)
  },

  async projectlist_ ({ commit, state }, body) {
    return await projectlist(body)
  },

  async getorders_ ({ commit, state }, body) {
    return await getorders(body)
  },

  async courselist_ ({ commit, state }, body) {
    return await courselist(body)
  },

  async listInfo_ ({ commit, state }, body) {
    return await listInfo(body)
  },

  async bycourse_ ({ commit, state }, body) {
    return await bycourse(body)
  },

  async userinfo_ ({ commit, state }, body) {
    return await userinfo(body)
  },

  async getmycourse_ ({ commit, state }, body) {
    return await getmycourse(body)
  },

  async getshareinfo_ ({ commit, state }, body) {
    return await getshareinfo(body)
  },

  // 鼠系列
  // 验证码
  async getVerificationCode_ ({ commit, state }, body) {
    return await getVerificationCode(body)
  },

  // 登录
  async login_ ({ commit, state }, body) {
    return await login(body)
  },

  // 创建订单
  async createOrder_ ({ commit, state }, body) {
    return await createOrder(body)
  },

  // 关闭订单
  async orderClose_ ({ commit, state }, body) {
    return await orderClose(body)
  },

  // 订单支付
  async orderPay_ ({ commit, state }, body) {
    return await orderPay(body)
  },

  // 查询订单状态
  async queryOrderStatus_ ({ commit, state }, body) {
    return await queryOrderStatus(body)
  },

  // 查询订单信息
  async queryUserOrderInfo_ ({ commit, state }, body) {
    return await queryUserOrderInfo(body)
  },

  // 获取openId
  async getOpenId_ ({ commit, state }, body) {
    return await getOpenId(body)
  },

  // 获取url
  async getCodeUrl_ ({ commit, state }, body) {
    return await getCodeUrl(body)
  },

  // 获取商品列表
  async getCommodityList_ ({ commit, state }, body) {
    return await getCommodityList(body)
  },

  // 获取商品列表
  async getCommodityDetail_ ({ commit, state }, body) {
    return await getCommodityDetail(body)
  },



}


const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}









