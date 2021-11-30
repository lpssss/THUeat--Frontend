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
        label="姓名"
        disable
        v-model="name"
      />
      <q-input
        filled
        label="编号"
        disable
        v-model="id"
      />
      <q-input
        filled
        label="用户名"
        disable
        v-model="id"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '联络号码不能为空']"
      />
      <q-input
        filled
        label="联络号码"
        stack-label
        v-model="contact"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '联络号码不能为空']"
      />
      <q-input
        filled
        label="输入新密码"
        v-model="newPassword"
        type="password"
        :rules="[(val) => (val && val.length >= 6) || '密码不能少于6位']"
      />
      <q-input
        filled
        label="确定新密码"
        v-model="confirmPassword"
        type="password"
        :rules="[(val) => (val && val.length >= 0) || '确定密码不可为空']"
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

export default defineComponent({
  setup () {
    const name = ref('庄家菘');
    const id = ref('123456');
    const contact = ref('1881332025');
    const newPassword = ref();
    const confirmPassword = ref()

    const save = () => {
      if ((newPassword.value == confirmPassword.value)) {
        console.log("pass");
        console.log(newPassword.value)
      }
      else {
        console.log("password incorrect")
        console.log(newPassword.value)
      }
    };
    return {
      newPassword,
      confirmPassword,
      save,
      name,
      id,
      contact
    }
  }
})
</script>
