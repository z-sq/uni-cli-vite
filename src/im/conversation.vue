<template>
  <view class="flex items-center justify-center h-full" v-if="conversationList.length == 0">
    <view class="-translate-y-1/2 text-gray">暂无会话</view>
  </view>
  <ConversationItem
    :avatar="handleConversationAvatar(conversation)"
    :badge="conversation.unreadCount"
    :title="handleConversationName(conversation)"
    :note="handleConversationLastMessage(conversation.lastMessage)"
    :time="caculateTimeago(conversation.lastMessage.lastTime * 1000)"
    @click="handleConversationItem(conversation.conversationID)"
    v-for="conversation in conversationList"
  />
</template>

<script setup lang="ts">
import ConversationItem from "./components/conversation/ConversationItem.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { caculateTimeago } from "./utils/date";
import { TIM } from "./assets/uni-tim";
import type { Conversation } from "tim-js-sdk";
import UniTIM from "./tim-sdk";

/**
 * 处理会话列表头像
 * @param {Conversation} conversation 会话对象
 */
function handleConversationAvatar({ type, userProfile, groupProfile }: Conversation) {
  let conversationAvatar = "";
  switch (type) {
    case TIM.TYPES.CONV_C2C:
      conversationAvatar =
        userProfile.avatar || "https://pyue-pro.oss-cn-beijing.aliyuncs.com/puyue_mini/im/icon_chatavator.png";
      break;
    case TIM.TYPES.CONV_GROUP:
      conversationAvatar = groupProfile.avatar || "https://web.sdk.qcloud.com/component/TUIKit/assets/group_avatar.png";
      break;
    case TIM.TYPES.CONV_SYSTEM:
      conversationAvatar = groupProfile.avatar || "https://web.sdk.qcloud.com/component/TUIKit/assets/group_avatar.png";
      break;
  }
  return conversationAvatar;
}

/**
 * 处理会话列表昵称
 * @param {Conversation} conversation 会话对象
 */
function handleConversationName({ type, userProfile, groupProfile }: Conversation) {
  let conversationName = "";
  switch (type) {
    case TIM.TYPES.CONV_C2C:
      conversationName = userProfile.nick || userProfile.userID || "";
      break;
    case TIM.TYPES.CONV_GROUP:
      conversationName = groupProfile.name || groupProfile.groupID || "";
      break;
    case TIM.TYPES.CONV_SYSTEM:
      conversationName = "系统通知";
      break;
  }
  return conversationName;
}

/**
 * 处理会话列表最新消息
 * @param {Message} lastMessage 会话最新的消息
 */
function handleConversationLastMessage({ type, payload, messageForShow }) {
  switch (type) {
    case TIM.TYPES.MSG_TEXT:
      return payload.text;
    default:
      return messageForShow;
  }
}

/**
 * 点击会话列表
 */
function handleConversationItem(conversationID: string) {
  uni.navigateTo({ url: `/im/chat?conversationID=${conversationID}` });
}

/** 会话列表 */
const conversationList = ref<Conversation[]>([]);

/**
 * 会话列表更新
 * @param event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
 * @param event.data Conversation 对象的数组
 */
function handleConversationListUpdated(event: { name: string; data: Conversation[] }) {
  conversationList.value = event.data;
}

onMounted(() => {
  UniTIM.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, handleConversationListUpdated);
});
onUnmounted(() => {
  UniTIM.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, handleConversationListUpdated);
});
</script>
