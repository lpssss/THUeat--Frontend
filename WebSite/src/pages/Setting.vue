<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="settingPageBanners.setting" />
    </div>

    <div class="q-pa-md" align="center">
      <q-avatar size="100px" font-size="52px" text-color="white">
        <img :src="userDetailData.data.userImage" alt="头像" />
      </q-avatar>
      <div class="q-pt-md">
        <q-btn>更换头像</q-btn>
      </div>
    </div>

    <div class="q-pa-md row justify-start items-center">
      <div class="col-4 q-pr-lg text-subtitle1" align="right">用户名</div>
      <div class="col-4 q-pt-md">
        <q-input
          v-model="ph"
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
      <div class="col-4 q-pr-lg text-subtitle1" align="right">原密码</div>
      <div class="col-4">
        <q-input clearable standard v-model="text" />
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
        <q-input
          v-model="tel"
          :label="userDetailData.data.userPhone"
          type="tel"
          :dense="dense"
        />
        
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

    <div class="q-pb-lg text-red" align="center">
      <div class="q-pt-md">
        <q-btn>确认更改</q-btn>
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

    <div class="q-pb-lg text-red" align="center">
      <div class="q-pt-md">
        <q-btn>退出登录</q-btn>
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

const stallComments = [
  //这里为了方便，复用stall卡片，把评价的菜品输入到canteenName属性
  {
    stallName: "东北风味",
    canteenName: "小鸡炖蘑菇",
    score: 4,
    comment:
      "这是一条精选的很长的评价这是一条精选的很长的评价这是一条精选的很长的评价这是一条精选的很长的评价这是一条精选的很长的评价",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png"
  },
  {
    stallName: "川渝风味",
    canteenName: "观畴",
    score: 4.5,
    scoreAmount: 356,
    comment:
      "如果暂无用户评价，这是一条默认的档口描述。如果暂无用户评价，这是一条默认的档口描述",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png"
  }
];

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
    const API_LINK = "http://localhost:3000/usersDetails"; // 之后放真正的API
    const userDetailData = reactive({ data: {} });
    const getUserData = async () => {
      try {
        const response = await axios.get(API_LINK);
        userDetailData.data = response.data;
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserData();
    return {
      settingPageBanners: settingPageBanners,
      identityModel: ref("清华学生"),
      options: options,
      text: ref("******"),
      userDetailData,
    };
  }
});
</script>
