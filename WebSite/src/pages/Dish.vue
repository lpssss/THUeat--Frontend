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
        :title="dishData.data.dishName"
        :content="dishData.data.comment"
        :imgSrc="dishData.data.imgSrc"
      />
    </q-carousel>

    <q-card flat bordered class="bg-purple-10086" style="width:100%">
      <q-card-section class="q-pa-md">
        <q-btn size="sm" falt round color="primary" icon="thumb_up" />
        <span class="q-px-sm text-caption text-grey"> {{ dishData.data.thumb }} </span>
      </q-card-section>
    </q-card>
    <div class="q-pa-md">
      <div class="text-h6">用餐者评价</div>
      <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
        <CommentCardSection
          v-for="judgement in dishData.data.judgements"
          v-bind="judgement"
          :key="judgement.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import axios from "axios";
import CommentCardSection from "components/StallPage/CommentCardSection";
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";
import { watch} from 'vue';
import {useRoute} from 'vue-router'

export default {
  name: "Dish",
  // Components需改名
  components: {
    CommentCardSection,
    HomePageAnnouncementSection,
    },
  setup() {
    const route=useRoute()
    let id=route.query.dishID
    let API_LINK = `http://localhost:3000/dish/?dishID=${id}`; // 之后放真正的API
    //const API_LINK = "http://localhost:3000/dish"; // 之后放真正的API
    const dishData = reactive({ data: {} });
    const getDishData = async () => {
      try {
        const response = await axios.get(API_LINK);
        dishData.data = response.data[0];
      } catch (err) {
        console.log(err.message);
      }
    };
    watch(()=>route.query,()=>{
      id=route.query.dishID
      API_LINK = `http://localhost:3000/dish/?dishID=${id}`
      getDishData()
      console.log("watch",route.query.dishID)
    },{
      immediate:true
    });
    //getDishData();

    return {
      slide: ref('first'),
      dishData,
    };
  },
};
</script>

<style scoped></style>
