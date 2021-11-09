<template>
  <q-item clickable v-ripple>
    <q-item-section>
        <div> {{ canteenName }} </div>
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
  }
})
</script>

<style scoped>

</style>
