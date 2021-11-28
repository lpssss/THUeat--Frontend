<template>
  <tr>
    <td class="text-left">{{ rowData.dishID }}</td>
    <td>
      {{ rowData.dishName }}
      <q-popup-edit
        v-model="rowData.dishName"
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
    </td>
    <td>
      {{ rowData.dishPrice }}
      <q-popup-edit
        v-model="rowData.dishPrice"
        v-slot="scope"
        title="更新菜品价格"
        buttons
      >
        <q-input type="number" v-model="scope.value" dense autofocus />
      </q-popup-edit>
    </td>
    <td>
      {{ rowData.dishAvailableTime }}
      <q-popup-edit
        v-model="rowData.dishAvailableTime"
        v-slot="scope"
        title="更新售卖时段"
        buttons
      >
        <q-select
          v-model="scope.value"
          :options="DISH_AVAILABLE_TIME_OPTIONS"
          label="请选择时段"
        />
      </q-popup-edit>
    </td>
    <td>
      {{ rowData.dishLikes }}
    </td>
    <td>
      {{ rowData.dishIntro }}
      <q-popup-edit
        v-model="rowData.dishIntro"
        v-slot="scope"
        title="更新菜品简介"
        buttons
      >
        <q-input v-model="scope.value" dense autofocus autogrow />
      </q-popup-edit>
    </td>
    <td>
      <q-btn
        color="primary"
        label="查看/编辑图片"
        @click="showImageEditor = true"
      />
    </td>
    <td>
      <q-toggle
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        :model-value="Boolean(rowData.dishStatus)"
        @update:model-value="
          (...args) => {
            $emit('toggleStatus', rowData, ...args);
          }
        "
      />
    </td>
  </tr>
</template>

<script>
import {ref, watch} from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
const DISH_AVAILABLE_TIME_OPTIONS = ["早上", "中午", "晚上"];
export default {
  name: "DishesTableRow",
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  emits: ["toggleStatus"],
  setup(props) {
    const $q = useQuasar();
    const showImageEditor=ref(false);
    function saveChanges(data) {
      const API_LINK = `dishes/${data.dishID}`;
      console.log(API_LINK);
      async function sendData(data) {
        try {
          return await api.post("dishes-modify-post", data);
        } catch (error) {
          console.log(error.response.data);
        }
      }
      sendData(data).then((res) => {
        if (res.status === 201) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "修改成功",
            timeout: 500,
          });
        }
      });
    }
    console.log("ROw", props.row);
    watch(
      () => props.row,
      (newState) => {
        saveChanges(newState);
      },
      { deep: true }
    );
    return {
      DISH_AVAILABLE_TIME_OPTIONS,
      rowData: props.row,
      showImageEditor
    };
  },
};
</script>

<style scoped></style>
