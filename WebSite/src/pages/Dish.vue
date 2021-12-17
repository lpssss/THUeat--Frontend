<template>
  <div v-if="Object.keys(dishData.data).length" class="q-pa-md">
    <q-carousel arrows animated v-model="slide" height="400px">
      <HomePageAnnouncementSection
        v-for="notice in dishPictureData.data"
        v-bind="notice"
        :key="notice.name"
      />
    </q-carousel>

    <q-card flat bordered class="bg-purple-10086" style="width: 100%">
      <q-card-section class="q-pa-md">
        <q-btn
          v-if="dishData.data.myDishLike === null"
          size="sm"
          round
          color="primary"
          icon="thumb_up_alt"
          @click="postDishLikes"
        />
        <q-btn
          v-if="dishData.data.myDishLike === false"
          size="sm"
          round
          color="primary"
          icon="thumb_up_off_alt"
          @click="postDishLikes"
        />
        <q-btn
          v-if="dishData.data.myDishLike === true"
          size="sm"
          round
          color="primary"
          icon="thumb_up_alt"
          @click="postDishLikes"
        />
        <span class="q-px-sm text-caption text-grey">
          {{ dishData.data.dishLikes }}
        </span>
        <div class="dish-price">
          <q-icon name="attach_money" style="font-size: 1.5rem" />
          {{ dishData.data.dishPrice }}元
        </div>
        <q-icon name="schedule" style="font-size: 1.5rem" />
        <span>菜品售卖时间</span>
        <div v-for="time in dishData.data.dishAvailableTime" :key="time">
          {{ time }}
        </div>

        <div></div>
      </q-card-section>
    </q-card>
    <div class="q-pt-md q-gutter-sm">
      <BannerSection content="用餐者评价" />
    </div>
    <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
      <template v-if="dishData.data.reviews.length">
        <CommentCardSection
          v-for="review in dishData.data.reviews"
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
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "boot/axios";
import CommentCardSection from "components/StallPage/CommentCardSection";
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";
import BannerSection from "components/Layout/BannerSection";
import userAppState from "src/store/userAppState";
import { useQuasar } from "quasar";

export default {
  name: "Dish",
  components: {
    CommentCardSection,
    HomePageAnnouncementSection,
    BannerSection,
  },
  methods: {
    refreshDishData() {
      this.getDishData();
    },
    postDishLikes() {
      const router = useRouter();

      const { getToken } = userAppState();
      const loginStatus = computed(() => {
        const token = getToken().value;
        return token !== null;
      });

      // console.log(loginStatus.value);
      if (!loginStatus.value) {
        router.push("/login");
      } else if (this.dishData.data.myDishLike === false) {
        //点赞
        api.post(this.API_LINK).then((res) => {
          if (res.data.code === 200) {
            this.getDishData();
            // console.log("successfully thumb up");
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              timeout: 500,
              message: "点赞成功",
            });
          } else {
            // console.log("error");
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "error",
              timeout: 1000,
              message: "点赞失败，请刷新重试",
            });
          }
        });
      } else {
        //取消点赞
        api.delete(this.API_LINK).then((res) => {
          if (res.data.code === 200) {
            this.getDishData();
            //console.log("successfully delete thumb up");
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              timeout: 500,
              message: "取消点赞成功",
            });
          } else {
            // console.log("error");
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "error",
              timeout: 1000,
              message: "取消点赞失败，请刷新重试",
            });
          }
        });
      }
    },
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();

    let id = route.query.dishID;
    let API_LINK = `dishes/${id}`; // 之后放真正的API

    const dishData = reactive({ data: {} });
    const dishPictureData = reactive({ data: [] });

    //loginstatus相关
    const getDishData = async () => {
      try {
        const response = await api.get(API_LINK);
        dishData.data = response.data.data;
        console.log(dishData.data)
        // console.log(dishData.data.reviews)
        let i = 1;
        dishData.data.dishImages.forEach((item) => {
          dishPictureData.data.push({
            noticeTitle: dishData.data.dishName,
            noticeWords: dishData.data.dishIntro,
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
          message: "获取菜品信息失败，请刷新重试",
        });
      }
    };

    watch(
      () => route.query,
      () => {
        id = route.query.dishID;
        if (id !== undefined) {
          API_LINK = `dishes/${id}`;
          getDishData();
        }
      },
      {
        immediate: true,
      }
    );

    return {
      slide: ref(1),
      dishData,
      dishPictureData,
      getDishData,
      API_LINK,
    };
  },
};
</script>

<style scoped>
.dish-price {
  padding: 10px 0 10px 0;
}
</style>
