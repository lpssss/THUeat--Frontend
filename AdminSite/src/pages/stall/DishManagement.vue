<!--种类：页面 "/staff/dishes"--->
<!--功能：档主菜品管理页面，将菜品管理页面所有Components整合一起，获取页面所需数据并整理分配到旗下Components-->
<!--所需Components：菜品创建表格DishCreateForm，菜品信息表格DishesTable-->
<!--接收Emits：来自DishCreateForm的createDish，closeForm-->
<!--备注：由于API fetch有延时，因此为了避免warning，使用v-if在获得数据后才开始render-->
<!--pending：创建新菜品的POST返回-->
<template>
  <template v-if="$store.state.dishesDetails.dishesDetailsData.length">
    <DishCreateForm
      v-if="openDishCreateForm"
      ref="dishForm"
      @closeForm="openDishCreateForm = false"
    />
    <template v-else>
      <div class="q-pa-md row justify-end">
        <div class="col-1">
          <q-btn
            color="primary"
            label="创建"
            @click="openDishCreateForm = true"
          />
        </div>
      </div>
      <DishesTable />
    </template>
  </template>
</template>

<script>
import { staffapi } from "boot/axios";
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import DishesTable from "components/DishesTable";
import DishCreateForm from "components/DishCreateForm";
import { STAFF_API_LINKS } from "app/api-links";
import { useStore } from "vuex";

const API_LINK = STAFF_API_LINKS.dishes;

export default {
  name: "DishManagement",
  components: { DishCreateForm, DishesTable },
  setup() {
    //openDishCreateForm: 控制创建菜品表单开关
    //curDishData: 菜品信息表格的数据
    //dishForm: 用来控制DishCreateForm (template ref)
    const $q = useQuasar();
    const store = useStore();
    const openDishCreateForm = ref(false);
    const dishForm = ref();
    const isLoading = ref(false);

    function arrangeData(data) {
      let dishesDetails = [];
      let dishesImages = [];
      data.forEach((item) => {
        const { dishImages, ...dishDetails } = item;
        dishesDetails.push(dishDetails);
        dishesImages.push({ dishID: item.dishID, dishImages });
      });
      return [dishesDetails, dishesImages];
    }
    watch(isLoading, (newState, _) => {
      if (newState) {
        $q.loading.show({
          message: "页面加载中",
        });
      } else {
        $q.loading.hide();
      }
    });

    //功能：获取所有菜品信息，失败则显示错误信息
    async function getDishData() {
      try {
        isLoading.value = true;
        const response = await staffapi.get(API_LINK);
        const [dishesDetails, dishesImages] = arrangeData(response.data.data);
        store.commit("dishesDetails/initialize", {
          details: dishesDetails,
          images: dishesImages,
        });
        isLoading.value = false;
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
      dishForm,
    };
  },
};
</script>

<style scoped></style>
