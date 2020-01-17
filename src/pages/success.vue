<template>
  <div class="content-modal">
    <y-header title="支付结果" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content scroll_div" style="margin-top: 0.45rem; background: #fff;">
        <div v-if="!src">
          <div style="padding-top: 1.0rem;"><img src="../assets/img/success_bg.jpg" style="width: 1.8rem; height: 1.8rem;" /></div>
          <div style="width: 100%; font-size: 0.2rem; font-weight: bolder;margin-top: 0.2rem;">{{status == 'REFUSE'? '支付中' : '支付成功'}}</div>
          <div style="width: 100%; font-size: 0.14rem; margin-top: 0.2rem; color: #484848; margin-bottom: 0.5rem;">{{times}}s后跳至订单列表页</div>
          <div
            style="width: 1.2rem; height: 0.4rem; border-radius:0.2rem; line-height: 0.4rem; margin: 0 auto; background: #5e5bb4; color: #fff; font-size: 0.16rem;"
            @click="toPage()">查看订单
          </div>
        </div>
        <div v-if="src">
          <div style="padding-top: 1.0rem;"><img :src="imgSrc" style="width: 1.8rem; height: 1.8rem;" /></div>
          <div style="width: 100%; font-size: 0.2rem; font-weight: bolder;margin-top: 0.2rem; margin-bottom: 0.5rem;">扫一扫，微信支付</div>
          <div
            style="width: 1.2rem; height: 0.4rem; border-radius:0.2rem; line-height: 0.4rem; margin: 0 auto; background: #5e5bb4; color: #fff; font-size: 0.16rem;"
            @click="toPage()">查看订单
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { isApp } from '../utils'
import { mapActions } from "vuex"
export default {
  data () {
    return {
      times: 30,
      timer: null,
      statusTimer: null,
      src: '',
      orderId: '',
      imgSrc: '',
      status: ''
    }
  },
  computed: {},
  mounted () {
    console.info(isApp())
    this.src = this.$route.query.url
    this.orderId = this.$route.query.orderId
    if (this.src) {
      QRCode.toDataURL(this.src, {}, (err, url) => {
        if (err) throw err
        this.imgSrc = url;
      })
    }
    if (isApp()) {
      this.goToPage();
      clearInterval(this.statusTimer)
      this.statusTimer = setInterval(() => {
        this.getOrderStatus()
      }, 3000)
    }
  },
  methods: {
    ...mapActions([
      'queryOrderStatus_'
    ]),
    goToPage () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.times--
        if (this.times == 0) {
          this.$router.push({ name: 'orderList' });
        }
      }, 1000)
    },
    toPage () {
      this.$router.push({ name: 'orderList' });
      clearInterval(this.timer)
    },
    getOrderStatus () {
      this.queryOrderStatus_({
        orderId: this.orderId
      }).then(res => {
        this.status = res.data
      })
    },
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    clearInterval(this.statusTimer)
    next()
  }
}
</script>
