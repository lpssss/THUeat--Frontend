<template>
  <div
    class="q-pa-md"
    style="margin-left: 10%; margin-right: 10%"
    v-if="createForm"
  >
    <h4 style="border-bottom: 0.1px solid">菜品创建</h4>
    <q-form class="q-gutter-md" @submit="onSubmit">
      <q-input filled v-model="text" label="菜品名字" />
      <q-input filled v-model="text" label="菜品简介" />
      <q-select
        filled
        v-model="model"
        :options="['桃李园', '紫荆园', '桃李园', '万人食堂']"
        label="售卖时段"
      />
      <q-input
        v-model.number="model"
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
          @click="createForm = false"
          label="取消"
        />
        <q-btn color="green" type="submit" label="提交" />
      </div>
    </q-form>
  </div>

  <DishesTable :rows="rows" v-else @openForm="createForm=true" />
</template>

<script>
import DishesTable from "components/DishesTable";
import {ref} from "vue";
const rows = [
  {
    dishID: "d1",
    dishName: "string1",
    dishIntro: "string2",
    dishPrice: "string3",
    dishImage: "string4",
    dishLikes: "string5",
    dishAvailableTime: "string6",
    dishStatus: true,
  },
  {
    dishID: "d2",
    dishName: "string1",
    dishIntro: "string2",
    dishPrice: "string3",
    dishImage: "string4",
    dishLikes: "string5",
    dishAvailableTime: "string6",
    dishStatus: false,
  },
  {
    dishID: "d3",
    dishName: "string1",
    dishIntro: "string2",
    dishPrice: "string3",
    dishImage: "string4",
    dishLikes: "string5",
    dishAvailableTime: "string6",
    dishStatus: true,
  },
];
export default {
  name: "DishManagement",
  components: { DishesTable },
  setup() {
    // const API_LINK = "http://localhost:3000/"; // 之后放真正的API
    // const dishData = {};
    // const getDishData = async () => {
    //   try {
    //     const response = await axios.get(API_LINK);
    //     dishData = response.data[0];
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // };
    return {
      createForm: ref(false),
      rows,
    };
  },
};
</script>

<style scoped></style>
