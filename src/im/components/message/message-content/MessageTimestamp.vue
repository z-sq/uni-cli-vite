<template>
  <view class="p-2" un-text="center sm gray" v-if="timestampShowFlag">{{ timestampShowContent }}</view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  currTime: {
    type: Number,
    default: 0,
  },
  prevTime: {
    type: Number,
    default: 0,
  },
});

const timestampShowFlag = ref(false);
const timestampShowContent = ref("");

const handleItemTime = (currTime: number, prevTime: number) => {
  timestampShowFlag.value = false;
  if (currTime <= 0) {
    return "";
  } else if (!prevTime || prevTime <= 0) {
    timestampShowFlag.value = true;
    return calculateTimestamp(currTime * 1000);
  } else {
    const minDiffToShow = 10 * 60; //10min 10*60s
    const diff = currTime - prevTime; //s
    if (diff >= minDiffToShow) {
      timestampShowFlag.value = true;
      return calculateTimestamp(currTime * 1000);
    }
  }
  return "";
};

watch(
  () => [props.currTime, props.prevTime],
  (newVal: any, oldVal: any) => {
    if (newVal?.toString() === oldVal?.toString()) {
      return;
    } else {
      timestampShowContent.value = handleItemTime(props.currTime, props.prevTime);
    }
  },
  {
    immediate: true,
  },
);

// 计算时间戳函数
// calculate timestamp
function calculateTimestamp(timestamp: number): string {
  const todayZero = new Date().setHours(0, 0, 0, 0);
  const thisYear = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0).getTime();
  const target = new Date(timestamp);

  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const oneYear = 365 * oneDay;

  const diff = todayZero - target.getTime();

  function formatNum(num: number): string {
    return num < 10 ? "0" + num : num.toString();
  }

  if (diff <= 0) {
    // today, only display hour:minute
    return `${formatNum(target.getHours())}:${formatNum(target.getMinutes())}`;
  } else if (diff <= oneDay) {
    // yesterday, display yesterday:hour:minute
    return `昨天 ${formatNum(target.getHours())}:${formatNum(target.getMinutes())}`;
  } else if (diff <= oneWeek - oneDay) {
    // Within a week, display weekday hour:minute
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const weekday = weekdays[target.getDay()];
    return `${weekday} ${formatNum(target.getHours())}:${formatNum(target.getMinutes())}`;
  } else if (target.getTime() >= thisYear) {
    // Over a week, within this year, display mouth/day hour:minute
    return `${target.getMonth() + 1}/${target.getDate()} ${formatNum(target.getHours())}:${formatNum(
      target.getMinutes(),
    )}`;
  } else {
    // Not within this year, display year/mouth/day hour:minute
    return `${target.getFullYear()}/${target.getMonth() + 1}/${target.getDate()} ${formatNum(
      target.getHours(),
    )}:${formatNum(target.getMinutes())}`;
  }
}
</script>
