/**
 * Created by admin on 2018/3/28.
 */
/**
 * Created by admin on 2018/3/28.
 */
import axios from 'axios';
import { baseUrl } from './config';
import router from '../router';
import { mcjCookie, isWeiXin } from '../utils'

import { Indicator, Toast, MessageBox } from 'mint-ui';

axios.defaults.withCredentials = true;

axios.defaults.baseURL = '/api';

axios.defaults.timeout = 50000;

let AUTH_TOKEN = (function () {
  return mcjCookie.get("token") || '';
})();

axios.defaults.headers.common["token"] = AUTH_TOKEN;

//保证所有的请求完成之后关闭loading
Indicator.list = [];

let toast = null;

//自定义设置创建一个新的实例
let instance = axios.create();

//axios拦截器interceptors
instance.interceptors.request.use(function (config) {
  Indicator.open({ text: '加载中...', spinnerType: 'fading-circle' });
  Indicator.list.push(1);
  let url = config.url;
  if (url.indexOf("login") > -1) {
    localStorage.setItem('token', "");
    config.headers.token = "";
    return config
  }
  config.headers.token = mcjCookie.get("token") || '';
  return config;
}, function (error) {
  Indicator.list.pop();
  Indicator.list.length === 0 && Indicator.close();
  toast && (toast.close());
  toast = Toast('请稍后重试！');
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  Indicator.list.pop();
  Indicator.list.length === 0 && Indicator.close();
  if (response.status == 200 && response.data.statusCode == "00000000") {
    return response.data;
  }
  //弹幕提示用户
  if (response.data.statusCode == '24000001') {
    Toast(response.data.msg);
  }
  //没有登录 转向登录页面
  if (response.data.statusCode == '24001110') {
    Toast(response.data.msg);
    // router.replace({ name: 'login' });
    return Promise.reject('请重新登录');
  }
  return Promise.reject('没有数据');
}, function (error) {
  Indicator.list.pop();
  Indicator.list.length === 0 && Indicator.close();
  toast && (toast.close());
  toast = Toast('请稍后重试！');
  return Promise.reject(error);
});

const http = instance;

export default http
