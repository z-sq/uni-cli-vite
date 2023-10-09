<template>
  <!-- list -->
  <view class="mx-3 py-2 border-t-(~ solid light) first:border-none intrinsic-h-14" v-for="item in list" :key="item.id">
    <view class="text-sm">{{ item.cname }}</view>
    <view class="mt-1 opacity-50 text-xs">{{ item.county }}</view>
  </view>

  <!-- empty -->
  <view class="flex flex-col items-center justify-center h-screen" v-if="isEmpty">
    <view class="-translate-y-1/2 text-gray text-center">
      <view class="w-25 h-25 mx-auto i-quill-signature"></view>
      <view class="text-sm">数据为空</view>
    </view>
  </view>

  <!-- LoadMore -->
  <uni-load-more :status="loadStatus" :contentText="contentText" @clickLoadMore="loadListData()" v-else />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { getRule } from "@/services/api";

/** 当前页码 */
let current = 1;
/** 每页显示条数 */
let pageSize = 10;

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
  if (loadStatus.value == "noMore" && list.value.length == 0) return true;
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
  if (loadStatus.value == "noMore") return;

  // 发送请求
  loadStatus.value = "loading";
  const { data } = await getRule({ current, pageSize });
  // 渲染数据
  if (data.list) list.value.push.apply(list.value, data.list);
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
  if (loadStatus.value != "noMore") loadListData();
});
</script>
