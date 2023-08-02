<template>
  <view class="bg-white flex p-3 relative cursor-pointer">
    <view
      class="absolute left-14 top-2 z-10 bg-red rounded-full px-1 font-mono -translate-x-1/2"
      un-text="xs white center"
      v-if="badge > 0"
    >
      {{ badge > 99 ? "99+" : badge }}
    </view>
    <image class="w-12 h-12 rounded align-middle mr-2" :src="avatar" mode="aspectFill" />
    <view class="flex-1">
      <view class="line-clamp-1">{{ title }}</view>
      <view class="line-clamp-1" un-text="sm gray">{{ note }}</view>
    </view>
    <view class="ml-1" un-text="xs gray">{{ time }}</view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  avatar: String,
  badge: {
    type: Number,
    default: 0,
  },
  title: String,
  note: String,
  time: String,
});
</script>
