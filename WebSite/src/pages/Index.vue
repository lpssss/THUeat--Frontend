<template>
  <q-page >
    <div class="q-pa-md">
      <q-carousel
        arrows
        animated
        v-model="slide"
        height="400px"
      >
        <HomePageAnnouncementSection
          v-for="announcement in announcements"
          v-bind="announcement"
          :key="announcement.name"
        />
      </q-carousel>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="homePageBanner.stall"/>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
      <StallCardSection
        v-for="stall in stallData.data"
        v-bind="stall"
        :key="stall.stallID"
      />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="homePageBanner.dish"/>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
      <DishCardSection
        v-for="dish in dishData.data"
        v-bind="dish"
        :key="dish.dishID"
      />   
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, reactive } from "vue"
import axios from "axios";
import { api } from "boot/axios";
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";
import DishCardSection from "components/HomePage/DishCardSection";
import StallCardSection from "components/HomePage/StallCardSection";
import BannerSection from "components/Layout/BannerSection";

const announcements = [
  {
    name: "first",
    title: "新品广告",
    content: "烤羊肉串是新疆人喜爱的风味小吃，肉质鲜嫩，味咸辣，广受人们欢迎。",
    //imgSrc: "pictures/yangrouchuan.jpg"
    imgSrc: "https://cdn.quasar.dev/img/avatar.png"
  },
  {
    name: "second",
    title: "特色推荐",
    content: "清青小火锅自开业以来便受到广大师生的青睐，并被学校评为“2015年度后勤优质服务项目",
    //imgSrc: "pictures/xiaohuoguo.jpg"
    imgSrc: "https://cdn.quasar.dev/img/avatar.png"
  },
  {
    name: "third",
    title: "食堂营业变更",
    content: "2021年寒假食堂停伙安排",
    //imgSrc: "pictures/tinghuo.webp"
    imgSrc: "https://cdn.quasar.dev/img/avatar.png"
  },
];

const homePageBanner = {
  stall:{
    content: "高分档口推荐",
    change: true
  },
  dish:{
    content: "高点赞菜品",
    change: true
  }
};

export default defineComponent({
  name: "Index",
  components: {
    HomePageAnnouncementSection,
    BannerSection,
    DishCardSection,
    StallCardSection,
  },
  setup () {
    
    const DISH_API_LINK = "dishes";
    const STALL_API_LINK = "stalls";

    const dishData = reactive({ data: {} });
    const stallData = reactive({ data: {} });

    const getDishData = async () => {
      try {
        const response = await api.get(DISH_API_LINK);
        dishData.data = response.data.data;
      } catch (err) {
        console.log(err.message);
        $q.notify({
          type: "error",
          message: "获取数据失败，请刷新页面重试",
        });
      }
    };
    const getStallData = async () => {
      try {
        const response = await api.get(STALL_API_LINK);
        stallData.data = response.data.data;
      } catch (err) {
        console.log(err.message);
      }
    };

    getDishData();
    getStallData();
    
    return {
      slide: ref('first'),
      announcements: announcements,
      homePageBanner: homePageBanner,
      dishData,
      stallData,
    }
  }
})

</script>

<style lang="scss" scoped>


</style>