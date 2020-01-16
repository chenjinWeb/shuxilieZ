/**
 * Created by admin on 2018/3/28.
 */

const toQueryPair = function (key, value) {
  if (typeof value === 'undefined') {
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

const toBodyString = function (obj) {
  let ret = [];
  for (let key in obj) {
    let values = obj[key];
    if (values && values.constructor === Array) { //数组
      let queryValues = [];
      for (let i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else { //字符串
      ret.push(toQueryPair(key, values));
    }
  }
  return ret.join('&');
}

const mcjCookie = {

  set: function (key, val, time) {//设置cookie方法
    var date = new Date(); //获取当前时间
    var expiresDays = time;  //将date设置为n天以后的时间
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie
  },

  get: function (key) {//获取cookie方法
    /*获取cookie参数*/
    var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
    var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    var tips;  //声明变量tips
    for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
      var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
      if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        tips = arr[1];   //将cookie的值赋给变量tips
        break;   //终止for循环遍历
      }
    }
    return tips;
  },

  delete: function (key) { //删除cookie方法
    var date = new Date(); //获取当前时间
    date.setTime(date.getTime() - 10000); //将date设置为过去的时间
    document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
  }
}

// 微信授权
const wxLogin = (appid, url) => {
  let redirect_uri = encodeURIComponent(url)
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`
}

const isWeiXin = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

const isApp = () => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

// 获取IP
const getUserIP = (onNewIP) => { //  onNewIp - your listener function for new IPs
  //compatibility for firefox and chrome
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
    iceServers: []
  }),
    noop = function () { },
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

  function iterateIP (ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }

  //create a bogus data channel
  pc.createDataChannel("");

  // create offer and set local description
  pc.createOffer().then(function (sdp) {
    sdp.sdp.split('\n').forEach(function (line) {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });

    pc.setLocalDescription(sdp, noop, noop);
  }).catch(function (reason) {
    // An error occurred, so handle the failure to connect
  });

  //sten for candidate events
  pc.onicecandidate = function (ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}

export {
  toBodyString,
  toQueryPair,
  mcjCookie,
  wxLogin,
  isWeiXin,
  isApp,
  getUserIP
}
