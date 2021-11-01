<template>
  <div class="column" style="height:125px">
    <div class="col">
      基本信息
    </div>
    <div class="col">
      营业时间：{{availableTime}}
    </div>
    <div class="col">
      联络号码：{{contacts}}
    </div>
    <div class="col">
      地点：{{location}}
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CanteenBasicDetailSection",
  props:{
    availableTime: {
      type: [String,null],
      required: true
    },
    contacts:{
      type:[String,null],
      required:true
    },
    location:{
      type:[String,null],
      required:true
    }
  }
})
</script>

<style scoped>

</style>
