<template>
  <web-view :src="link" @message="getMessage"></web-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';

const link = ref('https://uniapp.dcloud.io/static/web-view.html');

// #ifdef APP-PLUS
link.value = '/hybrid/html/local.html';
// #endif

onLoad((options) => {
  if (options?.url) link.value = decodeURIComponent(options.url);
});

// #ifdef MP
onShareAppMessage(({ webViewUrl }) => {
  return {
    title: webViewUrl,
    path: `/pages/webview/index?url=${encodeURIComponent(webViewUrl as string)}`
  };
});
// #endif

function getMessage(e: { detail: any }) {
  uni.showModal({
    content: JSON.stringify(e.detail),
    showCancel: false
  });
}
</script>
