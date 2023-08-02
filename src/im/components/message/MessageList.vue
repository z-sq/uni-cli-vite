<template>
  <scroll-view
    class="w-full h-full"
    :scroll-y="true"
    overflow-anchor
    scroll-with-animation
    :scroll-top="scrollTop"
    @scrolltoupper="toUpper"
    @scrolltolower="toLower"
  >
    <div class="message-list">
      <view class="p-2" un-text="center sm gray" v-if="useTIMStore().isCompleted">没有更多</view>
      <template v-for="(message, index) in list" :key="message.ID">
        <MessageTimestamp :currTime="message.time" :prevTime="index > 0 ? list[index - 1].time : 0" />
        <MessageBubble :message="message">
          <MessageText :payload="message.payload" :flow="message.flow" v-if="message.type === TIM.TYPES.MSG_TEXT" />
          <MessageImage :payload="message.payload" v-if="message.type === TIM.TYPES.MSG_IMAGE" />
          <MessageAudio :payload="message.payload" :flow="message.flow" v-if="message.type === TIM.TYPES.MSG_AUDIO" />
          <MessageVideo :payload="message.payload" :flow="message.flow" v-if="message.type === TIM.TYPES.MSG_VIDEO" />
          <MessageFile :payload="message.payload" :flow="message.flow" v-if="message.type === TIM.TYPES.MSG_FILE" />
          <MessageFace :payload="message.payload" v-if="message.type === TIM.TYPES.MSG_FACE" />
          <MessageCustom :payload="message.payload" v-if="message.type === TIM.TYPES.MSG_CUSTOM" />
        </MessageBubble>
      </template>
    </div>
  </scroll-view>
</template>

<script setup lang="ts">
import {
  MessageTimestamp,
  MessageBubble,
  MessageText,
  MessageImage,
  MessageAudio,
  MessageVideo,
  MessageFile,
  MessageFace,
  MessageCustom,
} from "./message-content";
import { TIM } from "../../assets/uni-tim";
import type { Message } from "tim-js-sdk";
import { useTIMStore } from "@/stores/tim";
import { ref, onMounted, onUnmounted } from "vue";

defineProps<{ list: Message[] }>();

const scrollTop = ref(0);
let autoScroll = true;

function toUpper() {
  autoScroll = false;
  useTIMStore().getMessageList();
}

function toLower() {
  autoScroll = true;
}

let timer: NodeJS.Timer | undefined;

onMounted(() => {
  // 最新消息位置
  timer = setInterval(() => {
    if (autoScroll) {
      uni
        .createSelectorQuery()
        .select(".message-list")
        .boundingClientRect((res: any) => {
          scrollTop.value = res.height;
        })
        .exec();
    }
  }, 500);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
