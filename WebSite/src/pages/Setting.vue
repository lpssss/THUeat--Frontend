<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="settingPageBanners.setting" />
    </div>

    <div class="q-pa-md" align="center">
      <q-avatar size="100px" font-size="52px" text-color="white">
        <img :src="userDetailData.data.userImage" alt="头像" />
      </q-avatar>
      <div class="q-pt-md row justify-center items-center">
        <ImagesUploader ref="imageUploader" @addedImages="addImages" />
      </div>
    </div>

    <div class="q-pt-none row justify-start items-center">
      <div class="col-3 q-pr-lg text-subtitle1" align="right">用户名</div>
      <div class="col-7 q-pt-md">
        <q-input
          v-model="user"
          counter
          maxlength="20"
          :dense="dense"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
        >
          <template v-slot:append>
            <q-icon name="close" @click="user = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <div class="col-2 text-h6 q-pr-md" align="right"></div>
    </div>
 
    <div class="q-pa-md row justify-start items-center">
      <div class="col-3 q-pr-lg text-subtitle1" align="right">电话</div>
      <div class="col-7">
        <q-input v-model="telephone" type="tel" :dense="dense">
          <template v-slot:append>
            <q-icon
              name="close"
              @click="telephone = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </div>
      <div class="col-2 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-3 q-pr-lg text-subtitle1" align="right">邮箱</div>
      <div class="col-7">
        <q-input v-model="email" type="email" :dense="dense" readonly>
        </q-input>
      </div>
      <div class="col-2 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pb-lg text-black" align="center">
      <div class="q-pt-md">
        <q-btn @click="postNewDetails">确认更改个人信息</q-btn>
      </div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-3 q-pr-lg text-subtitle1" align="right">原密码</div>
      <div class="col-7">
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
      <div class="col-2 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-3 q-pr-lg text-subtitle1" align="right">新密码</div>
      <div class="col-7">
        <q-input
          v-model="password"
          standard
          :type="isPwd ? 'password' : 'text'"
          counter
          maxlength="20"
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
      </div>
      <div class="col-2 text-h6 q-pr-md" align="right"></div>
    </div>

    <div class="q-pb-lg text-black" align="center">
      <div class="q-pt-md">
        <q-btn @click="postNewPassword">确认更改密码</q-btn>
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
import { useQuasar } from "quasar";
import useAppState from "src/store/userAppState.js";
import CommentCardSection from "components/StallPage/CommentCardSection";
import BannerSection from "components/Layout/BannerSection";
import StallCardSection from "components/HomePage/StallCardSection";
import { api } from "boot/axios";
import ImagesUploader from "components/ImagesUploader";

const { updateToken } = useAppState();

const settingPageBanners = {
  setting: {
    content: "个人信息设置",
    change: false,
  },
  historyComment: {
    content: "我的历史评价",
    change: false,
  },
};

export default defineComponent({
  name: "Settings",
  components: {
    ImagesUploader,
    CommentCardSection,
    BannerSection,
  },
  setup() {
    const $q = useQuasar();
    const password = ref(null);
    const passwordOld = ref(null);
    const identityModel = ref("清华学生");
    const telephone = ref();
    const email = ref();
    const user = ref();
    const image = ref();
    const imageUploader = ref(null);
    const newImage = ref(null);

    const API_LINK = "users/details";
    const userDetailData = reactive({ data: {} });
    const getUserData = async () => {
      try {
        const response = await api.get(API_LINK);
        userDetailData.data = response.data.data;
        email.value = userDetailData.data.userEmail;
        user.value = userDetailData.data.userName;
        telephone.value = userDetailData.data.userPhone;
        password.value = null;
        passwordOld.value = null;
      } catch (err) {
        console.log(err.message);
      }
    };

    const addImages = (images) => {
      newImage.value = images.value;
    };

    const postNewDetails = () => {
      //console.log(user.value)
      let formData = new FormData();
      formData.append("userName", user.value);
      formData.append("userEmail", email.value);
      formData.append("userPhone", telephone.value);
      if (newImage.value !== null) formData.append("userImage", newImage.value);
      else formData.append("userImage", "");
      //用来检查formData里面的数据
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      //console.log(telephone.value)
      //console.log(formData.entries())
      api.post(API_LINK, formData).then((res) => {
        // TODO POST了过后怎么处理response 写在这里
        if (res.data.code === 200) {
          getUserData();
          //上传成功后，清空Image Uploader包含的图片
          imageUploader.value.clearInput();
          $q.notify({
            type: "success",
            message: "修改个人信息成功",
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            timeout: 500,
          });
        }
        if (res.data.code !== 200) {
          console.log("error");
          console.log(res);
          $q.notify({
            type: "error",
            message: res.data.message,
            color: "red-5",
            textColor: "white",
            icon: "warning",
            timeout: 1000,
          });
        }
      });
    };

    const postNewPassword = () => {
      api
        .post("users/password", {
          password: password.value,
          oldPassword: passwordOld.value,
        })
        .then((res) => {
          if (res.data.code === 200) {
            //updateToken(res.data.token);
            password.value = null;
            passwordOld.value = null;
            getUserData();
            $q.notify({
              type: "success",
              message: "修改密码成功",
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              timeout: 500,
            });
          }
          if (res.data.code !== 200) {
            console.log("error");
            $q.notify({
              type: "error",
              message: res.data.message,
              color: "red-5",
              textColor: "white",
              icon: "warning",
              timeout: 1000,
            });
          }
        });
    };

    getUserData();
    return {
      settingPageBanners: settingPageBanners,
      identityModel,
      isPwd: ref(true),
      isPwdOld: ref(true),
      userDetailData,
      password,
      passwordOld,
      telephone,
      email,
      user,
      image,
      imageUploader,
      addImages,
      postNewDetails,
      postNewPassword,
    };
  },
});
</script>
