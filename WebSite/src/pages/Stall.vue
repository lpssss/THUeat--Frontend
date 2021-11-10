<template>
  <div v-if="Object.keys(stallData.data).length">
    <div class="q-pa-md">
        <q-carousel
          arrows
          animated
          v-model="slide"
          height="400px"
        >
          <HomePageAnnouncementSection
            name="first"
            :title="stallData.data.stallNameHead"
            :content="stallData.data.introContent"
            :imgSrc="stallData.data.imgSrcHead"
          />
        </q-carousel>
      </div>

    <div class="q-pa-md">
      <StallIntroSection 
        :content="stallData.data.introContent"
        :score="stallData.data.introScore"
        :scoreAmount="stallData.data.introScoreAmount"
      />
    </div>
    <div class="q-pa-md">
      <div class="q-gutter-y-md" style="width:100%">
        <q-tabs
          v-model="tab"
          dense
          class="text-purple-3"
          active-color="purple-5"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="dish" label="菜品" />
          <q-tab name="comments" label="评价" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="dish">
            <div class="text-h6">推荐菜品</div>
            <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
              <DishCardSection
                v-for="dish in stallData.data.dishes"
                v-bind="dish"
                :key="dish.dishName"
              />
            </div>
            <Pagination/>
          </q-tab-panel>

          <q-tab-panel name="comments">
            <div class="text-h6">用餐者评价</div>
            <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
              <CommentCardSection
                v-for="judgement in stallData.data.judgements"
                v-bind="judgement"
                :key="judgement.title"
              />
            </div>
            <Pagination/>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    
  </div>
  
</template>

<script>
import { ref, defineComponent, reactive } from "vue";
import axios from "axios";
import StallPictureSection from  "components/StallPage/StallPictureSection";
import StallIntroSection from "components/StallPage/StallIntroSection";
import DishCardSection from "components/HomePage/DishCardSection";
import CommentCardSection from "components/StallPage/CommentCardSection";
import Pagination from 'components/StallPage/Pagination.vue';
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";

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

export default defineComponent({
  name: "Stall",
  components: { 
    //StallPictureSection,
    StallIntroSection,
    DishCardSection,
    CommentCardSection,
    Pagination,
    HomePageAnnouncementSection,
  },
  data(){
    return {
      tab: 'dish',
    }
  },
  setup (){
    const API_LINK = "http://localhost:3000/stallData"; // 之后放真正的API
    const stallData = reactive({ data: {} });
    const getStallData = async () => {
      try {
        const response = await axios.get(API_LINK);
        stallData.data = response.data[0];
      } catch (err) {
        console.log(err.message);
      }
    };
    getStallData();

    return {
      slide: ref('first'),
      stallData,
      announcements: announcements,
    };
},
})
</script>

<style scoped>

</style>
