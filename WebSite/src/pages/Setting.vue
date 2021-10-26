<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-banner inline-actions class="text-black bg-grey-3">
          个人信息设置  
      </q-banner>
    </div>

    <div class="q-pa-md" align="center">
      <q-avatar size="100px" font-size="52px" text-color="white">
         <img src="https://cdn.quasar.dev/img/avatar.png" alt="头像">
      </q-avatar>
      <div class="q-pt-md">
        <q-btn>
          更换头像
        </q-btn>
      </div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">
        用户名
      </div>
      <div class="col-4 q-pt-md">
        <q-input v-model="ph" placeholder="乐吃" hint="一些提示" counter maxlength="12" :dense="dense" />
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right">
        
      </div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">
        密码
      </div>
      <div class="col-4">
        <q-input v-model="password" standard :type="isPwd ? 'password' : 'text'" hint="一些提示" counter maxlength="18">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right">
        
      </div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">
        身份
      </div>
      <div class="col-4">
        <q-select v-model="identityModel" :options="options" label="请选择您的身份" /> 
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right">
        
      </div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">
        电话
      </div>
      <div class="col-4">
        <q-input v-model="tel" placeholder="18888888888" type="tel" :dense="dense" />
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right">
        
      </div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">
        邮箱
      </div>
      <div class="col-4">
        <q-input v-model="email" placeholder="lechi@lechi.com" type="email" :dense="dense" />
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right">
        
      </div>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-banner inline-actions class="text-black bg-grey-3">
          我的历史评分  
      </q-banner>
    </div>  
    
    <div class="q-pa-md">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quod porro sunt ipsam in. Quibusdam, hic est! Animi beatae odit ut cum laborum quos id. Provident sequi porro doloribus temporibus.
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-banner inline-actions class="text-black bg-grey-3">
          我的历史评语  
      </q-banner>
    </div>

    <div class="q-pa-md">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quod porro sunt ipsam in. Quibusdam, hic est! Animi beatae odit ut cum laborum quos id. Provident sequi porro doloribus temporibus.
    </div>

    <div class="q-pb-lg text-red" align="center">
      <div class="q-pt-md">
        <q-btn>
          退出登录
        </q-btn>
      </div>
    </div>
  </q-page>

</template>
<script>
import { defineComponent, ref } from 'vue';

export default {
  name: 'Settings',
  setup () {
    return {
      identityModel: ref('清华学生'),
      options: [
        '清华学生','工作人员', '校外人员'
      ]
    }
  }
}
</script>
