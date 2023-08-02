import { TIM, TIMUploadPlugin, TIMProfanityFilterPlugin } from "./assets/uni-tim";
import type { Message, Conversation } from "tim-js-sdk";
import { useTIMStore } from "@/stores/tim";

// 创建 SDK 实例 - `TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
const tim = TIM.create({ SDKAppID: Number(import.meta.env.VITE_TIM_SDKAPPID) });

// 设置 SDK 日志输出 release 级别，SDK 输出关键信息，生产环境时建议使用
if (process.env.NODE_ENV === "production") tim.setLogLevel(1);

// 注册腾讯云即时通信 IM 上传插件，即时通信 IM SDK 发送图片、语音、视频、文件等消息需要使用上传插件，将文件上传到腾讯云对象存储
// #ifdef H5
tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });
// #endif
// #ifndef H5
tim.registerPlugin({ "cos-wx-sdk": TIMUploadPlugin });
// #endif

// 注册腾讯云即时通信 IM 本地审核插件
tim.registerPlugin({ "tim-profanity-filter-plugin": TIMProfanityFilterPlugin });

/** 监听系统级事件 */
function bindTIMEvent() {
  tim.on(TIM.EVENT.SDK_READY, handleSdkReady);
  tim.on(TIM.EVENT.SDK_NOT_READY, handleSdkNotReady);
  tim.on(TIM.EVENT.KICKED_OUT, handleKickedOut);
  tim.on(TIM.EVENT.ERROR, handleError);
  tim.on(TIM.EVENT.NET_STATE_CHANGE, handleNetStateChange);
}

/** 取消监听系统级事件 */
function unbindTIMEvent() {
  tim.off(TIM.EVENT.SDK_READY, handleSdkReady);
  tim.off(TIM.EVENT.SDK_NOT_READY, handleSdkNotReady);
  tim.off(TIM.EVENT.KICKED_OUT, handleKickedOut);
  tim.off(TIM.EVENT.ERROR, handleError);
  tim.off(TIM.EVENT.NET_STATE_CHANGE, handleNetStateChange);
}

/**
 * SDK 进入 ready 状态
 * - 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
 * @param event.name - TIM.EVENT.SDK_READY
 */
function handleSdkReady() {
  useTIMStore().isSDKReady = true;
  uni.hideLoading();
}
tim.on(TIM.EVENT.SDK_READY, handleSdkReady);

/**
 * SDK 进入 not ready
 * - 此时 SDK 无法正常工作。如果想恢复使用，接入侧需调用 login 接口，驱动 SDK 进入 ready 状态
 * @param event.name - TIM.EVENT.SDK_NOT_READY
 */
function handleSdkNotReady() {
  // 如果想使用发送消息等功能，接入侧需驱动 SDK 进入 ready 状态，重新调用 login 接口即可，如下所示：
  // tim.login({userID: 'your userID', userSig: 'your userSig'});
  uni.clearStorage();
  useTIMStore().$reset();
  uni.reLaunch({ url: "/im/login" });
}
tim.on(TIM.EVENT.SDK_NOT_READY, handleSdkNotReady);

/**
 * SDK 收到推送的单聊、群聊、群提示、群系统通知的新消息
 * @param {Object} event
 * @param {string} event.name - TIM.EVENT.MESSAGE_RECEIVED
 * @param {Message[]} event.data - 存储 Message 对象的数组
 */
function handleMessageReceived(event: { name: string; data: Message[] }) {
  event.data.forEach((message: Message) => {
    if (message.conversationID === useTIMStore().conversationID) {
      useTIMStore().messageList.push(message);
      // 清空会话未读消息数
      tim.setMessageRead({ conversationID: message.conversationID });
    }
  });
}
tim.on(TIM.EVENT.MESSAGE_RECEIVED, handleMessageReceived);

/**
 * 用户被踢下线
 * @param event.name - TIM.EVENT.KICKED_OUT
 * @param event.data.type 被踢下线的原因，例如 :
 * - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT(Web端，同一帐号，多页面登录被踢)
 * - TIM.TYPES.KICKED_OUT_MULT_DEVICE(同一帐号，多端登录被踢)
 * - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED(签名过期。使用前需要将SDK版本升级至v2.4.0或以上)
 * - TIM.TYPES.KICKED_OUT_REST_API(REST API kick 接口踢出。使用前需要将SDK版本升级至v2.20.0或以上)
 */
function handleKickedOut({ data }) {
  uni.showToast({ title: `${kickedOutReason(data.type)}被踢出，请重新登录。`, icon: "none" });
}
function kickedOutReason(type: string) {
  switch (type) {
    case TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
      return "多实例登录";
    case TIM.TYPES.KICKED_OUT_MULT_DEVICE:
      return "多设备登录";
    case TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
      return "userSig 过期";
    case TIM.TYPES.KICKED_OUT_REST_API:
      return " REST API kick 接口踢出";
    default:
      return "";
  }
}
tim.on(TIM.EVENT.KICKED_OUT, handleKickedOut);

/**
 * SDK 发生错误通知，可以获取错误码和错误信息
 * @param event.name - TIM.EVENT.ERROR
 * @param event.data.code - 错误码
 * @param event.data.message - 错误信息
 */
function handleError({ data }) {
  if (process.env.NODE_ENV !== "production") uni.showToast({ title: `${data.code}:${data.message}`, icon: "none" });
}
tim.on(TIM.EVENT.ERROR, handleError);

/**
 * 网络状态发生改变（v2.5.0 起支持）
 * @param event.name - TIM.EVENT.NET_STATE_CHANGE
 * @param event.data.state - 当前网络状态，枚举值及说明如下：
 * - TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
 * - TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
 * - TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
 */
function handleNetStateChange({ data }) {
  let title = "";
  switch (data.state) {
    case TIM.TYPES.NET_STATE_CONNECTED:
      title = "已接入网络";
      break;
    case TIM.TYPES.NET_STATE_CONNECTING:
      title = "当前网络不稳定";
      break;
    case TIM.TYPES.NET_STATE_DISCONNECTED:
      title = "当前网络不可用";
      break;
  }
  if (process.env.NODE_ENV !== "production") uni.showToast({ title, icon: "none" });
}
tim.on(TIM.EVENT.NET_STATE_CHANGE, handleNetStateChange);

uni.$tim = tim;

export default tim;
