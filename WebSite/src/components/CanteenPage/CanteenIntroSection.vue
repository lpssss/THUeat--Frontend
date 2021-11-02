<template>
  <div class="column">
    <div class="col">
      简介
    </div>
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
