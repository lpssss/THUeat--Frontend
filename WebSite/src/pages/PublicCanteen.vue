<template>
  <div class="q-pa-md">
    <CanteenTitleSection v-bind="canteenData"/>
  </div>
  <div class="q-pa-lg">
    <CanteenBasicDetailSection v-bind="canteenData"/>
  </div>
  <div class="q-ma-lg">
    <CanteenIntroSection v-bind="canteenData"/>
  </div>
  <div class="q-ma-lg">
    <CanteenStallSection v-bind="canteenData"/>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';
import axios from "axios";
import CanteenBasicDetailSection from "components/CanteenPage/CanteenBasicDetailSection";
import CanteenIntroSection from "components/CanteenPage/CanteenIntroSection";
import CanteenTitleSection from "components/CanteenPage/CanteenTitleSection";
import CanteenStallSection from "components/CanteenPage/CanteenStallSection";

export default defineComponent({
  name: 'PublicCanteen',
  components: {CanteenStallSection, CanteenTitleSection, CanteenIntroSection, CanteenBasicDetailSection},
  setup() {
    const canteenData = ref({})
    const getCanteenData = async () => {
      const response = await axios.get("http://localhost:3000/canteenData/c1")
      canteenData.value = response.data
      //console.log(canteenData)
    }
    getCanteenData()

    return {
      canteenData
    }
  }
})
</script>
