import HttpRequest, { type HttpRequestConfig } from 'luch-request';

// 全局配置修改 https://www.quanzhan.co/luch-request/guide/3.x/#全局配置修改setconfig
const HttpInstance = new HttpRequest({
  /* #ifndef H5 */
  baseURL: import.meta.env.VITE_APP_BASE_API, // 请求的根域名
  /* #endif */
  enableHttp2: true, // 开启 http2
  enableQuic: true, // 开启 quic
  enableCache: true // 开启 cache
} as HttpRequestConfig);

// 请求拦截 https://www.quanzhan.co/luch-request/guide/3.x/#在请求之前拦截
HttpInstance.interceptors.request.use((config) => {
  config.header = {
    token: uni.getStorageSync('token'),
    ...config.header
  };
  return config;
});

// 响应错误码
const codeMessage: { [x: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器未做任何处理。',
  401: '身份验证凭证未通过。',
  403: '身份验证凭证已通过，但无访问资源权限。',
  404: '所请求的资源不存在。',
  405: '请求方法不被允许。',
  410: '请求的资源被永久删除，不再可用。',
  422: '当创建一个对象时，发生一个验证错误。',
  429: '客户端的请求次数超过限额。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

// 响应拦截 https://www.quanzhan.co/luch-request/guide/3.x/#在请求之后拦截
HttpInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (response) => {
    /*  对响应错误做点什么 */
    switch (response.statusCode) {
      case 401:
        const pages = getCurrentPages<{
          $page: {
            fullPath: string;
          };
        }>();
        const { $page } = pages[pages.length - 1];
        // 跳转登陆页，记录来源页面全路径
        uni.redirectTo({
          url: `/pages/account/login?redirect=${encodeURIComponent($page.fullPath)}`
        });
        break;
      default:
        uni.showToast({
          title: codeMessage[response.statusCode || 500] || '未知网络请求错误',
          icon: 'none'
        });
        break;
    }
    return Promise.reject(response);
  }
);

/** 与后端约定的响应数据格式 */
type ApiResponse<T = any> = {
  /** 业务上的请求是否成功 */
  success?: boolean;
  /** 业务约定的错误码 */
  errCode?: string | number;
  /** 业务上的错误信息 */
  errMsg?: string;
  /** 业务数据 */
  data: T;
};

function request<T = any>(url: string, options?: { [key: string]: any }) {
  return new Promise<ApiResponse<T>>((resolve, reject) => {
    HttpInstance.request({
      url,
      ...options
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default request;
