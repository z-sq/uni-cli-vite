import { defineStore } from "pinia";
import { ref, watchEffect, computed } from "vue";
import * as userServices from "@/services/user";

export const useAccountStore = defineStore("account", () => {
  /** 身份令牌 */
  const token = ref<string | undefined>(uni.getStorageSync("token"));

  /** 用户信息 */
  const userInfo = ref<{
    avatarUrl?: string;
    nickName?: string;
    userName?: string;
    gender?: number;
  }>({});

  watchEffect(() => {
    if (token.value) {
      // 本地储存Token
      uni.setStorage({ key: "token", data: token.value });
      // Token变更，重新获取登录用户信息
      userServices.currentUser().then(({ data }) => {
        userInfo.value = data;
      });
    } else {
      userInfo.value = {};
      uni.removeStorage({ key: "token" });
    }
  });

  /** 登录 */
  async function login(args: Record<string, any>) {
    await userServices.login(args).then((res) => {
      if (!res.success) return Promise.reject(res.errMsg);
      token.value = args.username;
    });
  }

  /** 小程序登录 */
  function loginMP() {
    return new Promise<any>((resolve, reject) => {
      uni.login({
        success: ({ code }) => {
          // TODO 调用登陆接口
          token.value = code;
          resolve(code);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }

  return {
    token,
    userInfo,
    login,
    loginMP,
    hasLogin: computed(() => !!token.value),
  };
});
