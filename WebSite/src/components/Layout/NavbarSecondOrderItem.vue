<template>
  <q-item clickable v-ripple>
    <q-item-section>
        <div> <router-link :to="{path:'/canteen',query:{canteenID:canteenID}}">{{ canteenName }}</router-link> </div>
    </q-item-section>
  </q-item>
</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: "NavbarSecondOrderItem",
  props: {
    canteenID: {
      type: Number,
      required: true
    },
    canteenName: {
      type: String,
      required: true
    },
  }
})
</script>

<style scoped>

</style>
