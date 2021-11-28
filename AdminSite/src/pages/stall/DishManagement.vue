<template>
  <template v-if="curDishData.data.length">
    <div
      class="q-pa-md"
      style="margin-left: 10%; margin-right: 10%"
      v-if="dishCreateForm"
    >
      <h4 style="border-bottom: 1px solid">菜品创建</h4>
      <q-form class="q-gutter-md" @submit="onSubmit">
        <q-input filled v-model="newDishData.dishName" label="菜品名字" />
        <q-input filled v-model="newDishData.dishIntro" label="菜品简介" />
        <q-select
          filled
          v-model="newDishData.dishAvailableTime"
          :options="DISH_AVAILABLE_TIME_OPTIONS"
          label="售卖时段"
        />
        <q-input
          v-model.number="newDishData.dishPrice"
          type="number"
          filled
          style="max-width: 200px"
          label="菜品价格"
        />
        <q-file
          filled
          bottom-slots
          v-model="uploadedPicture"
          label="图片"
          counter
          style="max-width: 300px"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop="uploadedPicture = null"
              class="cursor-pointer"
            />
          </template>
        </q-file>
        <div style="margin-left: 45%">
          <q-btn
            style="margin-right: 10px"
            color="red"
            @click="cancelDishCreate"
            label="取消"
          />
          <q-btn color="green" type="submit" label="提交" />
        </div>
      </q-form>
    </div>

    <DishesTable
      v-else
      :rows="curDishData.data"
      @openForm="dishCreateForm = true"
    />
  </template>
</template>

<script>
import DishesTable from "components/DishesTable";
import { ref, reactive } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const API_LINK = "dishes";
const DISH_AVAILABLE_TIME_OPTIONS = ["早上", "中午", "晚上"];
export default {
  name: "DishManagement",
  components: { DishesTable },
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const dishCreateForm = ref(false);
    const curDishData = reactive({ data: [] });
    const initialData = {
      dishName: "",
      dishIntro: "",
      dishPrice: 0,
      dishImage: "",
      dishAvailableTime: "",
    };
    const newDishData = reactive({ ...initialData });
    function cancelDishCreate() {
      dishCreateForm.value = false;
      Object.assign(newDishData, initialData);
    }
    async function getDishData() {
      try {
        const response = await api.get(API_LINK);
        curDishData.data = response.data;
        console.log(curDishData);
      } catch (err) {
        console.log(err.message);
      }
    }
    function onSubmit() {
      async function sendData() {
        try {
          return await api.post("dishes-post", newDishData);
        } catch (error) {
          console.log(error.response.data);
        }
      }
      sendData().then((res) => {
        if (res.status === 201) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "创建成功",
            timeout: 500,
          });
          Object.assign(newDishData, initialData);
          dishCreateForm.value = false;
          $router.go(0);
        }
      });
    }
    getDishData();
    return {
      DISH_AVAILABLE_TIME_OPTIONS,
      dishCreateForm,
      curDishData,
      newDishData,
      cancelDishCreate,
      onSubmit,
    };
  },
};
</script>

<style scoped></style>
