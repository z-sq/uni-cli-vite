<template>
  <view class="flex flex-col items-center justify-center">
    <image
      class="w-25 h-25 mt-25 mx-auto mb-12.5 animate-bounce"
      src="/static/logo.png"
    />
    <view class="flex justify-center">
      <text class="text-lg text-gray-500">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const title = ref('Hello');
</script>
