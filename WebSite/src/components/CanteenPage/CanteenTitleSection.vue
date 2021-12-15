<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar size="100px">
        <img :src="canteenImg" alt="avatarImage">
      </q-avatar>
    </q-item-section>
    <q-item-section class="justify-around">
      <div class="text-h6">{{canteenName}}</div>
      <div class="q-gutter-y-md row">
        <q-rating
          v-model="canteenRating"
          color="orange"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          readonly
          size="2em" />
        <span class="text-caption text-grey q-pa-sm"> ({{ rating }})</span>
      </div>

    </q-item-section>

  </q-item>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "CanteenTitleSection",
  props:{
    canteenName:{
      type:String,
      required:true
    },
    rating:{
      type:Number,
    },
    canteenImg:{
      type:String,
      required:true
    }
  },
  setup(props){
    const canteenRating=ref(props.rating)
    if(canteenRating.value===null)
      canteenRating.value=0
    return{
      canteenRating
    }
  }
})
</script>

<style scoped>

</style>
