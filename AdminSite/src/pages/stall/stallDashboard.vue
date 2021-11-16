<template>
  <div class="q-pa-md">
    <h4 style="border-bottom: 0.1px solid">显示面板</h4>
    <div class="row q-mb-lg">
      <div class="col-12">
        <div class="row q-gutter-md justify-center">
          <DashboardCard v-for="data in DISPLAYED_DATA_ALL" :key="data.displayedData" v-bind="data" />
        </div>
      </div>
    </div>
    <h4 style="border-bottom: 0.1px solid">档口基本信息</h4>
    <StallDetailsTable :rows="rows" />
  </div>
</template>

<script>
import DashboardCard from "components/DashboardCard";
import StallDetailsTable from "components/StallDetailsTable";
//这些数据需要和后端对照，确定数据获取的方法
const DISPLAYED_DATA_ALL = [
  { titleName: "档口分数", iconName: "trending_up", displayedData: "1" },
  { titleName: "食堂分数", iconName: "trending_up", displayedData: "1" },
  { titleName: "热门食品", iconName: "trending_up", displayedData: "1" },
  { titleName: "总评论数", iconName: "trending_up", displayedData: "1" },
];
const MODIFIABLE_STALL_ATTRIBUTES=["简介","图片","营业时间"]
const rows = [
  {
    attributeName: "档口名字",
    attribute: "1231231",
  },
  {
    attributeName: "档口简介",
    attribute: "124214",
  },
];
export default {
  name: "StallDashboard",
  components: {StallDetailsTable, DashboardCard},
  setup(){
    return {
      DISPLAYED_DATA_ALL,
      rows
    }
  }
};
</script>
