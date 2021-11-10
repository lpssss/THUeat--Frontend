<template>
  <template v-if="Object.keys(dishData).length">
  <StallPictureSection
    :img-src="dishData.data.imgSrc"
    :stall-name="dishData.data.dishName"
  />
  <q-card flat bordered class="bg-purple-1" style="width:100%">
    <q-card-section class="text-grey-9">
      {{dishData.data.comment}}
    </q-card-section>
    <q-separator  inset />
    <q-card-section class="q-pt-sm">
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
  </template>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import StallPictureSection from "components/StallPage/StallPictureSection";
import CommentCardSection from "components/StallPage/CommentCardSection";

export default {
  name: "Dish",
  // Components需改名
  components: {CommentCardSection, StallPictureSection },
  setup() {
    const API_LINK = "http://localhost:3000/dish"; // 之后放真正的API
    const dishData = reactive({ data: {} });
    const getDishData = async () => {
      try {
        const response = await axios.get(API_LINK);
        dishData.data = response.data[0];
      } catch (err) {
        console.log(err.message);
      }
    };
    getDishData();

    return {
      dishData,
    };
  },
};
</script>

<style scoped></style>
