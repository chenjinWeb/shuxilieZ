<template>
  <div class="content-modal">
    <y-header title="支付结果" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content scroll_div" style="margin-top: 0.45rem; background: #fff;">
        <div>
            <div style="padding-top: 1.0rem;"><img src="../assets/img/success_bg.jpg" style="width: 1.8rem; height: 1.8rem;" /></div>
            <div style="width: 100%; font-size: 0.2rem; font-weight: bolder;margin-top: 0.2rem;">付款成功</div>
            <div style="width: 100%; font-size: 0.14rem; margin-top: 0.2rem; color: #484848; margin-bottom: 0.5rem;">{{times}}s后跳至订单列表页</div>
            <div style="width: 1.2rem; height: 0.4rem; border-radius:0.2rem; line-height: 0.4rem; margin: 0 auto; background: #5e5bb4; color: #fff; font-size: 0.16rem;" @click="toPage()">查看订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      times:30,
      timer:null
    }
  },
  computed: {},
  mounted () {
    this.goToPage();
  },
  methods: {
      goToPage(){
          clearInterval(this.timer)
          this.timer = setInterval(()=>{
              this.times--
              if(this.times == 0){
                  this.$router.push({ name: 'orderList' });
              }
          },1000)
      },
      toPage(){
          this.$router.push({ name: 'orderList' });
          clearInterval(this.timer)
      }
  }
    
}
</script>
