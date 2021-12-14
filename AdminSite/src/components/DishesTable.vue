<!--种类：Component -->
<!--功能：菜品信息表格-->
<!--所需Components：菜品信息表格”每行“DishesTableRow-->
<!--所需Props: 所有菜品信息-->
<!--接收&发送Emit：来自DishesTableRow的UpdateRow-->
<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left" v-for="column in COLUMNS_TITLE" :key="column.engTitle">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <DishesTableRow
        v-for="dishDetails in dishesDetails"
        :key="dishDetails.dishID"
        :row-data="dishDetails"
      />
    </q-markup-table>
  </div>
</template>

<script>
import DishesTableRow from "components/DishesTableRow";
import {computed} from 'vue'
import {useStore} from "vuex";

//columns 包含所有菜品信息
const COLUMNS_TITLE = [
  { engTitle: "dishID", title: "菜品编号" },
  { engTitle: "dishName", title: "菜品名称" },
  { engTitle: "dishPrice", title: "菜品价格" },
  { engTitle: "dishLikes", title: "菜品点赞数" },
  { engTitle: "dishAvailableTime", title: "菜品售卖时段" },
  { engTitle: "dishIntro", title: "菜品简介" },
  { engTitle: "dishImage", title: "菜品图片" },
  { engTitle: "dishStatus", title: "激活状态" },
];

export default {
  name: "DishesTable",
  components: { DishesTableRow },
  setup() {
    const store=useStore()
    const dishesDetails=computed(()=>store.state.dishesDetails.dishesDetailsData)
    return {
      COLUMNS_TITLE,
      dishesDetails,
    };
  },
};
</script>

<style scoped></style>
