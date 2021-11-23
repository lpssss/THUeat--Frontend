<template>
  <div class="column q-pa-md">
    <div class="col">
      {{intro}}
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CanteenIntroSection",
  props:{
    intro:{
      type:String,
      required:true
    }
  }
})
</script>

<style scoped>

</style>
