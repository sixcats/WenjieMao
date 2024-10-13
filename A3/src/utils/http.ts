import { AxiosRequestConfig } from 'axios';
import { instance } from './axios';

// Defines a generic request function that sends HTTP requests
const request = <T>(option: AxiosRequestConfig): IResPromise<T> => {
  // Sends the request using the axios instance and casts the result to an IResPromise object with type T
  return instance({ ...option }) as unknown as IResPromise<T>;
};

// Exports a default class containing HTTP methods
export default {
  // Defines the GET method, using generics, allowing AxiosRequestConfig options
  get: <T>(option: AxiosRequestConfig) => {
    // Calls the request function, sets the request method to GET, and merges the passed options
    return request<T>({ method: 'get', ...option });
  },
  // Defines the POST method, using generics, allowing AxiosRequestConfig options
  post: <T>(option: AxiosRequestConfig) => {
    // Calls the request function, sets the request method to POST, and merges the passed options
    return request<T>({ method: 'post', ...option });
  },
  // Defines the DELETE method, using generics, allowing AxiosRequestConfig options
  delete: <T>(option: AxiosRequestConfig) => {
    // Calls the request function, sets the request method to DELETE, and merges the passed options
    return request<T>({ method: 'delete', ...option });
  },
  // Defines the PUT method, using generics, allowing AxiosRequestConfig options
  put: <T>(option: AxiosRequestConfig) => {
    // Calls the request function, sets the request method to PUT, and merges the passed options
    return request<T>({ method: 'put', ...option });
  },
};

