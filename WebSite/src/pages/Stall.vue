<template>
  <div v-if="Object.keys(stallData.data).length">
    <div>
      <StallPictureSection
        :stallName="stallData.data.stallNameHead"
        :imgSrc="stallData.data.imgSrcHead"
        />
    </div>
    <div>
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
              <JudgeCardSection
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
import { defineComponent, reactive } from "vue";
import axios from "axios";
import StallPictureSection from  "components/StallPage/StallPictureSection";
import StallIntroSection from "components/StallPage/StallIntroSection";
import DishCardSection from "components/HomePage/DishCardSection";
import JudgeCardSection from "components/StallPage/JudgeCardSection";
import Pagination from '../components/StallPage/Pagination.vue';
import { watch, watchEffect } from 'vue';
import {useRoute} from 'vue-router'


export default defineComponent({
  name: "Stall",
  components: {
    StallPictureSection,
    StallIntroSection,
    DishCardSection,
    JudgeCardSection,
    Pagination,
  },
  data(){
    return {
      tab: 'dish',
    }
  },
  setup (){
    const route=useRoute()
    let name=route.query.stallName
    let API_LINK = `http://localhost:3000/stallData/?stallNameHead=${name}`; // 之后放真正的API
    // const API_LINK = "http://localhost:3000/stallData"; // 之后放真正的API
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
      API_LINK=`http://localhost:3000/stallData/?stallNameHead=${name}`
      getStallData()
      console.log("watch",route.query.stallName)
    },{
      immediate:true
    });
    // getStallData();

    return {
      stallData
    };
},
})
</script>

<style scoped>

</style>
