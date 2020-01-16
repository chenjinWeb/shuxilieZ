<template>
  <div class="content-modal">
    <y-header title="我的订单" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content scroll_div" style="margin-top: 0.45rem; background: #6161b9;">

        <div class="order_list">

            <div class="order_list_title">鼠系列</div>

            <div class="list_info">
                <div class="info_left">订单号:</div>
                <div class="info_right">123132132131</div>
            </div>

            <div class="list_info">
                <div class="info_left">交易时间:</div>
                <div class="info_right">2020-01-09 12:15:30</div>
            </div>

            <div class="list_info">
                <div class="info_left">交易状态:</div>
                <div class="info_right">成功</div>
            </div>
            <div style="width: 90%; margin: 0 auto; background: #ffbe9e; height: 0.3rem; border-radius: 0.2rem; line-height: 0.3rem; font-size: 0.14rem;">http://wwww.baidu.com</div>
            <div style="width: 90%; margin: 0 auto; height: 0.2rem; line-height: 0.2rem; margin-top: 0.05rem;">点击链接领取</div>
        </div>
     
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  data () {
    return {
      orderList:[]
    }
  },
  computed: {},
  mounted () {
    this.getUserOrder();
  },
  methods: {
    ...mapActions([
        'queryUserOrderInfo_'
    ]),

    getUserOrder(){
        this.queryUserOrderInfo_({userId:''}).then(res=>{
            this.orderList = res.data || [];
        })
    }

  }
    
}
</script>

<style scoped>
    .order_list{width: 90%; margin: 0 auto; height: 2.1rem; background: #fff; border-radius: 0.15rem; overflow: hidden; margin-bottom: 0.2rem;}
    .order_list_title{height: 0.3rem; background: #fff8ee; width: 100%; padding:0 0.1rem; text-align: left; line-height: 0.3rem; font-size: 0.16rem;}
    .list_info{height: 0.4rem; width: 100%; padding:0 0.1rem; line-height: 0.4rem; display: flex;justify-content: space-between;}
    .info_left{color: #696969;}
    .info_right{ font-size: 0.14rem; color: #333333; font-weight: bold;}
</style>
