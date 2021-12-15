<template>
<q-page>
  <div class="background"></div>
  <q-page class="q-pa-md row items-center justify-center">
    <q-card class="col-md-3 col-xs-10 ">
      <div class="q-pa-md ">
        <div class="row justify-center text-h5 q-pa-md">让我们加入吧！</div>
        <q-form class="q-gutter-sm " >
          <q-input
            v-model="name"
            :rules="[(val) => (val && val.length > 0) || '请输入你的昵称']"
            label="昵称"
            lazy-rules
            counter
            maxlength="20"
          />

          <q-input
            v-model="email"
            type="email"
            label="邮箱"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '请输入你的邮箱']"
          >

          </q-input>

          <q-input
            v-model="tel"
            type="tel"
            label="手机号"
            lazy-rules
            :rules="[ val => val && val.length === 11 || '请输入你的手机号']"
          />

          <q-input
            v-model="password"
            :rules="[
              (val) => (val && val.length >= 6) || '密码长度不能少于6位',
            ]"
            :type="isPwd ? 'password' : 'text'"
            label="密码"
            lazy-rules
            counter
            maxlength="20"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            v-model="repeat_password"
            :rules="[(val) => val === password || '两次输入密码不一致']"
            :type="isPwd ? 'password' : 'text'"
            label="确认密码"
            lazy-rules
            counter
            maxlength="20"
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
            <q-checkbox v-model="acceptclause" label="接受条款" />
          </div>

          <div class="row justify-evenly">
            <div>
              <q-btn align="right" color="primary" label="注册" @click="onRegister"  />
              <q-dialog v-model="authForm" persistent transition-show="scale" transition-hide="scale">
                <q-card style="min-width: 350px">
                  <q-card-section>
                    <div class="text-h6">验证码</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-input dense v-model="authcode" autofocus @keyup.enter="prompt = false"
                             lazy-rules
                             :rules="[ val => val && val.length === 6 || '请输入正确的验证码']"/>
                  </q-card-section>

                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="ok" @click="verification" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
            <div>
              <router-link to="/login">已有账号？点击登录</router-link>
            </div>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import useAppState from "src/store/userAppState.js";
import axios from "axios";
import { api } from "boot/axios";
import { useStore } from "vuex";

const { updateToken, updateType, resetState, getToken } = useAppState();

export default defineComponent({
  setup () {
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    const name = ref('liwei');
    const email= ref('1249103659@qq.com');
    const tel = ref('18234684756');
    const password = ref('liweipassword');
    const repeat_password = ref('liweipassword');
    const isPwd = ref(true);
    const acceptclause = ref(false);
    let authForm= ref(false)
    const authcode=ref()

    const verification=async()=>{
      if(authcode.value && authcode.value.length===6){
        await axios.post('https://linja19.pythonanywhere.com/api/users/verification', {
          userName: name.value,
          verificationNumber:authcode.value
        }).then((res) => {
          if (res.data.code === 200 ) {
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "注册成功",
              timeout: 500,
            })
            router.push('/login')
          }
          else if (res.data.code === 400 ) {
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
      else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请输入正确的验证码",
          timeout: 1000,
        });
      }

    }
    const register = async () => {
      if (name.value.length > 0 && password.value.length >= 6) {
        await axios.post('https://linja19.pythonanywhere.com/api/users/', {
          userName: name.value,
          userEmail:email.value,
          userPhone:tel.value,
          password:password.value

        }).then((res) => {
          if (res.data.code === 200 ) {
            authForm.value=true

          }
          else if (res.data.code === 400 ) {
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

    const onRegister = () => {
      if(name.value.length===0){
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请输入昵称",
          timeout: 1000,
        });
      }
      else if(email.value.length<7){
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请输入正确的邮箱",
          timeout: 1000,
        });
      }
      else if(tel.value.length!==11){
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请输入正确的手机号",
          timeout: 1000,
        });
      }
      else if(password.value.length<6){
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "密码长度最少为6位",
          timeout: 1000,
        });
      }
      else if(password.value!==repeat_password.value){
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "两次输入密码不一致",
          timeout: 1000,
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

        register()
      }
    }
    onMounted(() => {
      resetState();
    })
    return { name, email, tel, password, repeat_password, isPwd, acceptclause,  onRegister, register,authForm,authcode,verification }
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
