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
        label="用户实名"
        v-model="ValidName"
        disable
      />
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
          @click="save"
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
import axios from "axios";

const { resetState, getName, getvalidName, getToken } = useAppState();

export default defineComponent({
  setup () {
    const router = useRouter();
    const $q = useQuasar();
    const ValidName = ref(getvalidName().value);
    const name = ref(getName().value);
    const oldPassword = ref('');
    const password = ref('');
    const confirmPassword = ref('')
    const token = ref(getToken().value)

    //判断输入资料是否准确
    let readySubmit = false;
    const checkInput = () => {
      if (name.value.length > 0) {
        readySubmit = true
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "用户名不能为空",
          timeout: 1000,
        });
      }

      if (readySubmit === true) {
        if (oldPassword.value.length < 6) {
          readySubmit = false
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "旧密码不能小于6",
            timeout: 1000,
          });
        }
      }

      if (readySubmit === true) {
        if (password.value.length < 6) {
          readySubmit = false
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "新密码不能小于6位数",
            timeout: 1000,
          });
        }
      }

      if (readySubmit === true) {
        if (confirmPassword.value !== password.value) {
          readySubmit = false
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "新密码与旧密码不相同",
            timeout: 1000,
          });
        }
      }
    };


    //更新用户资料
    const save = () => {
      checkInput();
      if (readySubmit === true) {
        postNewDetails()
        resetState();
      }
    };

    //Post 功能
    const postNewDetails = () => {
      axios.post('https://linja19.pythonanywhere.com/api/private/details', {
        token: token.value,
        name: name.value,
        phone: '',
        oldPassword: oldPassword.value,
        password: password.value

      }).then((res) => {
        if (res.data.code === 200 && res.data !== undefined) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "保存成功",
            timeout: 1000,
          });
          router.push('/');
        }
        if (res.data.code !== 200) {
          $q.notify({
            color: "red-4",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
            timeout: 1000,
          });
        }
      })
    }
    return {
      token,
      ValidName,
      name,
      password,
      oldPassword,
      confirmPassword,
      checkInput,
      save

    }
  }
})
</script>
