<template>
  <div class="q-pa-md">
    <q-table
      title="菜品列表"
      :rows="rows"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-btn color="primary" @click="addDish">创建</q-btn>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-toggle
            model-value="false"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-btnDelete="props">
        <q-td :props="props">
          <q-btn size="10px" outline round color="red" icon="close" />
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
    field: (row) => row.dishID,
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
    name:"status",
    required: true,
    label: "激活状态",
    align: "left",
    field: "status",
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
  setup() {
    return {
      columns,
      stats:ref(true)
    };
  },
};
</script>

<style scoped></style>
