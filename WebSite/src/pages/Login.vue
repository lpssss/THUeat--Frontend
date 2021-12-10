<template>
  <div>
    <div class="background"></div>
    <q-page padding class="row items-center justify-center">
      <q-card class="login-card">
        <h6 align="center">让我们开始吧!</h6>
        <div class="q-pa-md">
          <q-form  class="q-gutter-md">
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
              <!--            <q-checkbox v-model="acceptpw" label="记住密码" />-->
              <q-checkbox v-model="acceptclause" label="接受条款" />
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
                <!--              <router-view></router-view>-->
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
import { useStore } from "vuex";

const { updateToken, updateType, resetState, getToken } = useAppState();

export default defineComponent({
  setup () {
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    const name = ref('Alice');
    const password = ref('alicepassword');
    const isPwd = ref(true);
    const acceptclause = ref(false);


    const login = async () => {
      if (name.value.length > 0 && password.value.length >= 6) {
        await axios.post('https://linja19.pythonanywhere.com/api/authorization', {
          userName: name.value,
          password: password.value

        }).then((res) => {
          console.log(res)
          if (res.data.code === 200 && res.data !== undefined) {
            updateToken(res.data.data.token);
            updateType(res.data.data.type);
            console.log(getToken())
            store.commit("login/updateLoginStatus",true)
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
              message: "用户名不存在或密码错误",
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
          message: "请接受条款",
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
.login-card
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%,-50%)
  width: 28rem
  height: 28rem
  border-radius: 10px
</style>
