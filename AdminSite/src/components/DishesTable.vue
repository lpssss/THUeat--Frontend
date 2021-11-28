<template>
  <div class="q-pa-md">
    <!--        <q-btn color="primary" label="储存修改" @click="saveChanges" />-->
    <q-btn color="primary" @click="$emit('openForm', true)">创建</q-btn>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left" v-for="column in COLUMNS" :key="column.name">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <DishesTableRow
        v-for="row in rows"
        :key="row.dishID"
        :row="row"
        @toggleStatus="handleToggle"
      />
    </q-markup-table>
  </div>
  <q-dialog v-model="confirmDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">您是否确定更改菜品状态</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="取消"
          color="primary"
          @click="revertStatusChange"
          v-close-popup
        />
        <q-btn
          flat
          label="确定"
          color="primary"
          v-close-popup
          @click="confirmStatusChange"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
//columns 包含所有菜品信息
import { ref, reactive} from "vue";
import DishesTableRow from "components/DishesTableRow";

const COLUMNS = [
  {
    name: "dishID",
    label: "菜品编号",
  },
  {
    name: "dishName",
    label: "菜品名称",
  },
  {
    name: "dishPrice",
    label: "菜品价格",
  },
  {
    name: "dishAvailableTime",
    label: "菜品售卖时段",
  },
  {
    name: "dishLikes",
    label: "菜品点赞数",
  },
  {
    name: "dishIntro",
    label: "菜品简介",
  },
  {
    name: "dishImage",
    label: "菜品图片",
  },
  {
    name: "dishStatus",
    label: "激活状态",
  },
];

export default {
  name: "DishesTable",
  components: { DishesTableRow },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  emits: ["openForm"],
  setup() {
    const confirmDialog = ref(false);
    const curStatusChangeTarget = reactive({ target: {} });
    function handleToggle(row, value, _) {
      // row.dishStatus = value;
      console.log(row.dishID, value);
      Object.assign(curStatusChangeTarget, { target: row, newValue: value });
      confirmDialog.value = true;
    }
    function confirmStatusChange() {
      curStatusChangeTarget.target.dishStatus = curStatusChangeTarget.newValue;
      Object.assign(curStatusChangeTarget, { id: "" });
      // console.log(curStatusChangeTarget.target)
    }
    function revertStatusChange() {
      Object.assign(curStatusChangeTarget, { id: "" });
    }
    return {
      COLUMNS,
      confirmDialog,
      handleToggle,
      confirmStatusChange,
      revertStatusChange,
    };
  },
};
</script>

<style scoped></style>
