<template>
  <image
    class="align-middle rounded max-w-40 cursor-pointer"
    :src="payload.imageInfoArray[1].url"
    mode="widthFix"
    lazy-load
    @click="handlePreviewImage(payload.imageInfoArray[0].url)"
    :style="{ width: `${payload.imageInfoArray[1].width}px` }"
  />
</template>

<script setup lang="ts">
defineProps({
  payload: {
    type: Object,
    default: () => ({
      imageInfoArray: [],
    }),
  },
});

function handlePreviewImage(url: string) {
  uni.previewImage({
    current: url,
    // 当前显示图片的http链接
    urls: [url],
  });
}
</script>
