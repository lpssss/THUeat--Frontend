<template>
  <div v-if="Object.keys(dishData.data).length">
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
                v-for="dish in dishData.data"
                v-bind="dish"
                :key="dish.dishID"
              />
            </div>
            <Pagination/>
          </q-tab-panel>

          <q-tab-panel name="comments">
            <div class="text-h6">用餐者评价</div>
            
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


export default defineComponent({
  name: "Stall",
  components: { 
    //StallPictureSection,
    //StallIntroSection,
    DishCardSection,
    //CommentCardSection,
    Pagination,
    //HomePageAnnouncementSection,
  },
  data(){
    return {
      tab: 'dish',
    }
  },
  setup (){
   
    const dishData = reactive({ data: {} });
    const getDishData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dishes");
        dishData.data = response.data;
      } catch (err) {
        console.log(err.message);
      }
    };
    getDishData();
    
    return {
      slide: ref('first'),
      //stallData,
      dishData,
    };
},
})
</script>

<style scoped>

</style>
