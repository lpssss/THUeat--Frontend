<template>
  <div class="background"></div>
  <q-page padding class="row items-center justify-center">
    <q-card class="login-card">
      <h6 align="center">让我们开始吧!</h6>
      <div class="q-pa-md">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="nickname"
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
            <q-checkbox v-model="acceptpw" label="记住密码" />
            <q-checkbox v-model="acceptclause" label="接受条款" />
          </div>

          <div class="row justify-evenly">
            <div>
              <q-btn
                align="right"
                label="登录"
                type="submit"
                color="primary"
                :loading="onsubmit"
              />
            </div>
            <div>
              <router-link to="/register">还没有账号？点我注册</router-link>
              <router-view></router-view>
            </div>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
// import EssentialLink from "../components/EssentialLink";
export default {
  //components: {EssentialLink},
  data() {
    return {
      nickname: null,
      password: null,
      isPwd: true,
      acceptpw: false,
      acceptclause: false,
      onsubmit: false,
    };
  },

  methods: {
    onSubmit() {
      if (this.acceptclause !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请先接受条款",
          timeout: 500,
        });
      } else {
        this.onsubmit = true;
        let data = {
          nickname: this.nickname,
          password: this.password,
        };
        /* this.$http.post("http://localhost:3000/users", data)
        .then((req) => {

          console.log(req);
        })
        .catch(err=>{
          console.log(err);
        }); */
        //this.$store.dispatch('user/asyncSetuserInfo',req.data.token)
        this.onsubmit = false;
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "登录成功",
          timeout: 500,
        });
        this.$store.commit("login/updateLoginStatus", true);
        this.$router.push({ name: "Index" }); //编程式导航
      }
    },
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
.login-card
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%,-50%)
  width: 28rem
  height: 28rem
  border-radius: 10px
</style>
