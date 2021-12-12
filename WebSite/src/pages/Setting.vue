<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="settingPageBanners.setting" />
    </div>

    <div
      class="q-pa-md" 
      align="center"
    >
      <q-avatar size="100px" font-size="52px" text-color="white">
        <img :src="userDetailData.data.userImage" alt="头像" />
      </q-avatar>
      <div class="q-pt-md row justify-center items-center">
        <q-file
          class="q-pa-md item-center"
          align="center"
          style="max-width: 150px"
          name="poster_file"
          v-model="image"
          filled
          label="上传头像"
        />
      </div>
    </div>

    <div class="q-pt-none row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">用户名</div>
      <div class="col-4 q-pt-md">
        <q-input
          v-model="user"
          :label="userDetailData.data.userName"
          hint="提示"
          counter
          maxlength="12"
          :dense="dense"
        />
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">身份</div>
      <div class="col-4">
        <q-select v-model="identityModel" :options="options" label="请选择您的身份" />
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">电话</div>
      <div class="col-4">
        <q-input v-model="telephone" :label="userDetailData.data.userPhone" type="tel" :dense="dense" />
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">邮箱</div>
      <div class="col-4">
        <q-input
          v-model="email"
          :label="userDetailData.data.userEmail"
          type="email"
          :dense="dense"
        />
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pb-lg text-black" align="center">
      <div class="q-pt-md">
        <q-btn @click="postNewDetails()">确认更改个人信息</q-btn>
      </div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">原密码</div>
      <div class="col-4">
        <q-input
          v-model="passwordOld"
          standard
          :type="isPwdOld ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwdOld ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwdOld = !isPwdOld"
            />
          </template>
        </q-input>
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">新密码</div>
      <div class="col-4">
        <q-input
          v-model="password"
          standard
          :type="isPwd ? 'password' : 'text'"
          hint="提示"
          counter
          maxlength="18"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-4 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pb-lg text-black" align="center">
      <div class="q-pt-md">
        <q-btn @click="postNewPassword()">确认更改密码</q-btn>
      </div>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="settingPageBanners.historyComment" />
    </div>

    <div class="q-pa-md">
      <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
        <CommentCardSection
          v-for="review in userDetailData.data.myReviews"
          v-bind="review"
          :key="review.title"
        />
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";
import CommentCardSection from "components/StallPage/CommentCardSection";
import BannerSection from "components/Layout/BannerSection";
import StallCardSection from "components/HomePage/StallCardSection";
import { api } from 'boot/axios'

const settingPageBanners = {
  setting: {
    content: "个人信息设置",
    change: false
  },
  historyComment: {
    content: "我的历史评价",
    change: false
  }
};

const options = ["清华学生", "校外人员"];

export default defineComponent({
  name: "Settings",
  components: {
    CommentCardSection,
    BannerSection
  },
  setup() {
    const password = ref(null);
    const passwordOld = ref(null);
    const identityModel = ref("清华学生");
    const telephone = ref();
    const email = ref();
    const user = ref();
    const image = ref();

    const API_LINK = "user/details"; // 之后放真正的API
    const userDetailData = reactive({ data: {} });
    const getUserData = async () => {
      try {
        const response = await api.get(API_LINK);
        userDetailData.data = response.data.data;
      } catch (err) {
        console.log(err.message);
      }
    };

    const postNewDetails = () => {
      //console.log(user.value)
      api.post('users/details', {
        userName: user.value,
        userPhone: telephone.value,
        userImage: image.value,
        userEmial: email.value,
        
      }).then ((res) => {
       if (res.status === 200 ) {
           updateToken(res.data.token);
       }
      if (res.status === 404){
         console.log('error')
       }
      })
    };

    const postNewPassword = () => {
      console.log(password.value)
      api.post('users/password', {
        password: password.value,
        oldPassword: passwordOld.value,
      }).then ((res) => {
        if (res.status === 200 ) {
            updateToken(res.data.token);
        }
        if (res.status === 404){
          console.log('error')
        }
      })
    };


    getUserData();
    return {
      settingPageBanners: settingPageBanners,
      identityModel,
      isPwd: ref(true),
      isPwdOld: ref(true),
      options: options,
      text: ref("******"),
      userDetailData,
      password,
      passwordOld,
      telephone,
      email,
      user,
      image,
      postNewDetails,
      postNewPassword,
    }
  }
});
</script>
