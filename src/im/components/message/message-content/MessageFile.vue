<template>
  <view
    class="p-2 rounded-lg cursor-pointer"
    :class="flow === 'out' ? 'rounded-tr-none bg-green' : 'rounded-tl-none bg-white'"
    @click="saveAs(payload.fileUrl, payload.fileName)"
  >
    <view class="inline-block align-middle mr-1 w-4 h-4 i-ph-paperclip"></view>
    <view class="align-middle inline break-all" un-text="dark sm">{{ payload.fileName }}</view>
  </view>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";
defineProps({
  payload: {
    type: Object,
    default: () => ({
      fileName: "",
      fileUrl: "",
      fileSize: "",
    }),
  },
  flow: {
    type: String,
    default: "in",
  },
});
</script>
