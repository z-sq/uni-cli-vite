<template>
  <view class="flex p-2 leading-none" :class="{ 'flex-row-reverse': message.flow === 'out' }">
    <image
      class="w-9 h-9 rounded-full border-(~ solid white) box-border"
      :src="message.avatar || 'https://pyue-pro.oss-cn-beijing.aliyuncs.com/puyue_mini/im/icon_chatavator.png'"
      mode="aspectFill"
    />
    <view class="px-2 max-w-3/4">
      <view class="mb-1" un-text="sm dark" v-if="message.flow === 'in' && message.conversationType === 'GROUP'">
        {{ message.nameCard || message.nick || message.from }}
      </view>
      <slot></slot>
    </view>
    <view class="w-4 h-4 rounded-full bg-red" un-text="white xs center" v-if="message.status === 'fail'">!</view>
    <!--     
    <view
      class="self-end"
      :class="message.isPeerRead ? 'text-gray' : 'text-blue'"
      un-text="xs"
      v-if="message.conversationType === TIM.TYPES.CONV_C2C && message.status !== 'fail' && message.flow == 'out'"
    >
      {{ message.isPeerRead ? "已读" : "未读" }}
    </view> 
    -->
  </view>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: Object,
    default: () => ({}),
  },
});
</script>
