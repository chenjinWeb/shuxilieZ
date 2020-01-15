
import http from "./store/http"
import {baseUrl} from './store/config'
import {toBodyString} from "./utils"
import wx from "weixin-js-sdk"

const wxApi = {

  //判断是否是微信浏览器
  isWeixin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
    }else{
      return false;
    }
  },

  ajaxGet(url,data){
    let query = toBodyString(data);
    return http.get(`${baseUrl}${url}?${query}`)
  },

  wxRegister(callback){

    let data = {
      params: {reqUrl: window.location.href}
    }

    this.ajaxGet( '/wxpl/cfgInfo', data).then((res) => {
      wx.config({
        debug: false, // 开启调试模式
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
          'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    }).catch((error) => {
      console.log(error)
    })
    wx.ready((res) => {
      // 如果需要定制ready回调方法
      if (callback) {
        callback()
      }
    })

  },






}


export default wxApi






















