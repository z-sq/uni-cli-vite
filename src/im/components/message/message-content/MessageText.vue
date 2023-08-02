<template>
  <view class="p-2 rounded-lg" :class="flow === 'out' ? 'rounded-tr-none bg-green' : 'rounded-tl-none bg-white'">
    <template v-for="item in decodeText(payload.text)">
      <view class="align-middle inline" un-text="dark sm" v-if="item.name === 'text'">{{ item.text }}</view>
      <image class="align-middle w-5 h-5" :src="item.src" mode="aspectFill" v-else-if="item.name === 'img'" />
    </template>
  </view>
</template>

<script setup lang="ts">
import { emojiMap, emojiUrl } from "../emojiMap";
defineProps({
  payload: {
    type: Object,
    default: () => ({ text: "" }),
  },
  flow: {
    type: String,
    default: "in",
  },
});

function decodeText(text: string) {
  type RenderDom = {
    name: string;
    text?: string;
    src?: string;
  };
  const renderDom: RenderDom[] = [];
  // 文本消息
  let temp = text;
  let left = -1;
  let right = -1;
  while (temp !== "") {
    left = temp.indexOf("[");
    right = temp.indexOf("]");
    switch (left) {
      case 0:
        if (right === -1) {
          renderDom.push({
            name: "text",
            text: temp,
          });
          temp = "";
        } else {
          const emojiKey = temp.slice(0, right + 1);
          if (emojiMap[emojiKey]) {
            renderDom.push({
              name: "img",
              src: emojiUrl + emojiMap[emojiKey],
            });
            temp = temp.substring(right + 1);
          } else {
            renderDom.push({
              name: "text",
              text: "[",
            });
            temp = temp.slice(1);
          }
        }
        break;
      case -1:
        renderDom.push({
          name: "text",
          text: temp,
        });
        temp = "";
        break;
      default:
        renderDom.push({
          name: "text",
          text: temp.slice(0, left),
        });
        temp = temp.substring(left);
        break;
    }
  }
  return renderDom;
}
</script>
