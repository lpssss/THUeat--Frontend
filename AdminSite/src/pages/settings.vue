<template>
  <div
    class="q-pa-md"
    style="margin-left: 10%; margin-right: 10%"
  >
    <h4 style="border-bottom: 0.1px solid">设置</h4>
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
      />
      <q-input
        filled
        label="联络号码"
        stack-label
        v-model="details.phone"
        v-on:keypress="isPhoneNumber($event)"
      />
      <q-input
        filled
        label="输入旧密码"
        v-model="details.oldPassword"
        type="password"
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

      <div style="margin-left: 45%">
        <q-btn
          style="margin-right: 10px"
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
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import useAppState from "src/store/userAppState.js";
import { ADMIN_API_LINKS } from "app/api-links";

const { getToken } = useAppState();

export default defineComponent({
  setup () {
    const $q = useQuasar();
    const token = ref(getToken().value);
    const DETAIL_LINK = ADMIN_API_LINKS.personalDetails;
    const isLoading = ref(true)
    $q.loading.show({
      message: "页面加载中",
    });

    //检查输入是否是数字
    const isPhoneNumber = (e) => {
      let char = String.fromCharCode(e.keyCode);
      if (/^[+\d](?:.*\d)?$/.test(char)) return true;
      else e.preventDefault();
    }

    //用户资料模板
    const details = reactive({
      validName: "",
      name: "",
      phone: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    });

    watch(details, (currentValue) => {
      let output = ''
      for (var i = 0; i < currentValue.phone.length; i++) {
        if (i === 0) {
          if (currentValue.phone[0] === '+') {
            output = output + currentValue.phone[0]
          }
        }
        if (currentValue.phone[i] >= '0' && currentValue.phone[i] <= '9') {
          output = output + currentValue.phone[i]
        }
      }
      details.phone = output
    }, { deep: true });


    //还原版面
    const cancel = () => {
      getDetails();
      details.oldPassword = "";
      details.password = "";
      details.confirmPassword = "";
    };

    //上传用户更新资料
    const save = () => {
      checkInput();
      if (readySubmit === true) {
        postNewDetails();
        getDetails();
        details.oldPassword = "";
        details.password = "";
        details.confirmPassword = "";
      }
    };

    //获取用户资料
    const getDetails = async () => {
      try {
        const response = await api.get(DETAIL_LINK);
        details.validName = response.data.data.validName;
        details.name = response.data.data.name;
        details.phone = response.data.data.phone;
        isLoading.value = false
      } catch (err) {
        $q.notify({
          type: "error",
          message: err.message,
        });
        isLoading.value=false
      }
    };

    //判断输入资料是否准确
    let readySubmit = false;
    const checkInput = () => {
      if (details.name.length > 0) {
        readySubmit = true;
      } else {
        $q.notify({
          type: "error",
          message: "用户名不能为空",
        });
      }

      if (readySubmit === true) {
        if (details.phone == null) {
          readySubmit = false;
          $q.notify({
            type: "error",
            message: "联络号码不能为空",
          });
        } else {
          if (details.phone.length <= 0) {
            readySubmit = false;
            $q.notify({
              type: "error",
              message: "联络号码不能为空",
            });
          }
        }
      }

      if (readySubmit === true) {
        if (details.oldPassword.length > 0) {
          if (details.oldPassword.length < 6) {
            readySubmit = false;
            $q.notify({
              type: "error",
              message: "旧密码不能小于6位数",
            });
          }
        }
      }

      if (readySubmit === true) {
        if (details.password.length > 0) {
          if (details.password.length < 6) {
            readySubmit = false;
            $q.notify({
              type: "error",
              message: "新密码不能小于6位数",
            });
          }
        }
      }
      if (readySubmit === true) {
        if (details.password.length > 0) {
          if (details.password !== details.confirmPassword) {
            readySubmit = false;
            $q.notify({
              type: "error",
              message: "新密码与确定密码不相等",
            });
          }
        }
      }
    };

    //Post功能
    const postNewDetails = () => {
      api
        .post(DETAIL_LINK, {
          token: token.value,
          name: details.name,
          phone: details.phone,
          oldPassword: details.oldPassword,
          password: details.password,
        })
        .then((res) => {
          if (res.data !== undefined && res.data.code === 200) {
            $q.notify({
              type: "success",
              message: "保存成功",
            });
            cancel();
          }
          if (res.data.code !== 200) {
            $q.notify({
              type: "error",
              message: res.data.message,
            });
          }
        });
    };

    watch(isLoading, (newState, _) => {
      if (newState) {
        $q.loading.show({
          message: '页面加载中',
        })
      }
      else {
        $q.loading.hide()
      }
    })

    onMounted(() => {
      getDetails();
    });

    return {
      save,
      cancel,
      details,
      readySubmit,
      checkInput,
      postNewDetails,
      isPhoneNumber
    };
  },
});
</script>
