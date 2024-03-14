
import axios from 'axios';
import Qs from 'qs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getToken } from './cookieApi.js';
import router from '@/router/index.js';

const apiPrefix = '/saas-admin';
const baseUrl = import.meta.env.VITE_API_URL + apiPrefix;
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
  withCredentials: false,
  responseType: 'json',
  maxContentLength: 2000,
  maxRedirects: 5,
  validateStatus: function (status) {
    return status === 200; // http 状态码(非自定义状态码)为200时，进入then，否则进入catch
  }
});

// 请求拦截器
instance.interceptors.request.use(config => {
  const token = getToken();
  const href = window.location?.href;
  config.headers['x-referer'] = href;
  config.headers.Authorization = '612699bfec45bf15eab5ec34b203caec';
  return config;
}, error => {
  return Promise.reject(error);
}
);

// 响应拦截器  用于token失效时刷新
let isRefreshing = false;
let requestList = [];
let isConfirm = false;

instance.interceptors.response.use((res) => {
  let resData = res.data;
  if (resData.code === 401) { // 401 token 失效
    // handleLogout();
    return Promise.reject(resData);
  } else if (resData.code === 402) { // 402 当前账户权限已修改
    !isConfirm && ElMessageBox.confirm('当前账户权限已修改，请重新登录', '提示', {
      type: 'warning',
      'confirmButtonText': '确定',
      'showClose': false,
      'showCancelButton': false,
      'closeOnClickModal': false,
      'closeOnPressEscape': false
    }).then(() => {
      // handleLogout();
      isConfirm = false;
    });
    isConfirm = true;
    return Promise.reject(resData);
  } else if (resData.code === 403) {// 403 无权限
    router.push('/404'); //403 也跳转该页面
    ElMessage.error('对不起，您没有权限访问该页面');
    return Promise.reject(resData);
  } else {
    let isConfirm = false;
    return res;
  }
}, (error) => {
  return Promise.reject(error);
});

const handleLoading = (config, bool) => {
  const loading = config?.loading;
  if (typeof loading === 'object') {
    loading.value = bool;
  }
};

/**
 * 封装请求方法
 * @param options, 配置参数
 * @param configParam, 其他配置参数
 * @returns {Promise<any>}
 */
const fetch = (options, configParam) => {
  const { config = {} } = configParam;
  const { noMsg } = config;
  handleLoading(config, true);

  return instance(options).then((res) => {
    let resData = res.data;

    if (resData.code === 0) { // 0：成功
      return resData; // resolve只接收一个参数
    } else { // 失败
      throw res;
    }
  }).catch((err) => {
    let errData = (err || err.response || {}).data;

    if (errData) { // errData 为一大对象包含 data 属性, eg. {..., data: { code, data, msg } }
      /* 错误提示信息 */
      if (errData.msg) {
        !noMsg && ElMessage.error(errData.msg); // 错误提示信息
      } else {
        !noMsg && ElMessage.error('对不起，网络错误，请稍后重试');
      }
    } else if (err.msg) { // err 对象有 msg 属性
      err.code !== 402 && !noMsg && ElMessage.error(err.msg); // code 402 不提示
    } else {
      !noMsg && ElMessage.error('对不起，网络错误，请稍后重试');
    }

    throw errData;
  }).finally(() => {
    handleLoading(config, false);
  });
};


export function $get(paramObj) {
  let { url, params, config = {} } = paramObj;
  if (this && Object.keys(this).length) {
    config = { ...config, ...this };
  }

  return fetch({
    method: 'get',
    url,
    params,
    ...config
  }, paramObj);
}

export function $post(paramObj) {
  let { url, params, config = {}, query } = paramObj;
  if (this && Object.keys(this).length) {
    config = { ...config, ...this };
  }

  return fetch({
    method: 'post',
    url,
    params: query, // 参数放在路由 query
    data: params, // data 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    ...config
  }, paramObj);
}

export function $delete(paramObj) {
  let { url, params, query, config = {} } = paramObj;
  if (this && Object.keys(this).length) {
    config = { ...config, ...this };
  }

  return fetch({
    method: 'delete',
    url,
    params: query, // DELTE 参数放在路由 query
    data: params,
    ...config
  }, paramObj);
}

export function $put(paramObj) {
  let { url, params, query, config = {} } = paramObj;
  if (this && Object.keys(this).length) {
    config = { ...config, ...this };
  }

  return fetch({
    method: 'put',
    url,
    params: query,
    data: params, // data 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    ...config
  }, paramObj);
}
