<template>
  <web-view :src="link" @message="handleMessage($event.detail.data)"></web-view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";

const link = ref("https://uniapp.dcloud.io/static/web-view.html");

onLoad((options) => {
  if (options?.url) link.value = decodeURIComponent(options.url);
});

// #ifdef MP
onShareAppMessage(({ webViewUrl }) => {
  return {
    path: `/pages/common/webview?url=${encodeURIComponent(webViewUrl as string)}`,
  };
});
// #endif

/**
 * 处理网页发送的消息
 * @param {any[]} data - 多次 postMessage 的参数组成的数组
 */
function handleMessage(data: any[]) {
  uni.showModal({
    content: JSON.stringify(data),
    showCancel: false,
  });
}
</script>
