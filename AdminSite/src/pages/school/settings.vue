<template>
  <div
    class="q-pa-md"
    style="margin-left:10%; margin-right:10%;"
  >
    <h4 style="border-bottom: 0.1px solid;">设置</h4>
    <div
      class="q-gutter-md"
      style="max-width: 100%"
    >
      <q-input
        filled
        label="真实姓名"
        disable
        v-model="details.validName"
      />
      <q-input
        filled
        label="用户名"
        v-model="details.name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
      />
      <q-input
        filled
        label="联络号码"
        stack-label
        v-model="details.phone"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '联络号码不能为空']"
      />
      <q-input
        filled
        label="输入旧密码"
        v-model="details.oldPassword"
        type="password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '旧密码不能为空']"
      />
      <q-input
        filled
        label="输入新密码"
        v-model="details.password"
        type="password"
      />
      <q-input
        filled
        label="确定新密码"
        v-model="details.confirmPassword"
        type="password"
      />

      <div style="margin-left:45%;">
        <q-btn
          style="margin-right:10px;"
          color="red"
          @click="cancel"
        >取消</q-btn>
        <q-btn
          color="green"
          @click="save"
        >保存</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from "quasar";


export default defineComponent({
  setup () {
    const $q = useQuasar();

    //还原版面
    const cancel = () => {
      getDetails();
      details.oldPassword = '';
      details.password = '';
      details.confirmPassword = ''
    };

    //判断输入资料是否准确
    let readySubmit = false;

    const checkInput = () => {
      console.log(details.phone)
      if (details.name.length > 0) {
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
        if (details.phone.length <= 0) {
          readySubmit = false
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "联络号码不能为空",
            timeout: 1000,
          });
        }
      }

      if (readySubmit === true) {
        if (details.oldPassword.length < 6) {
          readySubmit = false
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "旧密码不能小于6位数",
            timeout: 1000,
          });
        }
      }

      if (readySubmit === true) {
        if (details.password.length > 0) {
          if (details.password.length < 6 || details.confirmPassword.length < 6) {
            readySubmit = false
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "新密码不能小于6位数",
              timeout: 1000,
            });
          }
          if ((details.password !== details.confirmPassword)) {
            readySubmit = false
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "新密码与确定密码不相等",
              timeout: 1000,
            });
          }
        }
      }
    };

    //上传用户更新资料
    const save = () => {
      checkInput();
      if (readySubmit === true) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "保存成功",
          timeout: 1000,
        });
      }
    };

    //用户资料模板
    const details = reactive({
      validName: '',
      name: '',
      phone: '',
      oldPassword: '',
      password: '',
      confirmPassword: ''
    })

    //获取用户资料
    const getDetails = async () => {
      try {
        const response = await api.get("/private/details");
        details.validName = response.data.data.validName,
          details.name = response.data.data.name,
          details.phone = response.data.data.phone
      } catch (err) {
        console.log(err.message);
      }
    }

    // const postNewDetails = () => {
    // api.post('Api_Link', {
    //   name: details.name.value，
    //   phone: details.phone.value，
    //   oldPassword: details.oldPassword.value，
    //   password: details.password.value

    // }).then ((res) => {
    // if (res.data.status === 200 && res.data !== undefined) {
    //     updateToken(res.data.token);
    // }
    // if (res.status === 404){
    //   console.log('error')
    // }
    //  
    // })

    onMounted(() => {
      getDetails()
    })
    return {
      save,
      cancel,
      details,
      readySubmit,
      checkInput
    }
  }
})
</script>
