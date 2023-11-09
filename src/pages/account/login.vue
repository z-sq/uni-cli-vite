<script setup lang="ts">
import { reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useAccountStore } from "@/stores/account";

/** 登陆成功跳转页面路径 */
let redirectPath = "/pages/index/index";

onLoad((options) => {
  if (options?.redirect) redirectPath = decodeURIComponent(options.redirect);
});

/** 表单数据 */
const formData = reactive({
  username: "",
  password: "",
});

/** 校验规则 */
const formRules = {
  username: {
    rules: [
      {
        required: true,
        errorMessage: "请输入账户",
      },
      {
        minLength: 1,
        maxLength: 30,
        errorMessage: "账户长度在{minLength}到{maxLength}个字符",
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入正确的密码",
      },
      {
        minLength: 6,
        errorMessage: "密码长度大于{minLength}个字符",
      },
    ],
  },
};

/** uni-forms 组件实例 */
const formRef = ref<InstanceType<UniHelper.UniForms> | null>(null);

const loading = ref(false);

const accountStore = useAccountStore();

/** 提交表单 */
function submitForm() {
  // 根据loading防止重复提交
  if (loading.value) return;
  // 表单校验
  formRef.value?.validate &&
    formRef.value.validate(async (err: any) => {
      // 如果校验成功 ，err 返回 null
      if (err) return false;

      loading.value = true;
      // 调用登陆接口
      await accountStore.login(formData).finally(() => {
        loading.value = false;
      });

      // 登陆成功，重回来源页面
      uni.redirectTo({
        url: redirectPath,
        fail: ({ errMsg }) => {
          if (/tab/.test(errMsg)) {
            // 来源为tabbar页
            uni.switchTab({ url: redirectPath });
          } else {
            console.error(errMsg);
          }
        },
      });
    });
}
</script>

<template>
  <view class="p-5">
    <uni-forms ref="formRef" label-align="right" :model="formData" :rules="formRules">
      <uni-forms-item label="账号" name="username">
        <uni-easyinput v-model="formData.username" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item label="密码" name="password">
        <uni-easyinput v-model="formData.password" type="password" placeholder="请输入密码" />
      </uni-forms-item>
    </uni-forms>
    <button type="primary" :loading="loading" @click="submitForm">登陆</button>
  </view>
</template>
