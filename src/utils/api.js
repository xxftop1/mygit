import axios from 'axios'

import {AtyMessage} from '@com.thunisoft.artery/artery-ui';

axios.interceptors.request.use(config=> {
  if(config.url.match(/\/api\//)!=null){
    config.url='/jfkh'+config.url;
  }
  return config;
}, err=> {
  Artery.message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    Artery.message.error({message: data.data.msg});
    return;
  }
  return data;
}, err=> {
  try{
    if(err.response){
      if (err.response.status == 504||err.response.status == 404) {
        Artery.message.error('服务器异常,请联系管理员!');
      } else if (err.response.status == 403) {
        Artery.message.error('权限不足,请联系管理员!');
      }
    } else {
      window.top.location.href = "/uaa/login.html?url=/typt/index.html&clientId=imp-typt";
      return;
    }
  }catch(e){
    window.top.location.href = "/uaa/login.html?url=/typt/index.html&clientId=imp-typt";
  }
  return Promise.resolve(err);
})

let base = '';

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  });
}
export const uploadFileRequest = (url,formData) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url,params) => {
  return axios({
    method: 'delete',
    params:params,
    url: `${base}${url}`
  });
}
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    params:params,
    url: `${base}${url}`
  });
}
