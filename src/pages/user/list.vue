<script setup lang="ts">
import { computed, ref } from "vue";
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { getRule } from "@/services/api";

/** 当前页码 */
let current = 1;
/** 每页显示条数 */
const pageSize = 10;

/** 列表数据 */
const list = ref<any[]>([]);

/** loading 的状态 */
const loadStatus = ref<"more" | "loading" | "noMore">("more");
/** 各状态文字说明 */
const contentText = {
  contentdown: "点击加载更多",
  contentrefresh: "正在加载",
  contentnomore: "没有更多数据了",
};

/** 是否无数据 */
const isEmpty = computed(() => {
  if (loadStatus.value === "noMore" && list.value.length === 0) return true;
  return false;
});

/**
 * 加载列表数据
 */
async function loadListData(action = "add") {
  // 刷新重置数据状态
  if (action === "refresh") {
    list.value = [];
    current = 1;
    loadStatus.value = "more";
  }

  // 已是最后一页,取消执行
  if (loadStatus.value === "noMore") return;

  // 发送请求
  loadStatus.value = "loading";
  const { data } = await getRule({ current, pageSize });
  // 渲染数据
  if (data.list) list.value.push(...data.list);
  current++;
  loadStatus.value = "more";
  // 最后一页
  if (data.list && data.list.length < pageSize) loadStatus.value = "noMore";
}

// 页面加载
onLoad(() => {
  loadListData("refresh");
});

// 监听用户下拉动作
onPullDownRefresh(() => {
  loadListData("refresh").finally(() => {
    // 停止当前页面下拉刷新
    uni.stopPullDownRefresh();
  });
});

// 页面滚动到底部的事件
onReachBottom(() => {
  loadStatus.value !== "noMore" && loadListData();
});
</script>

<template>
  <!-- list -->
  <view v-for="item in list" :key="item.id" class="mx-3 border-t border-t-(light solid) py-2 intrinsic-h-14 first:border-none">
    <view class="text-sm">
      {{ item.cname }}
    </view>
    <view class="mt-1 text-xs opacity-50">
      {{ item.county }}
    </view>
  </view>

  <!-- empty -->
  <view v-if="isEmpty" class="h-screen flex flex-col items-center justify-center">
    <view class="text-center text-gray -translate-y-1/2">
      <view class="i-quill-signature mx-auto h-25 w-25" />
      <view class="text-sm"> 数据为空 </view>
    </view>
  </view>

  <!-- LoadMore -->
  <uni-load-more v-else :status="loadStatus" :content-text="contentText" @click-load-more="loadListData()" />
</template>
