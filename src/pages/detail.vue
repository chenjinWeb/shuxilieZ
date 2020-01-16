<template>
  <div class="content-modal">

    <y-header title="鼠系列" router="-1"></y-header>

    <div class="content">

      <div class="scroll-content scroll_div" style="margin-top: 0.45rem; background: #fff;">

        <van-swipe :autoplay="3000" indicator-color="white" style="height: 2.0rem; margin-top: 0.1rem;">
          <van-swipe-item>
            <img :src="info.titleUrl" style="height: 100%;" />
          </van-swipe-item>
        </van-swipe>

        <div class="detail_title">{{info.commodityName}}</div>
        <div class="detail_money"><span>¥</span>{{info.fee}}
        </div>

        <div class="img_list">
          <img :src="item" align="absmiddle" v-for="item in info.detailUrl" :key="item" />
        </div>

        <div class="bottom_buy" @click="pay()">
          <div class="buy">立即购买</div>
        </div>

        <!-- <div href="javascript:;" class="user_account flex">
          <div class="head_lef">
            <img :src="url" alt="" class="head_img">
          </div>
          <div class="head_rig">
            <a href="#/index/user/userInfo" class="user_head clear">
              <div class="head_nickname fl">
                <p class="nickname">{{name}}</p>
                <p class="phone_number">性别：{{sex==1? '男' : sex == 2? '女' : '未知'}}</p>
              </div>
            </a>
          </div>
        </div> -->

        <!-- <ul class="center_list">

          <li>
            <a href="javascript:;" class="central_list clear">
              <div class="list_lef fl"><img src="../assets/img/yhq.png" alt="">优惠券</div>
              <div class="list_rig fr"><i class="icon">&#xe633;</i></div>
            </a>
          </li>

          <li @click="fenXiang()">
            <a href="javascript:;" class="central_list clear">
              <div class="list_lef fl"><img src="../assets/img/share.png" alt="">分享</div>
              <div class="list_rig fr"><i class="icon">&#xe633;</i></div>
            </a>
          </li>

        </ul> -->

      </div>

    </div>

  </div>
</template>

<script>

import { mapActions } from "vuex"
import { mcjCookie, isWeiXin, isApp, getUserIP } from '../utils'

export default {
  name: '',
  data () {
    return {
      info: {}
    }
  },
  computed: {},
  mounted () {
    this.getInfo()
  },
  methods: {
    ...mapActions([
      'getCommodityDetail_',
      'getshareinfo_',
      'getCodeUrl_',
      'createOrder_'
    ]),

    // 获取商品详情
    getInfo () {
      this.getCommodityDetail_({ commodityId: this.$route.params.id || 0 }).then((res) => {
        this.info = res.data || {};
      })
    },

    // 获取URL
    getUrl () {
      this.getCodeUrl_().then(res => {
        console.info(res)
      })
    },

    // 微信支付
    pay () {
      if (this.info.fee <= 0) {
        Toast('支付金额不能小于0元!')
        return
      }
      this.createOrder_({
        commodityId: this.info.commodityId,
        fee: this.info.fee,
        openId: mcjCookie.get('openId'),
        payType: isWeiXin() ? 'WXJSAPI' : isApp() ? 'WH5' : 'NATIVE',
        spBillCreateIp: '10.3.0.133'
      }).then(res => {
        this.paymoney(res.data)
      })
    },

    paymoney (data) {
      this.weixinpay(data, (success) => {
        console.info(success)
      }, (err) => {
        //alert(err)
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

    shareInfo () {
      return new Promise((resolve, reject) => {
        this.getshareinfo_({ url: 'http://17engo.top/mine' }).then(res => {
          if (res.result == 200) {
            resolve(res.data);
          }
        })
      })
    },



    fenXiang () {
      this.shareInfo().then((res) => {
        console.info(res)
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function () { //通过ready接口处理成功验证
          // config信息验证成功后会执行ready方法
          wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
            title: '这里是标题', // 分享标题
            desc: 'This is a test!', // 分享描述
            link: `${window.location.href}`, // 分享链接
            imgUrl: '图片', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.onMenuShareTimeline({ //分享朋友圈
            title: '标题', // 分享标题
            link: `${window.location.href}`,
            imgUrl: '图片', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
        wx.error(function (res) {//通过error接口处理失败验证
          // config信息验证失败会执行error函数
        });
      })
    }
  },
}
</script>
<style scope>
  
  .img_list img{ width: 100%; outline: none}

  .bottom_buy{
    position: sticky;
    bottom: 0;
    width: 100%;
    background: #fff;
    height: 0.5rem;
    display: flex;
    padding-bottom: 0.5rem;
  }

  .bottom_buy>div.money{
    color: #000;
    font-size: 0.14rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 0.1rem;
    justify-content: center;
    height: 0.5rem;
  }

  .bottom_buy div.money .now{
    color: #ff0036;
  }

  .bottom_buy div.money .old{
    color: #ccc;
    font-size: 0.12rem;
    text-decoration: line-through
  }

  .bottom_buy div.buy{
    flex: 1;
    background: #ff0036;
    color: #fff; 
    text-align: center;
    line-height: 0.5rem;
    height: 0.5rem;
    font-size: 0.16rem;
  }

  .detail_title{
    font-size: 0.14rem; width: 100%; text-align: center; font-weight: light; margin: 0.05rem 0;
  }

  .detail_money{font-size: 0.16rem; width: 100%; text-align: center; font-weight: bolder; color: #000;margin-bottom: 0.1rem;}
  .detail_money span{ display: inline-block; transform: scale(0.8)}

</style>
