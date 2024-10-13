import { AxiosRequestConfig } from 'axios';
import { instance } from './axios';

const request = <T>(option: AxiosRequestConfig): IResPromise<T> => {
  return instance({ ...option }) as unknown as IResPromise<T>;
};

export default {
  get: <T>(option: AxiosRequestConfig) => {
    return request<T>({ method: 'get', ...option });
  },
  post: <T>(option: AxiosRequestConfig) => {
    return request<T>({ method: 'post', ...option });
  },
  delete: <T>(option: AxiosRequestConfig) => {
    return request<T>({ method: 'delete', ...option });
  },
  put: <T>(option: AxiosRequestConfig) => {
    return request<T>({ method: 'put', ...option });
  },
};
