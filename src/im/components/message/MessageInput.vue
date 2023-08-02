<template>
  <view class="w-full bg-light-800 px-3 py-2 flex items-center box-border">
    <input
      class="flex-1 h-auto min-h-auto p-2 box-border bg-white rounded text-sm"
      type="text"
      confirm-type="send"
      placeholder="说点什么呢~"
      v-model="messageContent"
      @confirm="sendTextMessage"
      @focus="extensionVisible = undefined"
    />
    <view class="i-bi-emoji-smile w-8 h-8 mx-2" @click="toggleExtension('face')"></view>
    <view class="i-bi-plus-circle w-8 h-8" @click="toggleExtension('extension')" v-show="!messageContent"></view>
    <view class="bg-blue-600 p-2 rounded" un-text="xs white" v-show="messageContent" @click="sendTextMessage"
      >发送</view
    >
  </view>
  <view class="w-full bg-light-800 h-65" un-flex="~ col" v-if="extensionVisible == 'face'">
    <view class="flex-1 overflow-y-hidden">
      <!-- 默认表情 -->
      <view class="p-2 box-border h-full overflow-y-auto" un-flex="~ wrap" v-show="currentEmoji == 'default'">
        <view
          class="w-1/6 max-w-15 box-border p-2 inline-flex items-center justify-center"
          v-for="item in emojiName"
          :key="item"
          @click="messageContent += item"
        >
          <image class="w-7 h-7" :src="`${emojiUrl}${emojiMap[item]}`" lazy-load mode="aspectFit" />
        </view>
      </view>
      <!-- 个性表情 -->
      <view
        class="p-2 box-border h-full overflow-y-auto items-start"
        un-flex="~ wrap"
        v-for="emoji in bigEmojiList"
        :key="emoji.icon"
        v-show="currentEmoji == emoji.icon"
      >
        <view
          class="w-1/4 max-w-25 box-border p-2 inline-flex items-center justify-center"
          v-for="(item, index) in emoji.list"
          :key="item"
        >
          <image
            class="w-15 h-15"
            :src="`${faceUrl}${item}@2x.png`"
            lazy-load
            mode="aspectFit"
            @click="sendBigEmojiMessage(item, index)"
          />
        </view>
      </view>
    </view>
    <view class="flex items-center box-border px-3 py-2 bg-white">
      <view class="p-1 rounded" :class="{ 'bg-light-800': currentEmoji == 'default' }" @click="emojiChange('default')">
        <view class="i-ph-smiley-thin w-6 h-6"></view>
      </view>
      <view
        class="p-1 ml-2 rounded"
        :class="{ 'bg-light-800': currentEmoji == emoji.icon }"
        v-for="emoji in bigEmojiList"
        :key="emoji.icon"
        @click="emojiChange(emoji.icon)"
      >
        <image class="w-6 h-6 align-middle" :src="`${faceUrl}${emoji.icon}@2x.png`" lazy-load mode="aspectFit" />
      </view>
    </view>
  </view>

  <view class="w-full bg-light-800 h-65" v-show="extensionVisible == 'extension'">
    <view class="p-2 box-border h-full overflow-y-auto items-start" un-flex="~ wrap">
      <view class="w-1/4 max-w-25 box-border p-2 text-center" @click="handleChooseMedia('image', sendImageMessage)">
        <view class="bg-white w-15 h-15 rounded-lg flex-inline justify-center items-center">
          <view class="i-ion-image-sharp w-7 h-7"></view>
        </view>
        <view class="text-xs mt-2">照片</view>
      </view>
      <view class="w-1/4 max-w-25 box-border p-2 text-center" @click="handleChooseMedia('video', sendVideoMessage)">
        <view class="bg-white w-15 h-15 rounded-lg flex-inline justify-center items-center">
          <view class="i-ion-videocam w-7 h-7"></view>
        </view>
        <view class="text-xs mt-2">视频</view>
      </view>
      <view class="w-1/4 max-w-25 box-border p-2 text-center" @click="handleChooseFile">
        <view class="bg-white w-15 h-15 rounded-lg flex-inline justify-center items-center">
          <view class="i-ion-ios-folder w-7 h-7"></view>
        </view>
        <view class="text-xs mt-2">文件</view>
      </view>
    </view>
  </view>
  <view class="bg-light-800 pb-$window-bottom"></view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { emojiUrl, emojiMap, emojiName, faceUrl, bigEmojiList } from "./emojiMap";
import { TIM } from "../../assets/uni-tim";
import { useTIMStore } from "@/stores/tim";

const extensionVisible = ref<string | undefined>();
function toggleExtension(currentVisible: string) {
  if (extensionVisible.value == currentVisible) {
    extensionVisible.value = undefined;
  } else {
    extensionVisible.value = currentVisible;
  }
  if (currentVisible == "face") currentEmoji.value = "default";
}

defineExpose({ toggleExtension });

// 表情消息
const currentEmoji = ref("default");

function emojiChange(name: string) {
  currentEmoji.value = name;
}

function sendBigEmojiMessage(data: string, index: number) {
  let message = uni.$tim.createFaceMessage({
    to: useTIMStore().toAccount,
    conversationType: useTIMStore().conversationProfile?.type || TIM.TYPES.CONV_C2C,
    payload: {
      index, // Number 表情索引，用户自定义
      data, // String 额外数据
    },
  });
  useTIMStore().sendMessage(message);
}

// 文本消息
const messageContent = ref("");
async function sendTextMessage() {
  if (messageContent.value === "" || messageContent.value.length === 0) {
    uni.showToast({ title: "不能发送空白消息", icon: "none" });
    return;
  }
  let message = uni.$tim.createTextMessage({
    to: useTIMStore().toAccount,
    conversationType: useTIMStore().conversationProfile?.type || TIM.TYPES.CONV_C2C,
    payload: { text: messageContent.value },
  });
  await useTIMStore().sendMessage(message);
  messageContent.value = "";
}

// 发送图片消息
function sendImageMessage(file) {
  // 创建消息
  let message = uni.$tim.createImageMessage({
    to: useTIMStore().toAccount,
    conversationType: useTIMStore().conversationProfile?.type || TIM.TYPES.CONV_C2C,
    payload: { file },
    onProgress(event) {
      console.log("file uploading:", event);
    },
  });
  // 发送消息
  useTIMStore().sendMessage(message);
}

// 发送视频消息
function sendVideoMessage(file) {
  // 创建消息
  let message = uni.$tim.createVideoMessage({
    to: useTIMStore().toAccount,
    conversationType: useTIMStore().conversationProfile?.type || TIM.TYPES.CONV_C2C,
    payload: { file },
    onProgress(event) {
      console.log("file uploading:", event);
    },
  });
  // 发送消息
  useTIMStore().sendMessage(message);
}

// 选择媒体文件
function handleChooseMedia(type: "image" | "video", callback: Function) {
  // #ifdef MP-WEIXIN
  uni.chooseMedia({
    count: 1,
    mediaType: [type], // 文件类型
    sourceType: ["album", "camera"], // 从相册选择
    sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
    success(file) {
      callback(file);
    },
  });
  // #endif

  // #ifndef MP-WEIXIN
  if (type == "image") {
    uni.chooseImage({
      count: 1, // 默认9
      sourceType: ["album", "camera"], //从相册选择
      sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
      success(file) {
        callback(file);
      },
    });
  }
  if (type == "video") {
    uni.chooseVideo({
      sourceType: ["album", "camera"], // 来源相册或者拍摄
      maxDuration: 60, // 设置最长时间60s
      camera: "back", // 后置摄像头
      success(file) {
        console.log(file);
        callback(file);
      },
    });
  }
  // #endif
}

// 选择文件
function handleChooseFile() {
  // #ifdef MP-WEIXIN
  uni.chooseMessageFile({
    count: 1, // 默认9
    type: "all", // 从所有文件选择
    success(file) {
      sendFileMessage(file);
    },
  });
  // #endif

  // #ifdef H5
  uni.chooseFile({
    count: 1, // 默认9
    extension: [".zip", ".doc"],
    success(file) {
      sendFileMessage(file);
    },
  });
  // #endif
}

// 发送文件信息
function sendFileMessage(file) {
  // 创建消息
  let message = uni.$tim.createFileMessage({
    to: useTIMStore().toAccount,
    conversationType: useTIMStore().conversationProfile?.type || TIM.TYPES.CONV_C2C,
    payload: { file },
    onProgress(event) {
      console.log("file uploading:", event);
    },
  });
  // 发送消息
  useTIMStore().sendMessage(message);
}
</script>
