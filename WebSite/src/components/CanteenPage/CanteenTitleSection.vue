<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar size="100px">
        <img :src="imageURL" alt="avatarImage">
      </q-avatar>
    </q-item-section>
    <q-item-section class="justify-around">
      <div>{{title}}</div>
      <div>
        <q-rating
          v-model="canteenRating"
          color="orange"
          readonly
          size="2em" />
      </div>
    </q-item-section>

  </q-item>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "CanteenTitleSection",
  props:{
    title:{
      type:String,
      required:true
    },
    rating:{
      type:Number,
      required:true
    },
    imageURL:{
      type:String,
      required:true
    }
  },
  setup(props){
    const canteenRating=ref(props.rating)
    return{
      canteenRating
    }
  }
})
</script>

<style scoped>

</style>
