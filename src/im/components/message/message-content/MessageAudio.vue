<template>
  <view
    class="p-2 rounded"
    :class="flow === 'out' ? 'rounded-tr-none bg-green' : 'rounded-tl-none bg-white'"
    @click="toggleAudioPlay"
  >
    <view
      class="inline-block text-sm align-middle"
      :class="playing ? 'i-svg-spinners-bars-scale-middle' : 'i-ooui-play'"
    >
    </view>
    <view class="inline-block text-xs align-middle ml-1">{{ payload.second }}''</view>
  </view>
</template>

<script setup lang="ts">
import { ref, watchEffect, inject } from "vue";
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({
      uuid: "123",
      url: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
      size: 10,
      second: 22,
    }),
  },
  flow: {
    type: String,
    default: "in",
  },
});

const playing = ref(false);

const innerAudioContext = inject("audio", uni.createInnerAudioContext());

watchEffect(() => {
  innerAudioContext.src = props.payload.url;
});

function toggleAudioPlay() {
  if (playing.value) {
    handleAudioStop(innerAudioContext);
  } else {
    handleAudioPlay(innerAudioContext);
  }
}

function handleAudioPlay(innerAudioContext: UniApp.InnerAudioContext) {
  playing.value = true;
  innerAudioContext.play();
  innerAudioContext.onStop(() => {
    handleAudioStop(innerAudioContext);
  });

  innerAudioContext.onEnded(() => {
    handleAudioStop(innerAudioContext);
  });
  innerAudioContext.onError(() => {
    // ios 音频播放无声，可能是因为系统开启了静音模式
    uni.showToast({ icon: "none", title: "该音频暂不支持播放" });
  });
}

function handleAudioStop(innerAudioContext: UniApp.InnerAudioContext) {
  playing.value = false;
  innerAudioContext.stop();
}
</script>
