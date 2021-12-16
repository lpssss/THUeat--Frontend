<!--种类：页面 "/staff/"--->
<!--功能：档主显示面板，将档主显示面板页面所有Components整合一起，获取页面所需数据并整理分配到旗下Components-->
<!--所需Components：多张统计数据卡片DashboardCard，一个档口信息表格StallDetailsTable-->
<!--备注：由于API fetch有延时，因此为了避免warning，使用v-if在获得数据后才开始render-->
<template>
  <div v-if="!isLoading" class="q-pa-md">
    <h4 style="border-bottom: 1px solid">显示面板</h4>
    <div class="row q-mb-lg">
      <div class="col-12">
        <div class="row q-gutter-md justify-center">
          <DashboardCard
            v-for="data in myDashboardData"
            :key="data.engTitle"
            v-bind="data"
          />
        </div>
      </div>
    </div>
    <h4 style="border-bottom: 1px solid">档口基本信息</h4>
    <StallDetailsTable :rows-title="STALL_DETAILS_TITLE" />
  </div>
</template>

<script>
import { staffapi } from "boot/axios";
import {ref, reactive, watch} from "vue";
import { useQuasar } from "quasar";
import DashboardCard from "components/DashboardCard";
import StallDetailsTable from "components/StallDetailsTable";
import { STAFF_API_LINKS } from "app/api-links";
import userAppState from "src/store/userAppState.js";
import { useStore } from "vuex";

const { getToken } = userAppState();

const API_LINK = STAFF_API_LINKS.dashboard;

// 统计数据
const DASHBOARD_DATA_TITLE_ICON = [
  { engTitle: "stallRate", title: "档口平均分", iconName: "star_rate" },
  { engTitle: "stallRateNumber", title: "档口评分数量", iconName: "numbers" },
  {
    engTitle: "stallRateNumber",
    title: "档口评论数量",
    iconName: "numbers",
  },
  { engTitle: "canteenRate", title: "食堂平均分", iconName: "star_rate" },
  { engTitle: "bestDishName", title: "最佳菜品", iconName: "thumb_up_alt" },
];

// 档口信息
const STALL_DETAILS_TITLE = [
  { engTitle: "stallName", title: "档口名字", modifiable: false },
  { engTitle: "canteenName", title: "档口所属食堂", modifiable: false },
  { engTitle: "stallFloor", title: "档口楼层", modifiable: false },
  { engTitle: "stallDescribe", title: "档口简介", modifiable: true },
  { engTitle: "stallOperationtime", title: "档口运营时间", modifiable: true },
  { engTitle: "stallImages", title: "档口照片", modifiable: true },
];

export default {
  name: "StallDashboard",
  components: { StallDetailsTable, DashboardCard },
  setup() {
    // myDashboardData：整理后的统计数据
    // myStallDetailsData：整理后的档口信息(不包括图片）
    // myStallImages：整理后的图片链接
    const store = useStore();
    const $q = useQuasar();
    const myDashboardData = ref([]);
    const myStallDetailsData = reactive({});
    const myStallImages = ref([]);
    const isLoading=ref(true)
    $q.loading.show({
      message: "页面加载中",
    });

    //输出1个数据：显示面板页面所需数据，Object
    //功能：从API 获取显示面板所需数据
    async function getDashboardData() {
      const response = await staffapi.get(API_LINK);
      return response.data.data; //真实数据埋在第二个data内
    }

    //输入1个数据：显示面板页面所需数据，Object
    //功能：在统计数据中添加“相应数据”，将档口信息从输入中取出（图片链接和其他信息分开）
    function arrangeData(apiDashboardData) {
      //准备myDashboardData
      myDashboardData.value = DASHBOARD_DATA_TITLE_ICON.map((item) => {
        const target = item.engTitle;
        if (target === "canteenAvgRate")
          return {
            ...item,
            displayedData: apiDashboardData[target],
            subhead: "所属食堂: " + apiDashboardData.canteenName,
          };
        else return { ...item, displayedData: apiDashboardData[target] };
      });

      //准备myStallDetailsData，myStallImages
      let tempObj = {};
      for (let i = 0; i < STALL_DETAILS_TITLE.length; i++) {
        const target = STALL_DETAILS_TITLE[i].engTitle;
        if (target === "stallImages") {
          myStallImages.value = apiDashboardData[target];
        } else tempObj[target] = apiDashboardData[target];
      }
      Object.assign(myStallDetailsData, tempObj);
    }

    watch(isLoading,(newState,_)=>{
      if(newState){
        $q.loading.show({
          message: '页面加载中',
        })
      }
      else{
        $q.loading.hide()
      }
    })

    //功能：运行“获取数据函数”，失败则显示错误信息
    getDashboardData()
      .then((data) => {
        arrangeData(data);
        store.commit("stallDetails/initialize", {
          details: myStallDetailsData,
          images: myStallImages.value,
        });
        isLoading.value=false
      })
      .catch((_) => {
        $q.notify({
          type: "error",
          message: "获取数据失败，请刷新页面重试",
        });
        isLoading.value=false
      });

    return {
      STALL_DETAILS_TITLE,
      myDashboardData,
      myStallDetailsData,
      isLoading
    };
  },
};
</script>
