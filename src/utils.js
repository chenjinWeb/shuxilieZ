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

export {
  toBodyString,
  toQueryPair
}
