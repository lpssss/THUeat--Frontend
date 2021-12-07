<template>
  <div class="background"></div>
  <q-page class="row items-center justify-center">
    <q-card class="register-card ">
      <div class="q-pa-md ">
        <div class="row justify-center text-h5 q-pa-md">让我们加入吧！</div>
        <q-form class="q-gutter-md" @submit="onSubmit">
          <q-input
            v-model="model.nickname"
            :rules="[(val) => (val && val.length > 0) || '请输入你的昵称']"
            label="昵称"
            lazy-rules
          />

          <q-input
            v-model="model.email"
            type="email"
            label="邮箱"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '请输入你的邮箱']"
          >
            <template v-slot:after>
              <q-btn dense flat color="purple" icon="send" label="发送验证码" @click="sendauthcode"/>
            </template>
          </q-input>

          <q-input
            v-model="model.authcode"
            type="text"
            label="邮箱验证码"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '请输入你的邮箱验证码']"
          />

          <q-input
            v-model="model.password"
            :rules="[
              (val) => (val && val.length >= 6) || '密码长度不能少于6位',
            ]"
            :type="isPwd ? 'password' : 'text'"
            label="密码"
            lazy-rules
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
            v-model="password"
            :rules="[(val) => val === model.password || '两次输入密码不一致']"
            :type="isPwd ? 'password' : 'text'"
            label="确认密码"
            lazy-rules
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
            <q-checkbox v-model="accept" label="接受条款" />
          </div>

          <div class="row justify-evenly">
            <div>
              <q-btn align="right" color="primary" label="注册" type="submit" />
            </div>
            <div>
              <router-link to="/login">已有账号？点击登录</router-link>
            </div>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
//import EssentialLink from "../components/EssentialLink";
export default {
  //components: {EssentialLink},
  data() {
    return {
      password: "",
      isPwd: true,
      accept: false,
      model: {
        nickname: "",
        email:"",
        authcode:"",
        password: "",
      },
    };
  },

  methods: {
    sendauthcode(){

    },
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请先接受条款",
        });
      } else {
        let form = {
          nickname: this.model.nickname,
          password: this.model.password,
        };
        this.$http
          .post("http://localhost:3000/users", this.model)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "注册成功",
          timeout: 1000,
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
      }
    },
    /*sendauthcode(){
      let from={
        email:this.model.username,
        actions:"注册"
      }
      this.$http.post('authcode',from).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    }*/
  },
};
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

.register-card
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  width: 28rem
  height: 41rem
  border-radius: 10px
</style>
