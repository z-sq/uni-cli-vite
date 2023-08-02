<template>
  <image class="align-middle w-20 h-20" lazy-load :src="`${faceUrl}${payload.data}@2x.png`" mode="aspectFill" />
</template>

<script setup lang="ts">
import { faceUrl } from "../emojiMap";
defineProps({
  payload: {
    type: Object,
    default: () => ({
      index: 5,
      data: "yz00",
    }),
  },
});
</script>
