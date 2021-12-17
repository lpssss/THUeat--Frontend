<template>
  <q-card class="my-card">
    <template v-if="stallImages.length">
      <q-img :src="stallImages" :alt="stallName" class="q-card-img" />
    </template>
    <template v-else>
      <div class="q-card-img relative-position">
        <div class="text-center q-pa-md absolute-center" style="opacity: 0.5">
          暂无图片
        </div>
      </div>
    </template>
    <q-card-section class="q-pb-none">
      <div class="text-h6">
        <router-link :to="{ path: '/stall', query: { stallID: stallID } }">
          {{ stallName }}
        </router-link>
      </div>
      <div class="text-subtitle2">{{ canteenName }}</div>
    </q-card-section>

    <q-card-section>
      <template v-if="stallBestComment.length">
        <div class="ellipsis-2-lines">
          {{ displayBestComment }}
        </div>
      </template>
      <template v-else>
        <div class="text-center" style="opacity: 0.5">
          "此档口暂无评价"
        </div>
      </template>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="q-px-none">
        <div class="q-gutter-y-md row">
          <q-rating
            v-model="ratingModel"
            size="1.5em"
            color="primary"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            readonly
          />
          <span class="text-caption text-grey q-ml-sm">
            {{ stallRate }} ({{ stallRateNumber }})</span
          >
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {ref, defineComponent, computed} from "vue";
export default defineComponent({
  name: "StallCardSection",
  props: {
    stallID: {
      type: Number,
      required: true,
    },

    stallName: {
      type: String,
      required: true,
    },

    stallRate: {
      type: Number,
    },

    stallRateNumber: {
      type: Number,
      default: 1,
    },

    stallBestComment: {
      type: String,
      default: "",
    },

    stallImages: {
      type: String,
    },
    canteenName:{
      type:String
    }
  },
  setup(props) {
    const ratingModel = ref(props.stallRate);
    const displayBestComment=computed(()=>'"'+props.stallBestComment+'"')
    if (ratingModel.value === null) ratingModel.value = 0;
    return {
      ratingModel,
      displayBestComment
    };
  },
});
</script>

<style></style>
