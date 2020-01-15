<template>
  <div class="content-modal">

    <y-header title="商品详情" router="-1"></y-header>

    <div class="content">

      <div class="scroll-content scroll_div" style="margin-top: 0.45rem;">
        
        <div class="img_list">
          <img src="//img.alicdn.com/imgextra/i1/725677994/TB2W2sqkypnpuFjSZFkXXc4ZpXa_!!725677994.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle" />
          <img src="//img.alicdn.com/imgextra/i4/4215886748/O1CN01eDZWjL1zidAnJC1kO_!!4215886748-0-scmitem6000.jpg_2200x2200Q90s50.jpg_.webp"  align="absmiddle" />
          <img src="//img.alicdn.com/imgextra/i4/4215886748/O1CN01X5lxfO1zidAnO0Bw8_!!4215886748-0-scmitem6000.jpg_2200x2200Q90s50.jpg_.webp"  align="absmiddle"/>
          <img src="//img.alicdn.com/imgextra/i4/4215886748/O1CN01IZtz6t1zidAqAZMBQ_!!4215886748-0-scmitem6000.jpg_2200x2200Q90s50.jpg_.webp"  align="absmiddle"/>
          <img src="//img.alicdn.com/imgextra/i1/4215886748/O1CN01Ld2FUB1zidAnJ4ujL_!!4215886748-0-scmitem6000.jpg_2200x2200Q90s50.jpg_.webp"  align="absmiddle"/>
          <img src="//img.alicdn.com/imgextra/i2/4215886748/O1CN01v8kfaX1zidApkFzM4_!!4215886748-0-scmitem6000.jpg_2200x2200Q90s50.jpg_.webp"  align="absmiddle"/>
        </div>

        <div class="bottom_buy">
          <div class="money">
            <div class="now">现价:¥50.00</div>
            <div class="old">原价:50.00</div>
          </div>
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

export default {
  name: '',
  data () {
    return {
      
    }
  },
  computed: {},
  mounted () {
    // this.getInfo();
    console.info(this.$route.params.id)
  },
  methods: {
    ...mapActions([
      'userinfo_',
      'getshareinfo_'
    ]),

    getInfo () {
      this.userinfo_().then((res) => {
        if (res.result == 200) {
          
        }
      })
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
<style>
  

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
    flex: 2;
    background: #ff0036;
    color: #fff; 
    text-align: center;
    line-height: 0.5rem;
    height: 0.5rem;
    font-size: 0.16rem;
  }

</style>
