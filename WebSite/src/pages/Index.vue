<template>
  <q-page >
    <div v-if="Object.keys(noticeData).length">
      <q-carousel
        arrows
        animated
        v-model="slide"
        height="400px"
      >
      <HomePageAnnouncementSection
          v-for="notice in noticeData.data"
          v-bind="notice"
          :key="notice.name"
        />
      </q-carousel>

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
    const NOTICE_API_LINK = "notice";

    const dishData = reactive({ data: {} });
    const stallData = reactive({ data: {} });
    const noticeData = reactive({ data: {} });

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

    const getNoticeData = async () => {
      try {
        const response = await api.get(NOTICE_API_LINK);
        noticeData.data = response.data.data;
        var i = 1
        for (var key in noticeData.data) {
          noticeData.data[key]['name'] = i;
          i += 1;
        }
        console.log(noticeData.data)
        //console.log(noticeData.data[0])
      } catch (err) {
        console.log(err.message);
      }
    };

    getDishData();
    getStallData();
    getNoticeData();

    return {
      homePageBanner: homePageBanner,
      dishData,
      stallData,
      noticeData,
      slide: ref(1),
      slide2: ref('first')
    }
  }
})

</script>

<style lang="scss" scoped>


</style>