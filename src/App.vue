<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
// #ifdef H5
import UniTIM from "./im/tim-sdk";
import { genTestUserSig } from "./im/assets/debug";

onLaunch(async (options) => {
  console.log("App Launch", options);
  try {
    const userID = "administrator";
    const { userSig } = genTestUserSig(userID);
    await UniTIM.login({ userID, userSig });
  } catch (error) {
    uni.reLaunch({ url: "/im/login" });
  }
});
// #endif
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
/* 每个页面公共css */
/* #ifndef APP-NVUE */
page {
  --uno: "fixed inset-0 overflow-auto bg-light-400 dark:bg-dark-800 font-sans text-base";
}
/* #endif */
</style>
