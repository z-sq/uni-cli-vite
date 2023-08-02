<template>
  <!-- <video class="align-middle w-40" :src="payload.videoUrl" :poster="payload.snapshotUrl"></video> -->
  <view class="relative cursor-pointer">
    <view class="absolute left-1/2 top-1/2 z-10 -mt-5 -ml-5 w-10 h-10 i-bi-play-circle"></view>
    <image
      class="align-middle rounded max-w-40"
      :src="imageMogr2(payload.snapshotUrl)"
      mode="widthFix"
      lazy-load
      :style="{ width: `${payload.snapshotWidth}px` }"
    />
  </view>
</template>

<script setup lang="ts">
defineProps({
  payload: {
    type: Object,
    default: () => ({
      videoUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4",
      snapshotUrl: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE53owd?ver=3b26",
    }),
  },
});

/**
 * 腾讯云数据万象基础图片处理
 * @param url 腾讯云cos图片地址
 */
function imageMogr2(url: string) {
  return `${url}thumbnail/320x/auto-orient/format/webp/quality/60/strip/ignore-error/1`;
}
</script>
