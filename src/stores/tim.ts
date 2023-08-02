import { defineStore } from "pinia";
import { computed, reactive, toRefs, watch } from "vue";
import type { Conversation, Message } from "tim-js-sdk";
import { TIM } from "../im/assets/uni-tim";

export const useTIMStore = defineStore("TIMStore", () => {
  const state = reactive({
    isSDKReady: false,
    /** 当前会话ID */
    conversationID: "",
    /** 当前会话资料 */
    conversationProfile: undefined as Conversation | undefined,
    /** 当前消息列表 */
    messageList: [] as Message[],
    /** 分页续拉消息ID */
    nextReqMessageID: undefined as string | undefined,
    /** 是否拉完所有消息 */
    isCompleted: false,
    messageLoading: false,
  });

  /** 消息接收方的 userID、groupID 或 topicID */
  const toAccount = computed(() => {
    if (!state.conversationProfile || !state.conversationProfile.conversationID) {
      return "";
    }
    switch (state.conversationProfile.type) {
      case "C2C":
        return state.conversationProfile.conversationID.replace("C2C", "");
      case "GROUP":
        return state.conversationProfile.conversationID.replace("GROUP", "");
      default:
        return state.conversationProfile.conversationID;
    }
  });

  /** 会话名称 */
  const conversationName = computed(() => {
    if (!state.conversationProfile) {
      return "聊天";
    }
    const { userProfile, groupProfile } = state.conversationProfile;
    switch (state.conversationProfile.type) {
      case TIM.TYPES.CONV_C2C:
        return userProfile.nick || userProfile.userID;
      case TIM.TYPES.CONV_GROUP:
        return groupProfile.name || groupProfile.groupID;
      case TIM.TYPES.CONV_SYSTEM:
        return "系统通知";
      default:
        return "聊天";
    }
  });

  /** 会话类型 */
  const conversationType = computed(() => {
    if (!state.conversationProfile || !state.conversationProfile.type) {
      return "";
    }
    return state.conversationProfile.type;
  });

  // 直接进入聊天界面
  watch(
    () => state.isSDKReady,
    (isSDKReady) => {
      if (isSDKReady && state.conversationID) handleCheckConversation(state.conversationID);
    },
  );

  // 切换会话
  watch(
    () => state.conversationID,
    (conversationID) => {
      if (!conversationID) return;
      if (!state.isSDKReady) return;
      handleCheckConversation(conversationID);
    },
  );

  function handleCheckConversation(conversationID: string) {
    // 获取会话资料
    uni.$tim.getConversationProfile(conversationID).then((imResponse) => {
      state.conversationProfile = imResponse.data.conversation;
      state.messageList = [];
      state.nextReqMessageID = "";
      state.isCompleted = false;
    });
    // 会话消息数已读上报
    uni.$tim.setMessageRead({ conversationID });
    // 拉取指定会话的消息列表
    getMessageList();
    uni.setNavigationBarTitle({ title: conversationName.value });
  }

  /**
   * 获取消息列表
   * 调用时机：打开某一会话时或下拉获取历史消息时
   */
  function getMessageList() {
    // 无更多历史消息
    if (state.isCompleted) return;
    // 拉取消息
    const { conversationID, nextReqMessageID } = state;
    uni.$tim.getMessageList({ conversationID, nextReqMessageID }).then((imResponse) => {
      // 更新messageID，续拉时要用到
      state.nextReqMessageID = imResponse.data.nextReqMessageID;
      state.isCompleted = imResponse.data.isCompleted;
      // 更新当前消息列表，从头部插入
      state.messageList = imResponse.data.messageList.concat(state.messageList);
    });
  }

  /**
   * 发送消息
   * @param {Message} message 消息对象
   */
  async function sendMessage(message: Message) {
    const imResponse = await uni.$tim.sendMessage(message);
    // 消息上屏
    state.messageList.push(imResponse.data.message);
  }

  return {
    toAccount,
    conversationType,
    conversationName,
    ...toRefs(state),
    getMessageList,
    sendMessage,
  };
});
