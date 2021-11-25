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
        <q-btn color="primary" label="储存修改" />
        <q-btn color="primary" @click="$emit('openForm', true)">创建</q-btn>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="dishID" :props="props">
            {{ props.row.dishID }}
          </q-td>
          <q-td key="dishName" :props="props">
            {{ props.row.dishName }}
            <q-popup-edit
              v-model="props.row.dishName"
              v-slot="scope"
              title="更新菜品名字"
              buttons
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="dishPrice" :props="props">
            {{ props.row.dishPrice }}
            <q-popup-edit
              v-model="props.row.dishPrice"
              v-slot="scope"
              title="更新菜品价格"
              buttons
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="dishAvailableTime" :props="props">
            {{ props.row.dishAvailableTime }}
            <q-popup-edit
              v-model="props.row.dishAvailableTime"
              v-slot="scope"
              title="更新售卖时段"
              buttons
            >
              <q-select
                v-model="scope.value"
                :options="['早上', '中午', '傍晚']"
                label="请选择时段"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="dishLikes" :props="props">
            {{ props.row.dishLikes }}
          </q-td>
          <q-td key="dishIntro" :props="props">
            {{ props.row.dishIntro }}
            <q-popup-edit
              v-model="props.row.dishIntro"
              v-slot="scope"
              title="更新菜品简介"
              buttons
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="dishImage" :props="props">
            {{ props.row.dishImage }}
          </q-td>
          <q-td key="dishStatus" :props="props">
            <q-toggle
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              :model-value="props.row.dishStatus"
              @update:model-value="
                (...args) => {
                  doSomething(props.row, ...args);
                }
              "
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="confirmChangeStatus" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">您是否确定更改菜品状态</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" v-close-popup />
        <q-btn
          flat
          label="确定"
          color="primary"
          @click="postStatusChange"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
//columns 包含所有菜品信息
import { ref } from "vue";

const columns = [
  {
    name: "dishID",
    align: "left",
    label: "菜品编号",
    field: "dishID",
    sortable: true,
    modifiable: false,
  },
  {
    name: "dishName",
    required: true,
    label: "菜品名称",
    align: "left",
    field: "dishName",
    sortable: true,
    modifiable: true,
  },
  {
    name: "dishPrice",
    required: true,
    label: "菜品价格",
    align: "left",
    field: "dishPrice",
    sortable: true,
    modifiable: true,
  },
  {
    name: "dishAvailableTime",
    required: true,
    label: "菜品售卖时段",
    align: "left",
    field: "dishAvailableTime",
    sortable: true,
    modifiable: true,
  },
  {
    name: "dishLikes",
    required: true,
    label: "菜品点赞数",
    align: "left",
    field: "dishLikes",
    sortable: true,
    modifiable: false,
  },
  {
    name: "dishIntro",
    required: true,
    label: "菜品简介",
    align: "left",
    field: "dishIntro",
    sortable: true,
    modifiable: true,
  },
  {
    name: "dishImage",
    required: true,
    label: "菜品图片",
    align: "left",
    field: "dishImage",
    sortable: true,
    modifiable: true,
  },
  {
    name: "dishStatus",
    required: true,
    label: "激活状态",
    align: "left",
    field: "dishStatus",
    sortable: true,
    modifiable: true,
  },
];

export default {
  name: "DishesTable",
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  emits: ["openForm"],
  setup(props) {
    const confirmChangeStatus = ref(false);
    const dishData = ref(props.rows);
    const postStatusChange = () => {
      console.log("confirm");
    };
    function doSomething(a, value, evt) {
      a.dishStatus = value;
      confirmChangeStatus.value = true;
    }
    return {
      postStatusChange,
      confirmChangeStatus,
      columns,
      dishData,
      stats: ref(true),
      doSomething,
    };
  },
};
</script>

<style scoped></style>
