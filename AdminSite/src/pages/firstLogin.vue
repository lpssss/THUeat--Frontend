<template>
  <div
    class="q-pa-md"
    style="margin-left:10%; margin-right:10%;"
  >
    <h4 style="border-bottom: 0.1px solid;">请重新设定新密码</h4>
    <div
      class="q-gutter-md"
      style="max-width: 100%"
    >
      <q-input
        filled
        label="用户名"
        v-model="name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
      />
      <q-input
        filled
        label="输入旧密码"
        v-model="oldPassword"
        type="password"
        lazy-rules
        :rules="[(val) => (val && val.length >= 6) || '密码不能少于6位']"
      />
      <q-input
        filled
        label="输入新密码"
        v-model="password"
        type="password"
        lazy-rules
        :rules="[(val) => (val && val.length >= 6) || '密码不能少于6位']"
      />
      <q-input
        filled
        label="确定新密码"
        v-model="confirmPassword"
        type="password"
        lazy-rules
        :rules="[(val) => (val && val.length >= 6) || '确定密码不可为空']"
      />

      <div style="margin-left:50%;">
        <q-btn
          color="green"
          @click="save()"
        >保存</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import useAppState from "src/store/userAppState.js";

const { resetState } = useAppState();

export default defineComponent({
  setup () {
    const router = useRouter();
    const $q = useQuasar();
    const name = ref('庄家菘1');
    const oldPassword = ref('');
    const password = ref('');
    const confirmPassword = ref('')

    //检查用户输入资料是否合格
    const checkInput = () => {
      if (name.value.length <= 0) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "用户名不能为空",
          timeout: 1000,
        });
      }
      if ((oldPassword.value.length < 6 || password.value.length < 6 || confirmPassword.value.length < 6)) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "密码不能小于6位数",
          timeout: 1000,
        });
      }
      if ((password.value !== confirmPassword.value)) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "新密码与确定密码不相等",
          timeout: 1000,
        });
      }
    }

    //更新用户资料
    const save = () => {
      checkInput();
      if ((password.value == confirmPassword.value) && (password.value.length > 5) && (name.value.length > 0)) {
        resetState();
        router.push('/');
      }
    };
    return {
      password,
      oldPassword,
      confirmPassword,
      checkInput,
      save,
      name
    }
  }
})
</script>
