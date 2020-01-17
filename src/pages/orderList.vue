<template>
  <div class="content-modal">
    <y-header title="我的订单" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content scroll_div" style="margin-top: 0.45rem; background: #6161b9;">

        <div class="order_list" v-for="item in orderList" :key="item.commodityId">

          <div class="list_info">
            <div class="info_left" style=" font-size: 0.16rem;">{{item.commodityName}}</div>
            <div class="info_right_btn" v-if="item.status == '待支付'" @click="closeOrder(item.orderId)">关闭</div>
          </div>

          <div class="list_info">
            <div class="info_left">订单号:</div>
            <div class="info_right">{{item.orderId}}</div>
          </div>

          <div class="list_info">
            <div class="info_left">交易时间:</div>
            <div class="info_right">{{item.createTime}}</div>
          </div>

          <div class="list_info">
            <div class="info_left">交易状态:</div>
            <div class="info_right" :style="{color: item.status == '待支付'? 'red' : 'green'}">{{item.status}}</div>
          </div>
          <div v-if="item.status == '待支付'"
            style="width: 90%; margin: 0 auto; background: #ffbe9e; height: 0.3rem; border-radius: 0.2rem; line-height: 0.3rem; font-size: 0.14rem;"
            @click="pay(item)">
            立即支付
          </div>
          <div v-if="item.status != '待支付'"
            style="width: 90%; margin: 0 auto; background: #ffbe9e; height: 0.3rem; border-radius: 0.2rem; line-height: 0.3rem; font-size: 0.14rem;"
            @click="getLink(item.orderId)">
            http://wwww.baidu.com
          </div>
          <div v-if="item.status != '待支付'" style="width: 90%; margin: 0 auto; height: 0.2rem; line-height: 0.2rem; margin-top: 0.05rem;">点击链接领取</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { Dialog, Toast } from 'vant'
import { mcjCookie, isWeiXin, isApp, getUserIP } from '../utils'
import * as copy from 'copy-to-clipboard';
export default {
  data () {
    return {
      orderList: []
    }
  },
  computed: {},
  mounted () {
    this.getUserOrder();
  },
  methods: {
    ...mapActions([
      'queryUserOrderInfo_',
      'orderImmediately_',
      'createOrder_',
      'orderClose_'
    ]),

    getUserOrder () {
      this.queryUserOrderInfo_({ userId: '' }).then(res => {
        this.orderList = res.data || [];
      })
    },

    // 立即领取
    getLink (orderId) {
      this.orderImmediately_({
        orderId: "2020011418182425941686302"
      }).then(res => {
        Dialog.confirm({
          title: '标题',
          message: '',
          cancelButtonText: '领取',
          confirmButtonText: '复制赠送'
        }).then(() => {
          copy(res.data)
          Toast('复制连接成功')
        }).catch(() => {
          window.location.href = res.data;
          Dialog.close()
        });
      })
    },

    // 关闭订单
    closeOrder (orderId) {
      this.orderClose_({ orderId }).then(res => {
        Toast('关闭订单成功!')
        this.getUserOrder();
      })
    },

    // 微信支付
    pay (info) {
      if (info.fee <= 0) {
        Toast('支付金额不能小于0元!')
        return
      }
      this.createOrder_({
        commodityId: info.commodityId,
        fee: info.fee,
        openId: mcjCookie.get('openId'),
        payType: isWeiXin() ? 'WXJSAPI' : isApp() ? 'WXH5' : 'NATIVE',
        spBillCreateIp: returnCitySN["cip"]
      }).then(res => {
        if (isWeiXin()) {
          this.paymoney(res.data)
          return
        } else if (isApp()) {
          this.$router.push({ path: 'success', query: { orderId: res.data.orderId } });
          window.location.href = res.data.url;
          return
        } else {
          this.$router.push({ name: 'success', query: { url: url, orderId: res.data.orderId } });
        }
      })
    },

    paymoney (data) {
      this.weixinpay(data, (success) => {
        Toast('支付成功')
        this.$router.push({ name: 'orderList' });
      }, (err) => {

      })
    },

    weixinpay (data, cb, errorCb) {
      let appId = data.appId;
      let timestamp = data.timeStamp;
      let nonceStr = data.nonceStr;
      let prepayId = data.prepayId;
      let paySign = data.paySign;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        jsApiList: [
          'checkJsApi',
          'openLocation',
          'getLocation',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(() => {
        wx.chooseWXPay({
          timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
          package: prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign, // 支付签名
          success: (res) => {
            // 支付成功后的回调函数
            cb(res);
          },
          fail: (res) => {
            errorCb(res);
          }
        });
      })
      wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        /*alert("config信息验证失败");*/
      });
    },

  }
}
</script>

<style scoped>
    .order_list{width: 90%; margin: 0 auto; height: 2.2rem; background: #fff; border-radius: 0.15rem; overflow: hidden; margin-bottom: 0.2rem;}
    .order_list_title{height: 0.3rem; background: #fff8ee; width: 100%; padding:0 0.1rem; text-align: left; line-height: 0.3rem; font-size: 0.16rem;}
    .list_info{height: 0.4rem; width: 100%; padding:0 0.1rem; line-height: 0.4rem; display: flex;justify-content: space-between;}
    .info_left{color: #696969;}
    .info_right{ font-size: 0.14rem; color: #333333; font-weight: bold;}
    .info_right_btn{ font-size: 0.14rem; color: #333333; font-weight: bold;width: 0.5rem;
    height: 0.3rem;
    line-height: 0.3rem;
    background: #6161b9;
    color: #fff;
    margin-top: 0.05rem;
    border-radius: 0.05rem;}
</style>
