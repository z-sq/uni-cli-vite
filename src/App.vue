<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
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
  --uno: "min-h-full bg-light-100 dark:bg-dark-800 font-sans";
}
/* #endif */
</style>
