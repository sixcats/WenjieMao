/**
 * Declares a generic interface `IResponse` to represent the format of an API response.
 * The interface includes a status code (`code`), message (`msg`), and data (`data`).
 * Uses a generic type `T` for the data field, providing flexibility.
 * @template T - Generic parameter to specify the type of the data field.
 */
declare interface IResponse<T = any> {
  code: number;
  msg: string;
  data: T extends any ? T : T & any;
}

/**
 * Declares a type `AxiosMethod` to define supported HTTP methods for Axios requests.
 * Includes 'get', 'post', 'delete', 'put', and 'patch'.
 */
declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';

/**
 * Declares a type `AxiosResponseType` to define supported response types for Axios.
 * Includes 'arraybuffer', 'blob', 'document', 'json', 'text', and 'stream'.
 */
declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

/**
 * Declares an interface `AxiosConfig` to configure Axios request parameters.
 * Includes request parameters (`params`), request body (`data`), request URL (`url`),
 * request method (`method`), HTTP header type (`headersType`), and response type (`responseType`).
 */
declare interface AxiosConfig {
  params?: any;
  data?: any;
  url?: string;
  method?: AxiosMethod;
  headersType?: string;
  responseType?: AxiosResponseType;
}

/**
 * Declares a generic type `IResPromise` representing a Promise that returns an `IResponse` object.
 * Used to define the type of the Promise returned by API requests, with generic support for flexible data types.
 * @template T - Generic parameter to specify the type of the data in the `IResponse`.
 */
declare type IResPromise<T = any> = Promise<IResponse<T>>;

