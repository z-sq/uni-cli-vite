<template>
  <view class="bg-white p-2 box-border rounded min-w-55" v-if="payloadFormat.type == 'return'">
    <view class="bg-gradient-to-b from-[#50A9A7] to-[#41BE97] p-2 rounded-sm mb-2" un-text="xs white">回盘</view>
    <view class="inline-block" un-text="sm [#01BB98]">
      {{ `${payloadFormat.offer.spuOriginName} ${payloadFormat.offer.spuFactoryName}` }}
    </view>
    <view class="inline-block ml-1" un-text="sm">{{ payloadFormat.offer.productName }}</view>
    <view class="justify-between" un-flex="~ wrap" un-text="xs gray-600">
      <view class="mt-1">CIF报价: {{ `${payloadFormat.offer.cifPrice} ${payloadFormat.offer.currency}/吨` }}</view>
      <view class="mt-1">货柜量: {{ payloadFormat.offer.containerVolume }}</view>
    </view>
    <view class="mt-3 pt-1 justify-between border-t-(~ solid neutral-300)" un-flex="~ wrap" un-text="xs gray-600">
      <view class="mt-2">回盘价: {{ `${payloadFormat.return.returnPrice} ${payloadFormat.offer.currency}/吨` }}</view>
      <view class="mt-2">回盘货柜量: {{ payloadFormat.return.returnContainerVolume }}</view>
      <view class="mt-2">期望到货港: {{ payloadFormat.return.returnHarborNames }} </view>
      <view class="mt-2">期望装船月: {{ payloadFormat.return.returnExpectedMonth }}</view>
    </view>
  </view>

  <view class="relative bg-white p-2 box-border rounded min-w-55" v-if="payloadFormat.type == 'confirms'">
    <view class="bg-gradient-to-b from-[#50A9A7] to-[#41BE97] p-2 rounded-sm mb-2" un-text="xs white">成交确认单</view>
    <view
      class="absolute top-4 right-4 bg-white rounded-full px-1.5 py-0.5 text-xs flex items-center"
      :class="{
        'text-teal-600': payloadFormat.confirms.confirmsStatus == 3,
        'text-red-600': payloadFormat.confirms.confirmsStatus == 2,
      }"
      v-if="payloadFormat.confirms.confirmsStatus != 1"
    >
      <view
        class="mr-1"
        :class="{
          'i-ep-circle-check-filled': payloadFormat.confirms.confirmsStatus == 3,
          'i-ep-circle-close-filled': payloadFormat.confirms.confirmsStatus == 2,
        }"
      ></view>
      {{ statusFormat(payloadFormat.confirms.confirmsStatus) }}
    </view>
    <view class="bg-light-400 mt-1 px-2 py-1 text-xs" v-for="item in payloadFormat.confirms.data">
      <view class="inline-block text-[#01BB98]">{{ `${item.spuOriginName} ${item.spuFactoryName}` }}</view>
      <view class="inline-block ml-1">{{ item.productName }}</view>
      <view class="justify-between mt-1" un-flex="~">
        <view class="text-neutral-500">成交金额</view>
        <view class="text-[#DE3E26]">{{ `${item.transactionAmount}${item.currency}` }}</view>
      </view>
    </view>
    <view class="bg-gray px-2 py-1" un-text="xs white" v-if="payloadFormat.confirms.confirmsStatus == 2">
      作废原因：{{ payloadFormat.confirms.invalidReason }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTIMStore } from "@/stores/tim";

const props = defineProps({
  payload: {
    type: Object,
    default: () => ({
      data: "",
      description: "",
      extension: "",
    }),
  },
});

const payloadFormat = computed(() => {
  return JSON.parse(props.payload.data);
});

function statusFormat(status: string) {
  switch (status) {
    case "1":
      return "待确认";
    case "2":
      return "已作废";
    case "3":
      return "已确认";
    default:
      return "";
  }
}
</script>
