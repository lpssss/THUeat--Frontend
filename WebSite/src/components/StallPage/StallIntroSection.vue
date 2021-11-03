<template>
    <q-card flat bordered class="bg-purple-1" style="width:100%">
      <q-card-section class="text-grey-9">
        {{content}}
      </q-card-section>
      <q-separator  inset />
      <q-card-section>
        <div class="row justify-center">
    <div class="self-center col-6">
      <q-rating 
        v-model="starscore" 
        size="2em"
        color="purple-8"
        icon="star_border"
        icon-selected="star"
      />
      <!-- v-model无法传入prop的数据，需要修改 -->
      <span class="text-caption text-grey q-ml-sm"> {{ score }} ({{ scoreAmount }})</span>
    </div>
        <div class="col-2">
      <q-btn color="purple-8"  icon-right="send" label="去评价" >
        
      </q-btn>
    </div>
  </div>
      </q-card-section>
  </q-card>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: "StallIntroSection",
    props: {
        content: {
            type: String,
            default: ''
        },
        score: {
            type: Number,
            default: 4
        },
        scoreAmount: {
            type: Number,
            default: 32
        },
        
    },
    setup() {
        return {
            starscore:3,
        }
    },
})
</script>
<style scoped>

</style>
