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
      <BannerSection v-bind="canteenPageBanner.information" />
    </div>

    <div class="q-pa-md">
      <CanteenBasicDetailSection
        :canteen-address="canteenData.data.canteenAddress"
        :contacts="canteenData.data.canteenPhone"
        :operation-time="canteenData.data.canteenOperationTime"
      />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="canteenPageBanner.introduction" />
    </div>

    <div class="q-pa-md">
      <CanteenIntroSection :intro="canteenData.data.canteenIntro" />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="canteenPageBanner.stalls" />
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
      <template v-if="canteenData.data.stalls.length">
        <StallCardSection
          v-for="stall in canteenData.data.stalls"
          v-bind="stall"
          :canteen-name="canteenData.data.canteenName"
          :key="stall.stallID"
        />
      </template>
      <template v-else>
        <div class="text-center text-h5 q-pa-md" style="opacity: 0.5">
          暂无档口
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { api } from "boot/axios";
import { useRoute } from "vue-router";
import CanteenBasicDetailSection from "components/CanteenPage/CanteenBasicDetailSection";
import CanteenIntroSection from "components/CanteenPage/CanteenIntroSection";
import CanteenTitleSection from "components/CanteenPage/CanteenTitleSection";
import BannerSection from "components/Layout/BannerSection";
import { useQuasar } from "quasar";
import StallCardSection from "components/HomePage/StallCardSection";

const canteenPageBanner = {
  information: {
    content: "基本信息",
    change: false,
  },
  introduction: {
    content: "食堂简介",
    change: false,
  },
  stalls: {
    content: "档口",
    change: false,
  },
};

export default defineComponent({
  name: "PublicCanteen",
  components: {
    StallCardSection,
    BannerSection,
    CanteenTitleSection,
    CanteenIntroSection,
    CanteenBasicDetailSection,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    let id = route.query.canteenID;
    let API_LINK = `canteens/${id}`;
    const canteenData = reactive({ data: {} });
    const getCanteenData = async () => {
      try {
        const response = await api.get(API_LINK);
        canteenData.data = response.data.data;
      } catch (err) {
        $q.notify({
          type: "error",
          message: "获取食堂信息失败，请刷新重试",
        });
      }
    };
    watch(
      () => route.query,
      () => {
        id = route.query.canteenID;
        if (id !== undefined) {
          API_LINK = `canteens/${id}`;
          getCanteenData();
        }
      },
      {
        immediate: true,
      }
    );

    return {
      canteenData,
      canteenPageBanner: canteenPageBanner,
    };
  },
});
</script>
