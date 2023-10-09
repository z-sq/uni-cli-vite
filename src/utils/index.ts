/**
 * 跳转登录页面
 *
 * @param path - 登录成功重定向页面地址
 * @param loginPath - 登录路径
 * @returns
 */
export function toLoginPage(path: string, loginPath = "/pages/account/login") {
  const url = `${loginPath}?redirect=${encodeURIComponent(path)}`;
  // 如果在App.onLaunch调用本函数
  if (getCurrentPages().length == 0) {
    uni.redirectTo({ url });
  } else {
    uni.navigateTo({ url });
  }
  uni.showToast({ title: "请先登录", icon: "none" });
}
