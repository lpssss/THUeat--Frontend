<template>
    <q-card class="my-card">
        <q-img :src="stallImage" :alt="stallName" class="q-card-img"/>

        <q-card-section class="q-pb-none">
          <div class="text-h6"> <router-link :to="{path:'/stall',query:{stallName:stallName}}">{{stallName}}</router-link> </div>
          <div class="text-subtitle2"> {{ canteenName }} </div>
        </q-card-section>

        <q-card-section>
          <div class="ellipsis-2-lines" >
            {{ stallBestComment }}
          </div>
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
              <span class="text-caption text-grey q-ml-sm"> {{ stallRate }} ({{ rateAmount }})</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: "StallCardSection",
    props: {
        stallName: {
            type: String,
            required: true
        },

        canteenName: {
            type: String,
            default: ''
        },

        stallRate: {
            type: Number,
            default: 5
        },

        rateAmount: {
            type: Number,
            default: 1
        },

        stallBestComment: {
            type: String,
            default: ''
        },

        stallImage: {
            type: String,
            default: '#'
        },
    },
    setup (props) {
      return {
          ratingModel: props.stallRate
      }
    }
})
</script>

<style>

</style>
