<template>
  <view class="bg-white flex items-center p-5 shadow-sm">
    <image class="w-15 h-15" :src="myProfile?.avatar || `/static/logo.png`" mode="scaleToFill" />
    <view class="flex-1 ml-3">
      <view class="text-lg">{{ myProfile?.nick || `暂无昵称` }}</view>
      <view class="mt-2 text-sm text-gray">userID: {{ myProfile?.userID }}</view>
    </view>
  </view>
  <view class="absolute bottom-10 w-full">
    <button class="bg-white text-red m-5" hover-class="none" @click="TIMLogin">退出登录</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import UniTIM from "./tim-sdk";
import type { Profile } from "tim-js-sdk";

const myProfile = ref<Profile>();

onShow(() => {
  UniTIM.getMyProfile().then(({ data }) => {
    myProfile.value = data;
  });
});

function TIMLogin() {
  UniTIM.logout();
}
</script>
