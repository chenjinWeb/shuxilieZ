<template>
  <div class="content-modal">
    <y-header title="鼠系列" router="-1" :r_title="isToken? '' : '登录'" :r_router="rRouter"></y-header>
    <div class="content">
      <div class="scroll-content scroll_div" style="margin-top: 0.45rem;">

        <div class="list">
          <div class="list_item" v-for="item in productList" :key="item.commodityId" @click="toDetail(item.commodityId)">
            <div class="list_item_img">
              <img :src="item.titleUrl" height='100%' />
            </div>
            <div class="list_item_title">{{item.commodityName}}</div>
            <div class="list_item_money"><span>¥</span>{{item.fee}}</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { wxLogin, mcjCookie } from '../utils'
export default {
  name: '',
  data () {
    return {
      productList: [],
      code: '',
      isToken: true,
      rRouter: '/login'
    }
  },
  computed: {},
  mounted () {
    this.getProductList()
  },
  methods: {
    ...mapActions([
      'getCommodityList_',
      'getOpenId_',
      'getCodeUrl_'
    ]),

    // 获取商品列表
    getProductList () {
      this.getCommodityList_().then(res => {
        this.productList = res.data || [];
      })
    },

    // 跳转
    toDetail (id) {
      this.$router.push({ path: `detail/${id}` })
    },

    // 获取openId
    getOpenId (code) {
      this.getOpenId_({ code }).then(res => {
        if (res.data.openId) {
          mcjCookie.set('openId', res.data.openId, 10)
        }
        if (res.data.token) {
          mcjCookie.set('token', res.data.token, 10)
        }
        this.isToken = res.data.token ? true : false
        this.rRouter = this.isToken ? '' : `/login?openId=${mcjCookie.get('openId')}`
      })
    },

    // 获取URL
    getUrl () {
      this.getCodeUrl_().then(res => {
        wxLogin('wx9fbe5b447cfa72a1', 'http://nptckr.cn/login')
      })
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.path !== '/') {
        return
      }
      let code = vm.$route.query.code;
      if (!code) {
        vm.getUrl();
        return
      }
      vm.getOpenId(code);
    })
  }
}
</script>
<style scope>

  .list{display: flex; flex-wrap: wrap;}
  .list_item{width: 50%; height: 2.0rem; background: #fff; display: flex; flex-direction: column; padding-top: 0.2rem; border-bottom: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5;}
  .list_item:nth-child(even){ border-right: none;}
  .list_item_img{height: 1.0rem; margin: 0 auto;}
  .list_item_money{text-align: left; font-size: 0.14rem; padding-left: 0.1rem; font-weight: bold;}
  .list_item_money span{ display: inline-block; font-weight: bold; transform: scale(0.8)}
  .list_item_title{text-align: left; font-size: 0.14rem; height: 0.4rem;text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical; margin-top: 0.1rem; padding-left: 0.1rem;}
  
</style>
