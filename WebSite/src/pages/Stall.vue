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
            :title="stallData.data.stallName"
            :content="stallData.data.stallDescribe"
            :imgSrc="stallData.data.stallImage"
          />
        </q-carousel>
      </div>

    <div class="q-pa-md">
      <StallIntroSection
        :score="stallData.data.stallRate"
        :scoreAmount="stallData.data.stallRateNumber"
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
                :key="dish.dishID"
              />
            </div>
            <Pagination/>
          </q-tab-panel>

          <q-tab-panel name="comments">
            <div class="text-h6">用餐者评价</div>
            <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
              <CommentCardSection
                v-for="review in stallData.data.reviews"
                v-bind="review"
                :key="review.reviewID"
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
import { ref, defineComponent, reactive, watch } from "vue";
import axios from "axios";
import {useRoute} from 'vue-router'
import StallPictureSection from  "components/StallPage/StallPictureSection";
import StallIntroSection from "components/StallPage/StallIntroSection";
import DishCardSection from "components/HomePage/DishCardSection";
import CommentCardSection from "components/StallPage/CommentCardSection";
import Pagination from 'components/StallPage/Pagination.vue';
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";


export default defineComponent({
  name: "Stall",
  components: {
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
    const route=useRoute()
    let name=route.query.stallName
    let API_LINK = `http://localhost:3000/stallData/?stallName=${name}`; // 之后放真正的API

    const stallData = reactive({ data: {} });

    const getStallData = async () => {
      try {
        const response = await axios.get(API_LINK);
        stallData.data = response.data[0];
      } catch (err) {
        console.log(err.message);
      }
    };

    watch(()=>route.query,()=>{
      name=route.query.stallName
      API_LINK=`http://localhost:3000/stallData/?stallName=${name}`
      getStallData();
      console.log("watch",route.query.stallName)
    },{
      immediate:true
    });
    //getStallData();
    //getDishData();

    return {
      slide: ref('first'),
      stallData,
    };
},
})
</script>

<style scoped>

</style>
