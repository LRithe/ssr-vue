/**
 * Created by lin on 2017/8/25.
 */

import axios from 'axios';
let cook = process.__COOKIE__ || '';
let api;

axios.defaults.baseURL = 'https://api.douban.com/v2/';
axios.defaults.timeout = 10000;

axios.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status < 300) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
}, (error) => {
  // 网络异常
  return Promise.reject({message: '网络异常，请刷新重试', err: error, type: 1});
});

if (process.__API__) {
  api = process.__API__;
} else {
  api = {
    get: function(target) {
      return new Promise((resolve, reject) => {
        axios.request({
          url: encodeURI(target),
          method: 'get',
          headers: {
            'Cookie': cook
          }
        }).then(res => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    post: function(target, options = {}) {
      return new Promise((resolve, reject) => {
        axios.request({
          url: target,
          method: 'post',
          headers: {
            'Cookie': cook
          },
          params: options
        }).then(res => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  };
}

export default api;