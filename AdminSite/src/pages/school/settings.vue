<template>
  <div class="q-pa-md" style="margin-left:10%; margin-right:10%;">
    <h4 style="border-bottom: 0.1px solid;">设置</h4>
    <div class="q-gutter-md" style="max-width: 100%">
      <q-input filled label="真实姓名" disable v-model="validName" />
      <q-input filled label="用户名" v-model="name"/>
      <q-input filled label="联络号码" stack-label v-model="phone" />
      <q-input filled label="输入旧密码" v-model="oldPassword" type="password" required />
      <q-input filled label="输入新密码" v-model="newPassword" type="password" required />
      <q-input filled label="确定新密码" v-model="confirmPassword" type="password" required />
      
      <div style="margin-left:45%;">
        <q-btn style="margin-right:10px;" color="red" @click="cancel()">取消</q-btn>
        <q-btn color="green" @click="save()">保存</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import { api } from 'boot/axios'

export default defineComponent({
  setup () {
    const validName = ref('庄家菘');
    const name = ref('小小');
    const phone = ref('1881332025');
    const oldPassword = ref();
    const newPassword = ref();
    const confirmPassword = ref();

    const cancel = () => {
        console.log("cancel")
      };
          
    const save = () => {
      if ((newPassword.value == confirmPassword.value) && (oldPassword.value !== undefined || oldPassword.value.length == 0)){
        console.log("pass");
        console.log(oldPassword.value)
      }
      else{
        console.log("password incorrect")
        console.log(oldPassword.value)
      }
          
    };

    // const details = ref([]);
    // const getDetails = async () => {
    //   try {
    //     const response = await api.get("link");
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
    //   newPassword: newPassword.value，

    // }).then ((res) => {
      // if (res.status === 200 && res.data !== undefined) {
      //     updateToken(res.data.token);
      // }
      // if (res.status === 404){
      //   console.log('error')
      // }
    //  
    // })

    return {
      save,
      cancel,
      name,
      validName,
      phone,
      oldPassword,
      newPassword,
      confirmPassword
    }
  }
})
</script>
