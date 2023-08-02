import { Uni as _Uni } from "@dcloudio/types";
import { type ChatSDK } from "tim-js-sdk";

declare global {
  interface Uni extends _Uni {
    $tim: ChatSDK;
  }
  const jWeixin: any;
}
