<template>
  <div>
    <div class="background"></div>
    <q-page
      padding
      class="row items-center justify-center"
    >
      <q-card class="login-card">
        <h6 align="center">乐吃管理系统</h6>
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
                label="接受条款"
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
import { defineComponent, ref } from 'vue';
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import useAppState from "src/store/userAppState.js";
import { api } from 'boot/axios'


const { updateToken, updateFirstLogin, updateType } = useAppState();


export default defineComponent({
  setup () {
    const router = useRouter();
    const $q = useQuasar();
    const name = ref('用户名');
    const password = ref('123456');
    const isPwd = ref(true);
    const acceptclause = ref(true);


    const login = async () => {
      const res = await api.get("/user");
      await api.get('/user').then((res) => {
        if (res.status === 200 && res.data !== undefined) {
          updateToken(res.data.token);
          updateType(res.data.type);
          if (res.data.firstLogin === true) {

            console.log('first')
            // Route to First login page
            router.push("/firstLoginSettings");
          }
          else {
            // Route to normal page
            switch (res.data.type) {
              case "super":
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
              timeout: 500,
            });
          }
        }
      })
    }



    const onLogin = () => {
      if (acceptclause.value !== true) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请接受条款",
          timeout: 500,
        });
      }
      if (name.value.length <= 0) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请填些用户名",
          timeout: 500
        });
      }
      else {
        login()

        // const login = async () => {
        //   console.log('b');

        //   const res = await api.get("/user");
        //   console.log(res);

        // await api.get('/user').then((res) => {



        //   if (res.status === 200 && res.data !== undefined) {
        //     updateToken(res.data.token);
        //     updateType(res.data.type);
        //     if (res.data.firstLogin === true) {
        //       // Route to First login page
        //       router.push({ path: 'firstLoginSettings' })
        //     }
        //     else {
        //       // Route to normal page
        //       switch (res.data.type) {
        //         case "super":
        //           // code block
        //           router.push({ path: 'superadmin' });
        //           break;
        //         case "admin":
        //           // code block
        //           router.push({ path: 'admin' });
        //           break;
        //         case "staff":
        //           // code block
        //           router.push({ path: 'staff' });
        //           break;
        //         default:
        //           // code block
        //           router.push({ path: '/' });
        //       }
        //       // this.$q.notify({
        //       //   color: "green-4",
        //       //   textColor: "white",
        //       //   icon: "cloud_done",
        //       //   message: "登录成功",
        //       //   timeout: 500,
        //       // });
        //     }
        //   }
        // })
        //}
      }
    }
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

