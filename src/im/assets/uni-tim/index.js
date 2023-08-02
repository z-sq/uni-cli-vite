// #ifdef H5
// 引入 IM SDK
import TIM from "tim-js-sdk";
// 发送图片、文件等消息需要腾讯云即时通信 IM 上传插件
import TIMUploadPlugin from "tim-upload-plugin";
// #endif

// #ifndef H5
// 引入 IM SDK
import TIM from "tim-wx-sdk";
// 发送图片、文件等消息需要腾讯云即时通信 IM 上传插件
import TIMUploadPlugin from "cos-wx-sdk-v5";
// #endif

// 拦截或替换敏感词需要本地审核插件
import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";

export { TIM, TIMUploadPlugin, TIMProfanityFilterPlugin };
