<template>
  <q-item clickable v-ripple>
    <q-item-section>
      <div class="row justify-center">
        <div>{{title}}</div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: "NavbarSecondOrderItem",
  props: {
    title: {
      type: String,
      required: true
    },
  }
})
</script>

<style scoped>

</style>
