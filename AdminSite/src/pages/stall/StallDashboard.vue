<template>
  <div class="q-pa-md">
    <h4 style="border-bottom: 0.1px solid">显示面板</h4>
    <div class="row q-mb-lg">
      <div class="col-12">
        <div class="row q-gutter-md justify-center">
          <DashboardCard
            v-for="data in finalDisplayData"
            :key="data.engName"
            v-bind="data"
          />
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
import { ref } from "vue";

// 显示面板显示的数据
const DISPLAYED_DATA_TITLE_ICON = [
  { engName: "stallRate", titleName: "档口平均分", iconName: "star_rate" },
  {
    engName: "stallRateNumber",
    titleName: "档口评分数量",
    iconName: "numbers",
  },
  {
    engName: "stallCommentNumber",
    titleName: "档口评论数量",
    iconName: "numbers",
  },
  { engName: "canteenAvgRate", titleName: "食堂平均分", iconName: "star_rate" },
  { engName: "bestDishName", titleName: "最佳菜品", iconName: "thumb_up_alt" },
];
const testReturnData = {
  stallName: "string1",
  stallAddress: "string2",
  stallDescribe: "string3",
  canteenName: "string4",
  stallStatus: 1,
  stallImages: ["string5", "string6"],
  stallRate: 4.5,
  stallRateNumber: 1024,
  stallCommentNumber: 10,
  canteenAvgRate: 3.45,
  bestDishName: "string7",
  stallOperationtime: "string8",
};
const MODIFIABLE_ROWS = ["stallDescribe", "stallImages", "stallOperationTime"];
const ROWS = [
  {
    engName: "stallName",
    attributeName: "档口名字",
    modifiable: 0,
  },
  {
    engName: "stallDescribe",
    attributeName: "档口简介",
    modifiable: 1,
  },
  {
    engName: "stallAddress",
    attributeName: "档口地址",
    modifiable: 0,
  },
  {
    engName: "stallImages",
    attributeName: "档口照片",
    modifiable: 1,
  },
  {
    engName: "stallOperationtime",
    attributeName: "档口运营时间",
    modifiable: 1,
  },
  {
    engName: "canteenName",
    attributeName: "档口所属食堂",
    modifiable: 0,
  },
];
export default {
  name: "StallDashboard",
  components: { StallDetailsTable, DashboardCard },
  setup() {
    // const API_LINK = "http://localhost:3000/"; // 之后放真正的API
    // const apiDashboardDisplayData = {};
    const arrangeData = () => {
      return [
        DISPLAYED_DATA_TITLE_ICON.map((item) => {
          const target = item.engName;
          if (target === "canteenAvgRate")
            return {
              ...item,
              displayedData: ref(testReturnData[target]),
              subhead: "所属食堂: " + testReturnData.canteenName,
            };
          else return { ...item, displayedData: ref(testReturnData[target]) };
        }),
        ROWS.map((item) => {
          const target = item.engName;
          return {
            ...item,
            attribute: testReturnData[target],
          };
        }),
      ];
    };
    // const getDashboardDisplayData = async () => {
    //   try {
    //     const response = await axios.get(API_LINK);
    //     apiDashboardDisplayData = response.data[0];
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // };

    // getDashboardDisplayData();
    const [finalDisplayData,rows] = arrangeData();
    console.log(finalDisplayData);
    console.log(rows)
    return {
      finalDisplayData,
      rows,
    };
  },
};
</script>
