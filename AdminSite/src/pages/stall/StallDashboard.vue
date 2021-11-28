<template>
  <div class="q-pa-md" v-if="Object.keys(dashboardData.data).length">
    <h4 style="border-bottom: 1px solid">显示面板</h4>
    <div class="row q-mb-lg">
      <div class="col-12">
        <div class="row q-gutter-md justify-center">
          <DashboardCard
            v-for="data in dashboardData.data"
            :key="data.engName"
            v-bind="data"
          />
        </div>
      </div>
    </div>
    <h4 style="border-bottom: 1px solid">档口基本信息</h4>
    <StallDetailsTable
      :stallDetailsData="stallDetailsData.data"
      :rows="STALL_DETAILS_ROWS_TITLE"
    />
  </div>
</template>

<script>
import DashboardCard from "components/DashboardCard";
import StallDetailsTable from "components/StallDetailsTable";
import { ref, reactive } from "vue";
import { api } from "boot/axios";

const API_LINK = "mystall";
// 显示面板显示的数据
const DASHBOARD_DATA_TITLE_ICON = [
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

// 档口信息表格
const STALL_DETAILS_ROWS_TITLE = [
  {
    engTitle: "stallName",
    title: "档口名字",
    modifiable: false,
  },
  {
    engTitle: "canteenName",
    title: "档口所属食堂",
    modifiable: false,
  },
  {
    engTitle: "stallAddress",
    title: "档口地址",
    modifiable: false,
  },
  {
    engTitle: "stallOperationtime",
    title: "档口运营时间",
    modifiable: true,
  },
  {
    engTitle: "stallDescribe",
    title: "档口简介",
    modifiable: true,
  },
  {
    engTitle: "stallImages",
    title: "档口照片",
    modifiable: true,
  },
];

export default {
  name: "StallDashboard",
  components: { StallDetailsTable, DashboardCard },
  setup() {
    const dashboardData = reactive({ data: {} });
    const stallDetailsData = reactive({ data: {} });

    function arrangeData(dashboardData) {
      let stallDetailsData = {};
      for (let i = 0; i < STALL_DETAILS_ROWS_TITLE.length; i++) {
        const target = STALL_DETAILS_ROWS_TITLE[i].engTitle;
        stallDetailsData[target] = dashboardData[target];
      }
      return [
        DASHBOARD_DATA_TITLE_ICON.map((item) => {
          const target = item.engName;
          if (target === "canteenAvgRate")
            return {
              ...item,
              displayedData: ref(dashboardData[target]),
              subhead: "所属食堂: " + dashboardData.canteenName,
            };
          else return { ...item, displayedData: ref(dashboardData[target]) };
        }),
        stallDetailsData,
      ];
    }

    async function getDashboardData() {
      try {
        const response = await api.get(API_LINK); // Expect OBJECT from API
        // console.log('MyStall Response is: ',response.data)
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    }

    getDashboardData().then((data) => {
      const [tempDashboardData, tempStallDetailsData] = arrangeData(data); // Ready dashboard data and stall details row name
      // console.log("Final Dashboard Data is ",tempDashboardData);
      // console.log("Final Stall Details Row is ",tempStallDetailsData)
      dashboardData.data = tempDashboardData;
      stallDetailsData.data = tempStallDetailsData;
    });

    return {
      STALL_DETAILS_ROWS_TITLE,
      dashboardData,
      stallDetailsData,
    };
  },
};
</script>
