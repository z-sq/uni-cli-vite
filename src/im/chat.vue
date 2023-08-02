<template>
  <view class="relative h-screen" un-flex="~ col">
    <view class="flex-1 overflow-y-hidden" @click="handleCloseDialog">
      <MessageList :list="useTIMStore().messageList" />
    </view>
    <MessageInput ref="MessageInputRef" />
  </view>
</template>

<script setup lang="ts">
import MessageList from "./components/message/MessageList.vue";
import MessageInput from "./components/message/MessageInput.vue";
import { onLoad, onUnload } from "@dcloudio/uni-app";
import { useTIMStore } from "@/stores/tim";
import { ref } from "vue";

onLoad((options) => {
  if (options?.conversationID) useTIMStore().conversationID = options.conversationID;
});

const MessageInputRef = ref<any>(null);
function handleCloseDialog() {
  MessageInputRef.value?.toggleExtension();
}

onUnload(() => {
  useTIMStore().conversationID = "";
});
</script>
