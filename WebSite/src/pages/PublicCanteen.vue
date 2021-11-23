<template>
  <div v-if="Object.keys(canteenData.data).length">
    <!-- 取了数据才渲染 -->
    <div class="q-pa-md">
      <CanteenTitleSection
        :canteen-name="canteenData.data.canteenName"
        :rating="canteenData.data.canteenRate"
        :canteen-img="canteenData.data.canteenImage"
      />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="canteenPageBanner.information"/>
    </div>

    <div class="q-pa-md">
      <CanteenBasicDetailSection
        :canteen-address="canteenData.data.canteenAddress"
        :contacts="canteenData.data.canteenPhone"
        :operation-time="canteenData.data.canteenOperationtime"
      />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="canteenPageBanner.introduction"/>
    </div>

    <div class="q-pa-md">
      <CanteenIntroSection :intro="canteenData.data.canteenIntro" />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="canteenPageBanner.stalls"/>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
      <CanteenStallSection
        v-for="stall in canteenData.data.stalls"
        v-bind="stall"
        :key="stall.stallID"
      />
    </div>

  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import axios from "axios";
import CanteenBasicDetailSection from "components/CanteenPage/CanteenBasicDetailSection";
import CanteenIntroSection from "components/CanteenPage/CanteenIntroSection";
import CanteenTitleSection from "components/CanteenPage/CanteenTitleSection";
import CanteenStallSection from "components/CanteenPage/CanteenStallSection";
import StallCardSection from "components/HomePage/StallCardSection";
import BannerSection from "components/Layout/BannerSection";

const canteenPageBanner = {
  information:{
    content: "基本信息",
    change: true
  },
  introduction:{
    content: "食堂简介",
    change: true
  },
  stalls: {
    content: "档口",
    change: false
  }
};

export default defineComponent({
  name: "PublicCanteen",
  components: {
    BannerSection,
    CanteenStallSection,
    CanteenTitleSection,
    CanteenIntroSection,
    CanteenBasicDetailSection,
  },
  setup() {
    const API_LINK = "http://localhost:3000/canteens/?canteenID=c1"; // 之后放真正的API
    const canteenData = reactive({ data: {} });
    const getCanteenData = async () => {
      try {
        const response = await axios.get(API_LINK);
        canteenData.data = response.data[0];
      } catch (err) {
        console.log(err.message);
      }
    };
    getCanteenData();

    return {
      canteenData,
      canteenPageBanner: canteenPageBanner,
    };
  },
});
</script>
