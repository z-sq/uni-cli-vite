<template>
  <view class="p-5">
    <image class="w-18 h-18 block mx-auto my-10" src="@/static/logo.png" />
    <uni-forms ref="formRef" label-align="right" :model="formData" :rules="formRules">
      <uni-forms-item label="用户ID" name="userID">
        <uni-easyinput type="text" placeholder="请输入姓名" v-model="formData.userID" />
      </uni-forms-item>
      <uni-forms-item label="密码" name="password">
        <uni-easyinput type="password" placeholder="请输入密码" v-model="formData.password" />
      </uni-forms-item>
    </uni-forms>
    <button class="bg-blue text-white" hover-class="none" :loading="loading" @click="handleLogin(formRef)">登陆</button>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import UniTIM from "./tim-sdk";
import { genTestUserSig } from "./assets/debug";

export default defineComponent({
  setup() {
    /** uni-forms 组件实例 */
    const formRef = ref<InstanceType<any>>(null);

    const state = reactive({
      loading: false,
      formData: {
        userID: "administrator",
        password: "",
      },
    });
    /** 校验规则 */
    const formRules = {
      username: {
        rules: [
          {
            required: true,
            errorMessage: "请输入用户ID",
          },
          {
            minLength: 1,
            maxLength: 30,
            errorMessage: "账户长度在{minLength}到{maxLength}个字符",
          },
        ],
      },
      // password: {
      //   rules: [
      //     {
      //       required: true,
      //       errorMessage: "请输入正确的密码",
      //     },
      //     {
      //       minLength: 6,
      //       errorMessage: "密码长度大于{minLength}个字符",
      //     },
      //   ],
      // },
    };

    /** 提交表单 */
    function handleLogin(formRef) {
      // 根据loading防止重复提交
      if (state.loading) return;
      // 表单校验
      formRef.validate(async (err: any) => {
        // 如果校验成功 ，err 返回 null
        if (!!err) return false;

        state.loading = true;
        // 调用登陆接口
        const { userID } = state.formData;
        const { userSig } = genTestUserSig(userID);
        await UniTIM.login({ userID, userSig }).then(() => {
          state.loading = false;
          // sdk 初始化，当 sdk 处于ready 状态，才可以使用API，文档
          uni.redirectTo({ url: "/im/conversation" });
        });
      });
    }

    return {
      ...toRefs(state),
      formRef,
      formRules,
      handleLogin,
    };
  },
});
</script>
