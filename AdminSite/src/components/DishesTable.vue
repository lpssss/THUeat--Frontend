<template>
  <div class="q-pa-md">
    <q-table
      title="菜品列表"
      :rows="dishData"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-btn color="primary" @click="addDish">创建</q-btn>
      </template>

      <template v-slot:body-cell-dishStatus="props">
        <q-td :props="props">
          <q-toggle
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            :model-value="props.row.dishStatus"
            @update:model-value="(...args)=>{doSomething(props.row,...args)}"
            />
        </q-td>
      </template>

    </q-table>
  </div>
</template>

<script>
//columns 包含所有菜品信息
import {ref} from "vue";

const columns = [
  {
    name: "dishID",
    align: "left",
    label: "菜品编号",
    field: "dishID",
    sortable: true,
  },
  {
    name: "dishName",
    required: true,
    label: "菜品名称",
    align: "left",
    field: "dishName",
    sortable: true,
  },
  {
    name: "dishIntro",
    required: true,
    label: "菜品简介",
    align: "left",
    field: "dishIntro",
    sortable: true,
  },
  {
    name: "dishPrice",
    required: true,
    label: "菜品价格",
    align: "left",
    field: "dishPrice",
    sortable: true,
  },
  {
    name: "dishImage",
    required: true,
    label: "菜品图片",
    align: "left",
    field: "dishImage",
    sortable: true,
  },
  {
    name: "dishLikes",
    required: true,
    label: "菜品点赞数",
    align: "left",
    field: "dishLikes",
    sortable: true,
  },
  {
    name: "dishAvailableTime",
    required: true,
    label: "菜品售卖时段",
    align: "left",
    field: "dishAvailableTime",
    sortable: true,
  },
  {
    name:"dishStatus",
    required: true,
    label: "激活状态",
    align: "left",
    field: "dishStatus",
  }
];

export default {
  name: "DishesTable",
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const dishData=ref(props.rows);
    function doSomething(a,value,evt){
      console.log(a.dishStatus)
      a.dishStatus=value
      console.log(value)
      console.log(evt)

    }
    return {
      columns,
      dishData,
      stats:ref(true),
      doSomething
    };
  },
};
</script>

<style scoped></style>
