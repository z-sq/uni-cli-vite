<template>
  <view class="container mx-auto">
    <view class="p-5 text-center" v-if="hasLogin">
      <image class="w-25 h-25 rounded-full" :src="userInfo.avatarUrl" mode="aspectFill" />
      <view class="mt-5">{{ userInfo.nickName }}</view>
    </view>
    <view v-else>未登录</view>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";

const { hasLogin, userInfo } = storeToRefs(useAccountStore());
</script>
