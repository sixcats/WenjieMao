declare interface IResponse<T = any> {
  code: number;
  msg: string;
  data: T extends any ? T : T & any;
}

declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';

declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

declare interface AxiosConfig {
  params?: any;
  data?: any;
  url?: string;
  method?: AxiosMethod;
  headersType?: string;
  responseType?: AxiosResponseType;
}

declare type IResPromise<T = any> = Promise<IResponse<T>>;
