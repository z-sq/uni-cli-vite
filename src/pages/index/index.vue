<template>
  <view class="items-center justify-center" un-flex="~ col">
    <image
      class="w-25 h-25 animate-bounce"
      un-m="x-auto t-25 b-12.5"
      src="/static/logo.png"
    />
    <view class="flex justify-center items-center">
      <view class="i-ph-translate"></view>
      <view class="text-lg">{{ $t("app.locale") }}</view>
    </view>
    <button @click="toggleLocale">切换语言</button>
  </view>
</template>

<script setup lang="ts">
import useToggleLocale from "@/composables/useToggleLocale";
const { toggleLocale } = useToggleLocale();
</script>
