<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";

const { userInfo } = storeToRefs(useAccountStore());
const genderMaps: Record<number, string> = {
  0: "未知",
  1: "男",
  2: "女",
};
</script>

<template>
  <uni-list>
    <uni-list-item title="头像">
      <template #body>
        <view class="flex flex-1 items-center">
          <text class="text-sm text-[#3b4144]"> 头像 </text>
        </view>
      </template>
      <template #footer>
        <image class="h-12 w-12 rounded" :src="userInfo.avatarUrl" mode="aspectFill" />
      </template>
    </uni-list-item>
    <uni-list-item title="昵称" :right-text="userInfo.nickName" />
    <uni-list-item title="账号" :right-text="userInfo.userName" />
    <uni-list-item title="性别" :right-text="genderMaps[userInfo.gender || '0']" />
  </uni-list>
</template>
