<template>
  <div class="q-pa-md" style="margin-left: 10%; margin-right: 10%">
    <h4 style="border-bottom: 0.1px solid">设置</h4>
    <div class="q-gutter-md" style="max-width: 100%">
      <q-input filled label="姓名" disable v-model="name"> </q-input>
      <q-input filled label="联络号码" stack-label v-model="contact" />
      <q-input
        filled
        label="输入新密码"
        v-model="newPassword"
        type="password"
      />
      <q-input
        filled
        label="确定新密码"
        v-model="confirmPassword"
        type="password"
      />
      <div style="margin-left: 45%">
        <q-btn style="margin-right: 10px" color="red" @click="saveAdv()"
          >取消</q-btn
        >
        <q-btn color="green" @click="saveAdv()">保存</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "StaffSettings",
  setup() {
    const name = ref("庄家菘");
    const contact = ref("1881332025");

    const saveAdv = () => {
      console.log("test");
    };
    return {
      newPassword: ref(""),
      confirmPassword: ref(""),
      saveAdv,
      name,
      contact,
    };
  },
};
</script>

<style scoped></style>
