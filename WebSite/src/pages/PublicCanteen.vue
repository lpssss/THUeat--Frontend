<template>
  <template v-if="Object.keys(canteenData.data).length">
    <!-- 取了数据才渲染 -->
    <div class="q-pa-md">
      <CanteenTitleSection
        :canteen-name="canteenData.data.canteenName"
        :rating="canteenData.data.rating"
        :canteen-img="canteenData.data.canteenImg"
      />
    </div>
    <div class="q-pa-lg">
      <CanteenBasicDetailSection
        :canteen-address="canteenData.data.canteenAddress"
        :contacts="canteenData.data.contacts"
        :operation-time="canteenData.data.operationTime"
      />
    </div>
    <div class="q-ma-lg">
      <CanteenIntroSection :intro="canteenData.data.intro" />
    </div>
    <div class="q-ma-lg">
      <CanteenStallSection :stall="canteenData.data.stall" />
    </div>
  </template>
</template>

<script>
import { defineComponent, reactive } from "vue";
import axios from "axios";
import CanteenBasicDetailSection from "components/CanteenPage/CanteenBasicDetailSection";
import CanteenIntroSection from "components/CanteenPage/CanteenIntroSection";
import CanteenTitleSection from "components/CanteenPage/CanteenTitleSection";
import CanteenStallSection from "components/CanteenPage/CanteenStallSection";

export default defineComponent({
  name: "PublicCanteen",
  components: {
    CanteenStallSection,
    CanteenTitleSection,
    CanteenIntroSection,
    CanteenBasicDetailSection,
  },
  setup() {
    const API_LINK = "http://localhost:3000/canteenData/?canteenID=c1"; // 之后放真正的API
    const canteenData = reactive({ data: {} });
    const getCanteenData = async () => {
      try {
        const response = await axios.get(API_LINK);
        canteenData.data = response.data[0];
      } catch (err) {
        console.log(err.message);
      }
    };
    getCanteenData();

    return {
      canteenData,
    };
  },
});
</script>
