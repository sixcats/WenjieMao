import { AUTH_FAIL_CODE, RES_SUCCESS_CODE, TOKEN_KEY } from '@/constant';
import router from '@/router';
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
const instance: AxiosInstance = axios.create({
  baseURL: '/', // 设置基本URL
  timeout: 10000, // 设置请求超时时间（单位：毫秒）
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
});
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === 'blob') {
      return response;
    }
    // 成功有两种情况
    if (response.status === RES_SUCCESS_CODE || response.status === 200) {
      return response.data;
    } else {
      return response.data;
    }
  },
  (error: AxiosError<IResponse>) => {
    const { response } = error;
    // 对响应错误进行处理
    if (response?.status === AUTH_FAIL_CODE) {
      localStorage.removeItem(TOKEN_KEY);
      // router.push({ path: '/login' });
    } else {
      return Promise.reject(response?.data);
    }
  },
);

export { instance };
