<template>
  <div class="q-col-gutter-md row items-start">
      <div class="col-12">
        <q-img :src="imgSrc"
          style="width: 100%; height: 200px">
          <div class="absolute-bottom text-subtitle1 text-center">
            {{stallName}}
          </div>
        </q-img>
      </div>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: "StallPictureSection",
    props: {
        stallName: {
            type: String,
            require: true
        },

        imgSrc: {
            type: String,
            default: "#"
        },
    },
    setup() {
        return {
            lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    },
})
</script>
<style scoped>

</style>
