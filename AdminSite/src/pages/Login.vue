<template>
  <div>
    <div class="background"></div>
    <q-page
      padding
      class="row items-center justify-center"
    >
      <q-card class="col-md-3 col-xs-10">
        <h6 class="text-center">乐吃管理系统</h6>
        <div class="q-pa-md">
          <!-- <q-form class="q-gutter-md"> -->
          <div class="q-gutter-md">
            <q-input
              v-model="name"
              label="用户名"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
            />
            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="密码"
              lazy-rules
              :rules="[(val) => (val && val.length >= 6) || '密码不能少于6位']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div>
              <q-checkbox
                v-model="acceptclause"
                label="已阅读用户手册"
              />
            </div>

            <div class="row justify-evenly">
              <div>
                <q-btn
                  align="right"
                  label="登录"
                  color="primary"
                  @click="onLogin"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-page>
  </div>
</template>


<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import useAppState from "src/store/userAppState.js";
import axios from "axios";


const { updateToken, updateType, updateName, updatevalidName, resetState } = useAppState();


export default defineComponent({
  setup () {
    const router = useRouter();
    const $q = useQuasar();
    const name = ref('');
    const password = ref('');
    const isPwd = ref(true);
    const acceptclause = ref(false);

    //Post及Route功能
    const login = () => {
      if (name.value.length > 0 && password.value.length >= 6 && acceptclause.value === true) {
        axios.post('https://linja19.pythonanywhere.com/api/private/authorization', {
          name: name.value,
          password: password.value

        }).then((res) => {
          if (res.data !== undefined && res.data.code === 200) {
            updateToken(res.data.data.token);
            updateType(res.data.data.type);
            updateName(res.data.data.name);
            updatevalidName(res.data.data.validName)

            if (res.data.data.firstLogin === true) {
              // Route to First login page
              router.push("/firstLoginSettings");
            }
            else {
              // Route to normal page
              switch (res.data.data.type) {
                case "superadmin":
                  router.push('/superadmin');
                  break;
                case "admin":
                  router.push('/admin');
                  break;
                case "staff":
                  router.push('/staff');
                  break;
                default:
                  router.push('/');
              }
              $q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "登录成功",
                timeout: 1000,
              });
            }
          } else {
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: res.data.message,
              timeout: 1000,
            });

          }
        })
      }
    }

    //登入功能
    const onLogin = () => {
      if (acceptclause.value !== true) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请先阅读用户手册",
          timeout: 1000,
        });
      }
      if (name.value.length <= 0) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请填写用户名",
          timeout: 1000
        });
      }
      if (password.value.length < 6) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "密码不能小于6位数",
          timeout: 1000
        });
      }
      else {
        login()
      }
    }

    onMounted(() => {
      resetState();
    })
    return { name, password, isPwd, acceptclause, onLogin }
  }
})

</script>

<style lang="sass" scoped>
.background
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  min-width: 1000px
  z-index: -10
  zoom: 1
  background-repeat: no-repeat
  background-size: cover
  background-image: url("../assets/background.svg")
</style>

