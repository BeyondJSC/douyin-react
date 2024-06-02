import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  InternalAxiosRequestConfig
} from 'axios'

export interface RequestOptions
  extends Pick<
    AxiosRequestConfig,
    | 'baseURL'
    | 'timeout'
    | 'headers'
    | 'withCredentials'
    | 'responseType'
    | 'validateStatus'
    | 'maxRedirects'
  > {
  businessErrorCatch: (failRes: BusinessData, response: AxiosResponse<BusinessData>) => void
  errorCatch: (err: AxiosError<BusinessData>) => boolean
  businessValid?: (data: BusinessData) => boolean
}

export interface RequestConfig extends AxiosRequestConfig {
  filename?: string
  needMessage?: boolean
  downloadFileName?: string
}

export interface BusinessData<T = unknown> {
  code: string
  bizCode?: string
  message: string
  data: T
}

export type CancelCallback = (source: CancelTokenSource) => void

export type CancelSource = CancelTokenSource
export class Request {
  globalOptions: RequestOptions

  instance: AxiosInstance

  constructor(options: RequestOptions) {
    this.globalOptions = options
    this.globalOptions.businessValid =
      options.businessValid || ((data: BusinessData) => data.code === '200' || data.code === 'ok')
    this.instance = axios.create(options)
  }

  request<T = unknown>(requestOptions: RequestConfig): Promise<BusinessData<T>> {
    if (requestOptions.url?.indexOf('?') !== -1) {
      requestOptions.url = `${requestOptions.url}&timestamp=${new Date().valueOf()}`
    } else {
      requestOptions.url = `${requestOptions.url}?timestamp=${new Date().valueOf()}`
    }

    return this.instance
      .request(requestOptions)
      .then((response: AxiosResponse<BusinessData<T>>) => {
        if (this.globalOptions.businessValid!(response.data)) {
          return Promise.resolve(response.data)
        }
        this.globalOptions.businessErrorCatch(response.data, response)
        return Promise.reject(response.data)
      })
      .catch((err: AxiosError<BusinessData<T>>) => {
        if (err.code !== 'error') {
          this.globalOptions.errorCatch(err)
        }
        return Promise.reject(err)
      })
  }

  post<T = unknown>(requestOptions: Omit<RequestConfig, 'method'>): Promise<BusinessData<T>> {
    (requestOptions as RequestConfig).method = 'post'

    return this.request<T>(requestOptions)
  }

  get<T = unknown>(requestOptions: Omit<RequestConfig, 'method'>): Promise<BusinessData<T>> {
    (requestOptions as RequestConfig).method = 'get'

    return this.request<T>(requestOptions)
  }

  addInterceptorsRequest(
    callback: (
      value: InternalAxiosRequestConfig<unknown>
    ) => InternalAxiosRequestConfig<unknown> | Promise<InternalAxiosRequestConfig<unknown>>
  ): number {
    return this.instance.interceptors.request.use(callback)
  }

  removeInterceptorsRequest(interceptorKey: number): void {
    this.instance.interceptors.request.eject(interceptorKey)
  }

  addInterceptorsResponse(
    callback: (
      value: AxiosResponse<unknown, unknown>
    ) => AxiosResponse<unknown, unknown> | Promise<AxiosResponse<unknown, unknown>>
  ): number {
    return this.instance.interceptors.response.use(callback)
  }

  removeInterceptorsResponse(interceptorKey: number): void {
    this.instance.interceptors.response.eject(interceptorKey)
  }
}
