<template>
  <q-item clickable v-ripple>
    <q-item-section>
      <div class="row justify-center">
        <div><router-link :to="{path:'/canteen',query:{canteenID:canteenID}}">{{canteenName}}</router-link></div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: "NavbarSecondOrderItem",
  props: {
    canteenName: {
      type: String,
      required: true
    },
    canteenID:{
      type:String,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
