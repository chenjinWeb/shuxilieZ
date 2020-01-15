<template>
  <div class="index_bg">
    <!-- <div class="index_img">
        <img src="../assets/img/logo.png" width="220"/>
      </div>
      <div class="index_btn" @click="goPage()">
        <img src="../assets/img/word.png" width="200"/>
      </div>
      <div class="index_btn">
        <img src="../assets/img/listen.png" width="200"/>
      </div> -->

    <van-picker :columns="columns" v-show="show" show-toolbar title="请选择课程等级" @cancel="onCancel" @confirm="onConfirm" />

  </div>
</template>

<script>
import Vue from "vue"
import { Picker } from 'vant';
import { Toast } from "mint-ui"
Vue.use(Picker);
export default {
  name: '',
  data () {
    return {
      columns: ['1', '2', '3', '4', '5'],
      show: false
    }
  },
  computed: {},
  methods: {
    onConfirm (value, index) {
      this.$router.push({ name: "word", query: { level: value } })
    },
    onCancel () {
      this.show = false;
    },
    goPage () {
      this.show = true;
    }
  },
  props: []
}
</script>
<style scoped>

  /* .index_bg{  background: url("../assets/img/index_bg.png") 100% 100% no-repeat; background-size: cover; width: 100%; height: 100%; padding-top: 1.0rem;}
  .index_btn{ margin-top: 0.4rem;} */

</style>
