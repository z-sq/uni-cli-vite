import HttpRequest, { type HttpRequestConfig } from "luch-request";
import { useAccountStore } from "@/stores/account";
import { toLoginPage } from "@/utils";

// 全局配置修改 https://www.quanzhan.co/luch-request/guide/3.x/#全局配置修改setconfig
const HttpInstance = new HttpRequest({
  /* #ifndef H5 */
  baseURL: import.meta.env.VITE_APP_API_URL, // 请求的根域名
  /* #endif */
  enableHttp2: true, // 开启 http2
  enableQuic: true, // 开启 quic
  enableCache: true, // 开启 cache
});

// 请求拦截 https://www.quanzhan.co/luch-request/guide/3.x/#在请求之前拦截
HttpInstance.interceptors.request.use((config) => {
  const { token } = useAccountStore();
  config.header = Object.assign({ token }, config.header);
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
        const pages = getCurrentPages<{ $page: { fullPath: string } }>();
        const { $page } = pages[pages.length - 1];
        // 跳转登陆页
        toLoginPage($page.fullPath);
        break;
      default:
        statusCode && uni.showToast({ title: `${statusCode}：请求异常`, icon: "none" });
        break;
    }
    return Promise.reject(response);
  },
);

async function request<T = any>(url: string, options?: HttpRequestConfig) {
  const { data } = await HttpInstance.middleware<API.Response<T>>({
    url,
    ...options,
  });
  return data;
}

export { request };
