<template>
  <q-page>
    <q-carousel arrows animated v-model="slide" height="400px">
      <template v-if="noticeData.data.length">
        <HomePageAnnouncementSection
          v-for="notice in noticeData.data"
          v-bind="notice"
          :key="notice.name"
        />
      </template>
      <template v-else>
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <div class="text-center text-h5 q-pa-md" style="opacity: 0.5">暂无通告</div>
        </q-carousel-slide>
      </template>
    </q-carousel>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="homePageBanner.stall" />
    </div>
    <template v-if="stallData.data.length">
      <div class="q-pa-md row items-start q-gutter-md justify-center">
        <StallCardSection
          v-for="stall in stallData.data"
          v-bind="stall"
          :key="stall.stallID"
        />
      </div>
    </template>
    <template v-else>
      <div class="text-center text-h5 q-pa-md" style="opacity: 0.5">
        暂无高分档口
      </div>
    </template>
    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="homePageBanner.dish" />
    </div>
    <template v-if="dishData.data.length">
      <div class="q-pa-md row items-start q-gutter-md justify-center">
        <DishCardSection
          v-for="dish in dishData.data"
          v-bind="dish"
          :key="dish.dishID"
          v-on:likeChange="refreshDishData($event)"
        />
      </div>
    </template>
    <template v-else>
      <div class="text-center text-h5 q-pa-md" style="opacity: 0.5">
        暂无高点赞菜品
      </div>
    </template>
  </q-page>
</template>

<script>
import { ref, defineComponent, reactive, watch } from "vue";
import { api } from "boot/axios";
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";
import DishCardSection from "components/HomePage/DishCardSection";
import StallCardSection from "components/HomePage/StallCardSection";
import BannerSection from "components/Layout/BannerSection";
import { useQuasar } from "quasar";

const homePageBanner = {
  stall: {
    content: "高分档口推荐",
    change: false,
  },
  dish: {
    content: "高点赞菜品",
    change: false,
  },
};

export default defineComponent({
  name: "Index",
  components: {
    HomePageAnnouncementSection,
    BannerSection,
    DishCardSection,
    StallCardSection,
  },
  methods: {
    refreshDishData() {
      this.getDishData();
    },
  },
  setup() {
    const $q = useQuasar();
    const DISH_API_LINK = "dishes";
    const STALL_API_LINK = "stalls";
    const NOTICE_API_LINK = "notice";

    const dishData = reactive({ data: [] });
    const stallData = reactive({ data: [] });
    const noticeData = reactive({ data: [] });
    const dishLoading = ref(true);
    const noticeLoading = ref(true);
    const stallLoading = ref(true);
    $q.loading.show({
      message: "页面加载中",
    });

    watch(
      [dishLoading, stallLoading, noticeLoading],
      ([dishLoading, stallLoading, noticeLoading], _) => {
        if (!dishLoading && !stallLoading && !noticeLoading) $q.loading.hide();
      }
    );

    const getDishData = async () => {
      try {
        const response = await api.get(DISH_API_LINK);
        dishData.data = response.data.data;
        console.log(response);
        dishLoading.value = false;
      } catch (err) {
        $q.notify({
          type: "error",
          message: "获取菜品数据失败，请刷新页面重试",
        });
      }
    };

    const getStallData = async () => {
      try {
        const response = await api.get(STALL_API_LINK);
        stallData.data = response.data.data;
        stallLoading.value = false;
        console.log(response);
      } catch (err) {
        $q.notify({
          type: "error",
          message: "获取档口数据失败，请刷新页面重试",
        });
      }
    };

    const getNoticeData = async () => {
      try {
        const response = await api.get(NOTICE_API_LINK);
        noticeData.data = response.data.data;
        noticeLoading.value = false;
        console.log(response);
        let i = 1;
        for (let key in noticeData.data) {
          noticeData.data[key]["name"] = i;
          i += 1;
        }
      } catch (err) {
        $q.notify({
          type: "error",
          message: "获取公告数据失败，请刷新页面重试",
        });
      }
    };

    getDishData();
    getStallData();
    getNoticeData();

    return {
      getDishData,
      homePageBanner: homePageBanner,
      dishData,
      stallData,
      noticeData,
      slide: ref(1),
      slide2: ref("first"),
    };
  },
});
</script>

<style lang="scss" scoped></style>
