<!--种类：Component -->
<!--功能：创建菜品表单，用户可填写菜品信息，上传图片并提交-->
<!--所需Components: 图片上传工具ImageUploader-->
<!--发送Emits：createDish提交后返回表单数据，parent负责进行POST操作；closeForm点击取消后会parent会关闭表单-->
<!--pending：提交图片功能-->
<template>
  <div class="q-pa-md" style="margin-left: 10%; margin-right: 10%">
    <h4 style="border-bottom: 1px solid">菜品创建</h4>
    <q-form class="q-gutter-md" @submit="submitForm">
      <q-input
        filled
        v-model="newDishData.dishName"
        label="菜品名字"
        hint="*必填，最多10个字"
        :rules="[
          (val) => !!val || '* 不能为空',
          (val) => val.length <= 10 || '最多10个字',
        ]"
      />
      <q-input
        filled
        v-model="newDishData.dishIntro"
        label="菜品简介"
        hint="*必填"
        type="textarea"
        :rules="[(val) => !!val || '* 不能为空']"
      />
      <q-select
        filled
        v-model="newDishData.dishAvailableTime"
        :options="$store.state.dishesDetails.stallOperationtime"
        hint="*必填"
        label="售卖时段"
        multiple
        :rules="[(val) => val.length >= 1 || '* 不能为空']"
      />
      <q-input
        v-model="newDishData.dishPrice"
        filled
        style="max-width: 200px"
        label="菜品价格"
        hint="*两位小数点，不能多于6位数字"
        fill-mask="0"
        mask="#.##"
        reverse-fill-mask
        :rules="[(val) => val.length <= 7 || '最多6个数字']"
      />
      <ImagesUploader ref="imageUploader" @addedImages="addImages" multiple />
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
</template>

<script>
import { reactive, ref } from "vue";
import ImagesUploader from "components/ImagesUploader";
import { useStore } from "vuex";

//菜品创建表格初始数据（用来初始化和重置表格）
const initialData = {
  dishName: "",
  dishIntro: "",
  dishPrice: 0,
  dishImage: "",
  dishAvailableTime: [],
};
export default {
  name: "DishCreateForm",
  components: { ImagesUploader },
  emits: ["createDish", "closeForm"],
  setup(props, context) {
    //newDishData: 创建菜品表单上的数据
    //imageUploader: 用来控制ImageUploader(template ref)
    const newDishData = reactive({ ...initialData });
    const imageUploader = ref(null);
    const newImages = ref(null);
    const store = useStore();

    //功能：重置创建菜品表单
    function resetForm() {
      Object.assign(newDishData, initialData);
    }
    //功能：取消创建新菜品
    function cancelDishCreate() {
      context.emit("closeForm");
    }
    function addImages(images) {
      newImages.value = images.value;
    }
    //功能：提交表单
    function submitForm() {
      store
        .dispatch("dishesDetails/postCreatedData", {
          nDetails: newDishData,
          nImage: newImages.value,
        })
        .then((status) => {
          if (status === 200) {
            imageUploader.value.clearInput();
            context.emit("closeForm");
          }
        });
    }
    resetForm()
    return {
      newDishData,
      imageUploader,
      resetForm,
      cancelDishCreate,
      submitForm,
      addImages,
    };
  },
};
</script>

<style scoped></style>
