<!--种类：页面 "/staff/dishes"--->
<!--功能：档主菜品管理页面，将菜品管理页面所有Components整合一起，获取页面所需数据并整理分配到旗下Components-->
<!--所需Components：菜品创建表格DishCreateForm，菜品信息表格DishesTable-->
<!--接收Emits：来自DishCreateForm的createDish，closeForm-->
<!--备注：由于API fetch有延时，因此为了避免warning，使用v-if在获得数据后才开始render-->
<!--pending：创建新菜品的POST返回-->
<template>
  <template v-if="curDishData.length">
    <DishCreateForm
      v-if="openDishCreateForm"
      ref="dishForm"
      @createDish="createDish"
      @closeForm="openDishCreateForm = false"
    />
    <template v-else>
      <q-btn color="primary" @click="openDishCreateForm = true">创建</q-btn>
      <DishesTable :rows-data="curDishData" @updateRow="updateRow"/>
    </template>
  </template>
</template>

<script>
import { staffapi } from "boot/axios";
import { ref } from "vue";
import { useQuasar } from "quasar";
import DishesTable from "components/DishesTable";
import DishCreateForm from "components/DishCreateForm";
import {STAFF_API_LINKS} from "app/api-links";

const API_LINK = STAFF_API_LINKS.dishes;

export default {
  name: "DishManagement",
  components: { DishCreateForm, DishesTable },
  setup() {
    //openDishCreateForm: 控制创建菜品表单开关
    //curDishData: 菜品信息表格的数据
    //dishForm: 用来控制DishCreateForm (template ref)
    const $q = useQuasar();
    const openDishCreateForm = ref(false);
    const curDishData = ref([]);
    const dishForm = ref();

    function updateRow(data){
      const targetIdx=curDishData.value.findIndex(item=>item.dishID===data.dishID)
      curDishData.value[targetIdx]=data
    }

    //功能：提交菜品创建表格，并显示后端创建结果（成功 & 失败）
    function createDish(newDishData) {
      async function sendData() {
        return await staffapi.post(API_LINK, newDishData);
      }
      sendData()
        .then((res) => {
          if (res.status === 201) {
            $q.notify({
              type: "success",
              message: "创建成功",
            });
            curDishData.value.push({
              ...newDishData,
              dishID: "random",
              dishLikes: "0",
              dishStatus: true,
            }); //需要返回dishID和dishLikes
            openDishCreateForm.value = false;
            dishForm.value.resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
          $q.notify({
            type: "error",
            message: "创建失败，请重新创建",
          });
        });
    }

    //功能：获取所有菜品信息，失败则显示错误信息
    async function getDishData() {
      try {
        const response = await staffapi.get(API_LINK);
        console.log(response.data.data)
        curDishData.value = response.data.data;
      } catch (err) {
        $q.notify({
          type: "error",
          message: "获取数据失败，请刷新页面重试",
        });
      }
    }
    //运行获取数据函数
    getDishData();

    return {
      openDishCreateForm,
      curDishData,
      dishForm,
      updateRow,
      createDish,
    };
  },
};
</script>

<style scoped></style>
