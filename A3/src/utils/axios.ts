import { AUTH_FAIL_CODE, RES_SUCCESS_CODE, TOKEN_KEY } from '@/constant';
import router from '@/router';
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// Create an Axios instance with default configuration
const instance: AxiosInstance = axios.create({
  baseURL: '/', // Set the base URL for all requests
  timeout: 10000, // Set the request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set the request header content type
  },
});

// Add a request interceptor to process request configurations
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Process the request configuration, e.g., add token
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

// Add a response interceptor to process response data
instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Check the response data and process it based on the response type
    if (response.config.responseType === 'blob') {
      // If the response type is blob, return the response object directly
      return response;
    }
    if (response.status === RES_SUCCESS_CODE || response.status === 200) {
      // If the response status code indicates success, return the response data
      return response.data;
    } else {
      // For other status codes, return the response data, which might be further processed by the caller
      return response.data;
    }
  },
  (error: AxiosError<IResponse>) => {
    // Handle response errors
    const { response } = error;
    if (response?.status === AUTH_FAIL_CODE) {
      // If the status code indicates authentication failure, remove the local storage token
      localStorage.removeItem(TOKEN_KEY);
    } else {
      // For other errors, reject the Promise with the error data
      return Promise.reject(response?.data);
    }
  },
);

// Export the Axios instance for use in other modules
export { instance };
