import { onLaunch } from "@dcloudio/uni-app";
import { useAccountStore } from "@/stores/account";

/**
 * 小程序初始化设置
 */
export function useMPInitSetting() {
  const accountStore = useAccountStore();

  /**
   * 强制更新小程序
   * @see {@link https://developers.weixin.qq.com/community/develop/doc/000c2430d30b70251e86f0a0256c09?highLine=UpdateManager | 强制更新}
   */
  function forceUpdate() {
    const updateManager = uni.getUpdateManager();

    updateManager.onUpdateReady(() => {
      uni.showModal({
        title: "更新提示",
        content: "新版本已就绪，是否立即使用？",
        success: ({ confirm }) => {
          // 新的版本已经下载好，调用 applyUpdate 强制应用新版本并重启
          confirm && updateManager.applyUpdate();
        },
      });
    });
  }

  onLaunch(async () => {
    forceUpdate();
    if (!accountStore.hasLogin) await accountStore.loginMP();
  });
}
