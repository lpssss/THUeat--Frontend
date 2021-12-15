<template>
  <div>
    <div class="background"></div>
    <q-page padding class="row items-center justify-center">
      <q-card class="col-md-3 col-xs-10">
        <h6 class="text-center">让我们开始吧!</h6>
        <div class="q-pa-md ">
          <q-form  class="q-gutter-md">
            <q-input
              v-model="name"
              label="用户名"
              counter
              maxlength="20"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
            />
            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="密码"
              lazy-rules
              counter
              maxlength="20"
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
              <q-checkbox v-model="acceptclause" label="已阅读用户手册" />
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
              <div>
                <router-link to="/register">还没有账号？点我注册</router-link>
              </div>
            </div>
          </q-form>
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

const { updateToken, updateType, resetState, getToken } = useAppState();

export default defineComponent({
  setup () {
    const router = useRouter();
    const $q = useQuasar();
    const name = ref('Alice123');
    const password = ref('alicepassword');
    const isPwd = ref(true);
    const acceptclause = ref(false);


    const login = async () => {
      if (name.value.length > 0 && password.value.length >= 6) {
        await axios.post('https://linja19.pythonanywhere.com/api/authorization', {
          userName: name.value,
          password: password.value

        }).then((res) => {
          if (res.data !== undefined && res.data.code === 200) {
            updateToken(res.data.data.token);
            updateType(res.data.data.type);
            router.push("/")
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "登录成功",
              timeout: 500,
            })
          }
          else if (res.data.code === 404){
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: res.data.message,
              timeout: 1000,
            })
          }
          else if (res.data.code === 400){
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: res.data.message,
              timeout: 1000,
            })
          }
        })
      }
    }

    const onLogin = () => {
      if (name.value.length <= 0) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请填写用户名",
          timeout: 1000
        });
      }
      else if (password.value.length < 6) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "密码不能少于6位",
          timeout: 1000
        });
      }
      else if (acceptclause.value !== true) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请先阅读用户手册",
          timeout: 1000,
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
