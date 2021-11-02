<template>
  <div class="column" style="height:125px">
    <div class="col">
      基本信息
    </div>
    <div class="col">
      营业时间：{{operationTime}}
    </div>
    <div class="col">
      联络号码：{{contacts}}
    </div>
    <div class="col">
      地点：{{ canteenAddress }}
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CanteenBasicDetailSection",
  props:{
    operationTime: {
      type: String,
      required: true
    },
    contacts:{
      type:String,
      required:true
    },
    canteenAddress:{
      type:String,
      required:true
    }
  }
})
</script>

<style scoped>

</style>
