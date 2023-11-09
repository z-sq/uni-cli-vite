import { useMPInitSetting } from "@/composables/useMPInitSetting";
import { useRouteInterceptor } from "@/composables/useRouteInterceptor";

/**
 * 应用程序初始化设置
 */
export default function useAppInitSetting() {
  // #ifdef MP
  useMPInitSetting();
  // #endif
  useRouteInterceptor();
}
