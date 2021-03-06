<template>
  <div v-if="Object.keys(stallData.data).length">
    <div class="q-pa-md">
      <q-carousel arrows animated v-model="slide" height="400px">
        <template v-if="stallPictureData.data.length">
          <HomePageAnnouncementSection
            v-for="notice in stallPictureData.data"
            v-bind="notice"
            :key="notice.name"
          />
        </template>
        <template v-else>
          <q-carousel-slide :name="1" class="column no-wrap flex-center">
            <div class="text-center text-h5 q-pa-md" style="opacity: 0.5">
              暂无图片
            </div>
            <div class="absolute-bottom custom-caption">
              <div class="text-h5">{{ stallData.data.stallName }}</div>
              <div class="text-subtitle2">{{ stallData.data.stallDescribe }}</div>
            </div>
          </q-carousel-slide>
        </template>
      </q-carousel>
    </div>

    <div class="q-pa-md">
      <StallIntroSection
        :score="stallData.data.stallRate"
        :scoreAmount="stallData.data.stallRateNumber"
        :stallAddress="stallData.data.canteenName"
        :stallName="stallData.data.stallName"
        :stallFloor="stallData.data.stallFloor"
        :stallRate="stallData.data.stallRate"
        :stallRateNumber="stallData.data.stallRateNumber"
        :stallOperationtime="stallData.data.stallOperationtime"
        :stallID="id"
      />
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md" style="width: 100%">
        <q-tabs
          v-model="tab"
          dense
          class="text-purple-3"
          active-color="purple-5"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="dish" label="推荐菜品" />
          <q-tab name="comments" label="用餐者评价" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="dish">
            <div
              class="
                q-pa-md
                row
                items-start
                q-gutter-md
                justify-center
                col-md-4
              "
            >
              <template v-if="stallData.data.dishes.length">
                <DishCardSectionStall
                  v-for="dish in stallData.data.dishes"
                  v-bind="dish"
                  :key="dish.dishID"
                  v-on:likeChange="refreshDishData($event)"
                />
              </template>
              <template v-else>
                <div class="text-center text-h5 q-pa-md" style="opacity: 0.5">
                  暂无菜品
                </div>
              </template>
            </div>
          </q-tab-panel>

          <q-tab-panel name="comments">
            <div
              class="
                q-pa-md
                row
                items-start
                q-gutter-md
                justify-center
                col-md-4
              "
            >
              <template v-if="stallData.data.reviews.length">
                <CommentCardSection
                  v-for="review in stallData.data.reviews"
                  v-bind="review"
                  :key="review.reviewID"
                  v-on:likeChange="refreshDishData($event)"
                />
              </template>
              <template v-else>
                <div class="text-center text-h5 q-pa-md" style="opacity: 0.5">
                  暂无评价
                </div>
              </template>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, watch } from "vue";
import { api } from "boot/axios";
import { useRoute } from "vue-router";
import StallIntroSection from "components/StallPage/StallIntroSection";
import DishCardSectionStall from "components/HomePage/DishCardSectionStall";
import CommentCardSection from "components/StallPage/CommentCardSection";
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Stall",
  components: {
    StallIntroSection,
    DishCardSectionStall,
    CommentCardSection,
    HomePageAnnouncementSection,
  },
  data() {
    return {
      tab: "dish",
    };
  },
  methods: {
    refreshDishData() {
      this.getStallData();
    },
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    let id = route.query.stallID;
    let API_LINK = `stalls/${id}`; // 之后放真正的API

    const stallData = reactive({ data: {} });
    const stallPictureData = reactive({ data: [] });

    const getStallData = async () => {
      try {
        const response = await api.get(API_LINK);
        stallData.data = response.data.data;
        //stallData.data.stallName;
        //stallData.data.stallDescribe
        let i = 1;
        stallData.data.stallImages.forEach((item) => {
          stallPictureData.data.push({
            noticeTitle: stallData.data.stallName,
            noticeWords: stallData.data.stallDescribe,
            noticeImage: item,
            name: i,
          });
          i += 1;
        });
      } catch (err) {
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "error",
          timeout: 1000,
          message: "获取档口信息失败，请刷新重试",
        });
      }
    };

    watch(
      () => route.query,
      () => {
        id = route.query.stallID;
        if (id !== undefined) {
          API_LINK = `stalls/${id}`;
          getStallData();
        }
      },
      {
        immediate: true,
      }
    );

    return {
      slide: ref(1),
      id,
      stallData,
      stallPictureData,
      getStallData,
    };
  },
});
</script>

<style scoped></style>
