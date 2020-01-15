/**
 * Created by admin on 2018/3/28.
 */

import http from "../http"
import { toBodyString } from "../../utils"

export const getWordsTest = (body = {}) => {
  let query = toBodyString(body);
  return http.get(`/Test/getWordsTest?${query}`)
};

export const commitData = (body = {}) => {
  let query = toBodyString(body);
  return http.post(`/Test/getWordsTestResult`, query, { headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" } });
};

export const projectlist = (body = {}) => {
  let query = toBodyString(body);
  return http.get(`/data/getCourseInfo?${query}`)
}

export const getorders = (body = {}) => {
  let query = toBodyString(body);
  return http.get(`/pay/getOrders?${query}`)
}

export const courselist = (body = {}) => {
  let query = toBodyString(body);
  return http.get(`/data/getCourse?${query}`)
}

export const listInfo = (body = {}) => {
  let query = toBodyString(body);
  return http.get(`/data/getCourseInfoList?${query}`)
}

export const bycourse = (body = {}) => {
  let query = toBodyString(body);
  return http.post(`/data/byCourse`, query, { headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" } });
};

export const userinfo = () => {
  return http.get(`/getUser`)
}

export const getmycourse = () => {
  return http.get(`/data/getMyCourse`)
}

export const getshareinfo = (body = {}) => {
  const query = toBodyString(body)
  return http.get(`/pay/getShareInfo?${query}`)
}


// 鼠系列
export const getVerificationCode = (body = {}) => {
  const query = toBodyString(body)
  return http.get(`/login/getVerificationCode?${query}`)
}



