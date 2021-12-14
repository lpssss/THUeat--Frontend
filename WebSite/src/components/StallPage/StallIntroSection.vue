<template>
    <q-card flat bordered style="width:100%">
    <q-card-section>
      档口楼层：{{stallFloor}}
      <br />
      营业时间：
      <br/>
      <div v-for="time in stallOperationtime" :key="time.name">
        <div>
          {{time.startTime}} - {{time.endTime}}
        </div>
      </div>
    </q-card-section>
      <q-card-section>
        <div class="row justify-center">
    <div class="self-center col-6">
      <q-rating
        v-model="starscore"
        size="2em"
        color="purple-8"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        readonly
      />
      <!-- v-model无法传入prop的数据，需要修改 -->
      <span class="text-caption text-grey q-ml-sm"> {{ score }} ({{ stallRateNumber }})</span>
    </div>
        <div class="col-2">
      <q-btn color="purple-8"  icon-right="send" label="去评价" @click="$router.push({path:'/comment',query:{stallName:stallName}})">

      </q-btn>
    </div>
  </div>
      </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent } from 'vue'

export default defineComponent({
    name: "StallIntroSection",
    props: {
        stallRate: {
            type: Number,
            default: 5
        },
        stallRateNumber: {
            type: Number,
            default: 32
        },
        stallAddress: {
            type: String,
            default:'#'
        },
        stallName: {
          type: String,
          required: true
        },
        stallFloor: {
          type:Number,
          required: true
        },
        stallOperationtime: {
          type:Array,
          required:true
        }
    },
    setup(props) {
        return {
            starscore: props.stallRate,
        }
    },
})
</script>
<style scoped>

</style>
