<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";

const { hasLogin, userInfo } = storeToRefs(useAccountStore());
</script>

<template>
  <view class="mx-auto container">
    <view v-if="hasLogin" class="p-5 text-center">
      <image class="h-25 w-25 rounded-full" :src="userInfo.avatarUrl" mode="aspectFill" />
      <view class="mt-5">
        {{ userInfo.nickName }}
      </view>
    </view>
    <view v-else> 未登录 </view>
  </view>
</template>
