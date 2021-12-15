<template>
  <div v-if="Object.keys(dishData).length" class="q-pa-md">
    <q-carousel
      arrows
      animated
      v-model="slide"
      height="400px"
    >
      <HomePageAnnouncementSection
        v-for="notice in dishPictureData.data"
        v-bind="notice"
        :key="notice.name"
      />
    </q-carousel>

    <q-card flat bordered class="bg-purple-10086" style="width:100%">
      <q-card-section class="q-pa-md">
        <q-btn size="sm" round color="primary" icon="thumb_up" @click="postDishLikes" />
        <span class="q-px-sm text-caption text-grey"> {{ dishData.data.dishLikes }} </span>
        <div class="dish-price">
          <q-icon name="attach_money" style="font-size: 1.5rem" />
          {{ dishData.data.dishPrice }}元
        </div>
        <q-icon name="schedule" style="font-size: 1.5rem" />
          <div>菜品售卖时间</div>
          <div v-for="time in dishData.data.dishAvailableTime.length" :key="time">
            {{time}}
          </div>

        <div>

        </div>
      </q-card-section>
    </q-card>
      <div class="q-pt-md q-gutter-sm">
        <BannerSection content="用餐者评价" />
      </div>
      <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
        <CommentCardSection
          v-for="review in dishData.data.reviews"
          v-bind="review"
          :key="review.reviewID"
        />
      </div>
    </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { watch } from 'vue';
import {useRoute, useRouter} from 'vue-router'
import { api } from "boot/axios";
import CommentCardSection from "components/StallPage/CommentCardSection";
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";
import BannerSection from "components/Layout/BannerSection";
import userAppState from "src/store/userAppState";

export default {
  name: "Dish",
  components: {
    CommentCardSection,
    HomePageAnnouncementSection,
    BannerSection,
    },
  setup() {

    const route=useRoute();
    const router=useRouter();

    let id=route.query.dishID
    let API_LINK = `dishes/${id}`; // 之后放真正的API
    //const API_LINK = "http://localhost:3000/dish"; // 之后放真正的API
    const dishData = reactive({ data: {} });
    const dishPictureData = reactive({ data: [] })

    //loginstatus相关
    const { getToken, resetState } = userAppState();
    const loginStatus = computed(() => {
      const token = getToken().value;
      return token !== null;
    });

    const getDishData = async () => {
      try {
        const response = await api.get(API_LINK);
        dishData.data = response.data.data;
        var i = 1
        dishData.data.dishImages.forEach((item) => {
          dishPictureData.data.push({
            noticeTitle: dishData.data.dishName,
            noticeWords: dishData.data.dishIntro,
            noticeImage: item,
            name: i
          })
          i += 1
        })
      } catch (err) {
        console.log(err.message);
      }
    };

    watch(()=>route.query,()=>{
      id=route.query.dishID
      API_LINK=`dishes/${id}`
      getDishData()
      console.log("watch",route.query.dishID)
    },{
      immediate:true
    });

    function postDishLikes(){
      console.log(loginStatus.value);
      if (!loginStatus.value) {
        router.push("/login");
      }
      else {
        console.log('click thumb successfully')
      }

    }

    return {
      slide: ref(1),
      dishData,
      postDishLikes,
      dishPictureData,
    };
  },
};
</script>

<style scoped>
.dish-price{
  padding:10px 0 10px 0;
}
</style>
