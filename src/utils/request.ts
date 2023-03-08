import HttpRequest, { type HttpRequestConfig } from 'luch-request';

// 全局配置修改 https://www.quanzhan.co/luch-request/guide/3.x/#全局配置修改setconfig
const HttpInstance = new HttpRequest({
  /* #ifndef H5 */
  baseURL: import.meta.env.VITE_APP_API_URL, // 请求的根域名
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

// 响应拦截 https://www.quanzhan.co/luch-request/guide/3.x/#在请求之后拦截
HttpInstance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    return response;
  },
  (response) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    const { statusCode } = response;
    switch (statusCode) {
      case 401:
        const pages = getCurrentPages<{
          $page: {
            fullPath: string;
          };
        }>();
        const { $page } = pages[pages.length - 1];
        // 跳转登陆页，记录来源页面全路径
        uni.redirectTo({
          url: `/pages/account/login?redirect=${encodeURIComponent(
            $page.fullPath
          )}`
        });
        break;
      default:
        /** 响应错误码对应信息 */
        const codeMaps: Record<number, string> = {
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
        uni.showToast({
          title: codeMaps[statusCode as number] || '网络请求错误',
          icon: 'none'
        });
        break;
    }
    return Promise.reject(response);
  }
);

async function request<T = any>(url: string, options?: HttpRequestConfig) {
  const { data } = await HttpInstance.middleware<API.Response<T>>({
    url,
    ...options
  });
  return data;
}

export { request };
