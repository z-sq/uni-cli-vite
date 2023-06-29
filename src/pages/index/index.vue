<template>
  <view class="items-center justify-center" un-flex="~ col">
    <image class="w-18 h-18 animate-bounce" un-m="x-auto t-25 b-12.5" src="@/static/logo.png" />
    <view class="flex justify-center">
      <text un-text="lg gray-500">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("Hello");
</script>
