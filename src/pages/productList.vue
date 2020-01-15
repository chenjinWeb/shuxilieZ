<template>
  <div class="content-modal">
    <y-header title="商品列表" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content scroll_div" style="margin-top: 0.45rem;">
          <div v-for="item in productList" :key="item.id" @click="toDetail(item.id)" style="margin-bottom: 0.1rem;">
              <van-card
                :num="item.num"
                :price="item.price"
                :desc="item.desc"
                :title="item.title"
                :thumb="item.thumb"
            />
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex"
import Vue from 'vue';
import { Card } from 'vant';
Vue.use(Card);

export default {
  name: '',
  data () {
    return {
    productList:[
        {
            num:2,
            price:'2.00',
            desc:"描述信息",
            title:"商品标题",
            thumb:"https://img.yzcdn.cn/vant/t-thirt.jpg",
            id:1
        },
        {
            num:1,
            price:'5.00',
            desc:"描述信息111",
            title:"商品标题222",
            thumb:"https://img.yzcdn.cn/vant/t-thirt.jpg",
            id:2
        },
        {
            num:2,
            price:'2.00',
            desc:"描述信息",
            title:"商品标题",
            thumb:"https://img.yzcdn.cn/vant/t-thirt.jpg",
            id:3
        },
        {
            num:1,
            price:'5.00',
            desc:"描述信息111",
            title:"商品标题222",
            thumb:"https://img.yzcdn.cn/vant/t-thirt.jpg",
            id:4
        }
    ]
    }
  },
  computed: {},
  mounted () {
      // this.getProductList()
  },
  methods: {
    ...mapActions([
      'orderClose_'
    ]),

    // 获取商品列表
    getProductList(){
        this.orderClose_({
            orderId:1
        }).then(res=>{
            this.productList = [
                {
                    num:2,
                    price:'2.00',
                    desc:"描述信息",
                    title:"商品标题",
                    thumb:"https://img.yzcdn.cn/vant/t-thirt.jpg"
                },
                {
                    num:1,
                    price:'5.00',
                    desc:"描述信息111",
                    title:"商品标题222",
                    thumb:"https://img.yzcdn.cn/vant/t-thirt.jpg"
                }
            ]
        })
    },

    // 跳转
    toDetail(id){
        this.$router.push({ name: 'detail', params: {id} })
    }

  }

}
</script>
<style>
  
</style>
