<template>
  <div class="content-modal">
    <div class="content">
      <div class="scroll-content">
        <div class="login_body">
          <div class="body_top">
            <div
              style="width: 1rem; height: 1rem;border: 1px solid #ccc; border-radius: 50%; position: absolute; left: 50%; bottom: 10%; margin-left: -0.5rem; margin-top: -0.5rem;">
              <div
                style=" position: absolute; width: 0.84rem; height: 0.84rem; background: #4768f3; border-radius: 50%; left: 50%; top: 50%; margin-left: -0.42rem; margin-top: -0.42rem;">
              </div>
            </div>
          </div>
          <div style="color: #4768f3; font-size: 0.2rem;">鼠系列</div>
          <div class="form">
            <div class="ifrom">
              <span class="icon">&#xe601;</span>
              <input type="text" name="name" placeholder="请输入手机号码" class="name" v-model="phone">
            </div>
            <div class="ifrom">
              <span class="icon">&#xe600;</span>
              <input type="password" name="password" placeholder="请输入验证码" v-model="code">
              <em @click="getCode()" v-if="isClick">获取验证码</em>
              <em v-if="!isClick" class="time">{{times}}s之后重试</em>
            </div>

            <div style="text-align: left; line-height: 0.2rem; margin-top: 0.15rem; color: #409EFF;">
              忘记密码？
            </div>

            <div class="sublogin" @click="login()">登录</div>
            <!-- <div class="sublogin" @click="weiXinLogin()"><a href="javascript:;" class="btn" style="background-color: #63c73b">微信登录</a></div> -->
          </div>
        </div>
      </div>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
// import { autoCookie, removeCookie } from "../utils"
import { Toast } from 'mint-ui';

export default {
  data () {
    return {
      phone: '',
      code: '',
      checked: true,
      times:59,
      isClick:true,
      timer:null
    }
  },
  mounted: function () {
  },
  methods: {
    ...mapActions([
      'getVerificationCode_',
      'login_'
    ]),
    // 获取验证码
    getCode () {
      if (!this.phone) {
        Toast("手机号码不能为空");
        return
      }
      this.getVerificationCode_({ phone: this.phone }).then(res => {
        Toast('发送成功')
        this.isClick = false;
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
          this.times--
          if(this.times == 0){
            this.isClick = true;
            this.times = 59;
            clearInterval(this.timer)
          }
        },500)
      })
    },
    // 登录
    login () {
      if (!this.phone) {
        Toast("手机号码不能为空");
        return
      }
      if (!this.code) {
        Toast("验证码不能为空");
        return
      }
      this.login_({
        phone: this.phone,
        code: this.code
      }).then(
        res => {
          clearInterval(this.timer)
          this.$router.push({ name: 'productList' });
        }
      )
    },
    // getproductlimit () {
    //   this.storehouse_({ type: 0 }).then(res => {
    //     if (res.success == 200) {
    //       this.returnlimit(res.extrasInfo.show);
    //     }
    //   })
    // },
    // weiXinLogin () {
    //   this.wxlogin_().then((res) => {
    //     if (res.success == 200) {
    //       window.location.href = res.url;
    //     }
    //   })
    // },
    // goWxBind (id) {
    //   let config = { confirmButtonText: '跳过', cancelButtonText: '绑定', confirmButtonClass: 'cancel', cancelButtonClass: 'confirm' };
    //   MessageBox.confirm('您还未绑定微信帐号，绑定后，可直接用微信登录', config).then(
    //     () => {
    //     },
    //     () => {
    //       this.wxbind_({ userId: id }).then((res) => {
    //         if (res.success == 200) {
    //           window.location.href = res.url;
    //         }
    //       })
    //     }
    //   );
    // }
  }
}
</script>

<style scoped>
  .login_body{background: #fff;background-size: cover; width: 100%;height: 100%; position: relative;}
  .login_body .body_top{ height: 30%; width: 100%; position: relative;}
  .login_body .form{padding: 0 0.25rem; position: relative;top: 10%;}
  .login_body .form .ifrom{ margin-bottom: 0.2rem; position: relative}
  .login_body .form .ifrom span{ position: absolute; width: 0.2rem; height: 0.2rem; font-size: 0.2rem; color: #5b73ed; left: 0.1rem; top: 0.1rem;}
  .login_body .form .ifrom em{ position: absolute; height: 0.4rem; width: 1rem; right: 0; top: 0; line-height: 0.4rem; text-align: center;}
  .login_body .form .ifrom em.time{  color: #ccc;}
  .login_body .form .ifrom input{background: none; width: 100%;height: 0.4rem;font-size: 0.14rem; text-indent: 0.4rem; border: 1px solid #ececee; border-radius: 0.5rem;}
  .sublogin{margin-top: 0.15rem; background: #4768f3; color: #fff; text-align: center; height: 0.4rem; line-height: 0.4rem; border-radius: 0.2rem; font-size: 0.14rem; box-shadow: 1px 1px 6px #2e44a4}
  .drop-down{font-size: 0.14rem;color: #3798ff !important; position: absolute;bottom: 0.15rem; left: 0;right: 0}
</style>