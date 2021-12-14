<template>
  <div v-if="Object.keys(dishData).length" class="q-pa-md">
    <q-carousel
      arrows
      animated
      v-model="slide"
      height="400px"
    >
      <HomePageAnnouncementSection
        name="first"
        :noticeTitle="dishData.data.dishName"
        :noticeWords="dishData.data.dishIntro"
        :noticeImage="dishData.data.dishImages"
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
    <div class="q-pa-md">
      <div class="text-h6">用餐者评价</div>
      <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
        <CommentCardSection
          v-for="review in dishData.data.reviews"
          v-bind="review"
          :key="review.reviewID"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { watch } from 'vue';
import { useStore } from 'vuex';
import {useRoute, useRouter} from 'vue-router'
import { api } from "boot/axios";
import CommentCardSection from "components/StallPage/CommentCardSection";
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";

export default {
  name: "Dish",
  // Components需改名
  components: {
    CommentCardSection,
    HomePageAnnouncementSection,
    },
  setup() {

    const route=useRoute();
    const store=useStore();
    const router=useRouter();

    let id=route.query.dishID
    let API_LINK = `dishes/${id}`; // 之后放真正的API
    //const API_LINK = "http://localhost:3000/dish"; // 之后放真正的API
    const dishData = reactive({ data: {} });
    const getDishData = async () => {
      try {
        const response = await api.get(API_LINK);
        dishData.data = response.data.data;
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
      console.log(store._state.data.login.loginStatus);
      if (!store._state.data.login.loginStatus) {
        router.push("/login");
      }
      else {
        console.log('click thumb successfully')
      }

    }

    return {
      slide: ref('first'),
      dishData,
      postDishLikes
    };
  },
};
</script>

<style scoped>
.dish-price{
  padding:10px 0 10px 0;
}
</style>
