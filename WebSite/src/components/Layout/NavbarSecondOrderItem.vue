<template>
  <q-item clickable v-ripple>
    <q-item-section>
      <router-link
        style="text-decoration: none; color:black"
        :to="{ path: '/canteen', query: { canteenID: canteenID } }"
        >{{ canteenName }}</router-link
      >
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "NavbarSecondOrderItem",
  props: {
    canteenID: {
      type: Number,
      required: true,
    },
    canteenName: {
      type: String,
      required: true,
    },
    canteenType: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped></style>
