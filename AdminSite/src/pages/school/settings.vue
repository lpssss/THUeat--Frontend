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
        v-model="validName"
      />
      <q-input
        filled
        label="用户名"
        v-model="name"
        hint="提示：必填"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
      />
      <q-input
        filled
        label="联络号码"
        stack-label
        v-model="phone"
        hint="提示：必填"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '联络号码不能为空']"
      />
      <q-input
        filled
        label="输入旧密码"
        v-model="oldPassword"
        type="password"
        hint="提示：必填"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '旧密码不能为空']"
      />
      <q-input
        filled
        label="输入新密码"
        v-model="password"
        hint="提示：修改密码才需填些"
        type="password"
      />
      <q-input
        filled
        label="确定新密码"
        v-model="confirmPassword"
        hint="提示：修改密码才需填些"
        type="password"
      />

      <div style="margin-left:45%;">
        <q-btn
          style="margin-right:10px;"
          color="red"
          @click="cancel()"
        >取消</q-btn>
        <q-btn
          color="green"
          @click="save()"
        >保存</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
// import { api } from 'boot/axios'
import { useQuasar } from "quasar";

export default defineComponent({
  setup () {
    const validName = ref('庄家菘');
    const name = ref('小小');
    const phone = ref('1881332025');
    const oldPassword = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const $q = useQuasar();

    const cancel = () => {
      getDetails();
      oldPassword = '';
      password = '';
      confirmPassword = ''
    };

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
      if (phone.value.length <= 0) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "联络号码不能为空",
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
    };

    const save = () => {
      checkInput();
      if ((password.value == confirmPassword.value) && (password.value.length > 5) && (name.value.length > 0) && (phone.value.length > 0)) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "保存成功",
          timeout: 1000,
        });
      }
    };

    // const details = ref([]);
    // const getDetails = async () => {
    //   try {
    //     const response = await api.get("/private/details");
    //     details.value.splice(0, details.value.length, ...response.data);
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // }

    // const postNewDetails = () => {
    // api.post('Api_Link', {
    //   name: name.value，
    //   phone: phone.value，
    //   oldPassword: oldPassword.value，
    //   password: password.value，

    // }).then ((res) => {
    // if (res.status === 200 && res.data !== undefined) {
    //     updateToken(res.data.token);
    // }
    // if (res.status === 404){
    //   console.log('error')
    // }
    //  
    // })

    // onMounted(() => {
    //   getDetails()
    // })
    return {
      validName,
      name,
      phone,
      oldPassword,
      password,
      confirmPassword,
      save,
      cancel,
      checkInput,
      // getDetails
    }
  }
})
</script>
