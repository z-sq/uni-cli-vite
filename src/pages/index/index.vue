<script setup lang="ts">
import { ref } from "vue";

const title = ref("Hello");
</script>

<template>
  <view class="items-center justify-center" un-flex="~ col">
    <image class="h-18 w-18 animate-bounce" un-m="x-auto t-25 b-12.5" src="@/static/logo.png" />
    <view class="flex justify-center">
      <text un-text="lg gray-500">
        {{ title }}
      </text>
    </view>
  </view>
</template>
