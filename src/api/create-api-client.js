/**
 * Created by lin on 2017/8/25.
 */

import axios from 'axios';
let api;

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.timeout = 10000;

axios.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  return Promise.reject(res);
}, (error) => {
  return Promise.reject({message: '网络异常，请刷新重试', err: error});
});

if (process.__API__) {
  api = process.__API__;
} else {
  api = {
    get: function(url) {
      return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    post: function(target, options = {}) {
      return new Promise((resolve, reject) => {
        axios.post(target, options).then(res => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  };
}

export default api;