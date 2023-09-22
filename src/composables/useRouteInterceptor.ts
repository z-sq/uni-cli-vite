import { onLaunch } from "@dcloudio/uni-app";
import { useAccountStore } from "@/stores/account";
import { toLoginPage } from "@/utils";

/**
 * 权限路由身份验证
 * @returns
 */
export function useRouteInterceptor() {
  /**
   * 检测URL是否需要登录
   *
   * @param fullPath - URL编码 与路由地址有关，包括path、query和hash
   * @returns
   */
  function checkNeedLoginURL(fullPath: string) {
    const path = fullPath.split("?")[0];
    /** 游客不可访问的页面 */
    const needLoginPath: ({ pattern: RegExp } | string)[] = [{ pattern: /^\/pages\/user.*/ }];
    // 检测强制登录页面
    return needLoginPath.some((item) => {
      if (typeof item == "object" && item.pattern) {
        return item.pattern.test(path);
      }
      return path == item;
    });
  }

  /** 自定义全局路由验证 */
  function routeVerify() {
    const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    list.forEach((item) => {
      // 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
      uni.addInterceptor(item, {
        invoke({ url }) {
          // 未登录情况下，访问强制登录页面，重定向登陆页
          const { hasLogin } = useAccountStore();
          if (!hasLogin && checkNeedLoginURL(url)) {
            uni.showToast({
              title: "请先登录",
              icon: "none",
            });
            toLoginPage(url);
            return false;
          }

          // 防止页面栈重复
          if (["navigateTo", "redirectTo"].includes(item)) {
            /** 当前页面栈 */
            const pages = getCurrentPages<{
              $page: {
                fullPath: string;
              };
            }>();

            // 已存在页面，直接返回历史页面
            const index = pages.findLastIndex(({ $page }) => $page.fullPath == url);
            if (index != -1) {
              uni.navigateBack({
                delta: pages.length - 1 - index,
                success: () => {
                  // 解决navigateBack目标页面onLoad不执行问题
                  const { onLoad, options } = getCurrentPages<any>().pop();
                  onLoad(options);
                },
              });
              return false;
            }

            // #ifdef MP-WEIXIN
            // 页面栈超过10层，navigateTo改为redirectTo
            if (pages.length == 10 && item == "navigateTo") {
              uni.redirectTo({ url });
              return false;
            }
            // #endif
          }
        },
      });
    });
  }

  onLaunch((options) => {
    // #ifdef H5
    // 未登录情况下，程序首次启动强制登录页面，重定向登陆页
    const { hasLogin } = useAccountStore();
    if (!hasLogin && checkNeedLoginURL(`/${options?.path}`)) {
      /** 程序启动路径 */
      let appLaunchFullPath = `/${options?.path}`;
      // 是否携带参数
      if (options && JSON.stringify(options.query) != "{}") {
        const params = new URLSearchParams(options.query).toString();
        appLaunchFullPath = `/${options.path}?${params}`;
      }
      toLoginPage(appLaunchFullPath);
      return false;
    }
    // #endif

    routeVerify();
  });
}
