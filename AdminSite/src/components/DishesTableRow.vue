<!--种类：Component -->
<!--功能：菜品信息表格”每行“，用户可对部分信息进行修改-->
<!--所需Components：图片库ImageGallery-->
<!--发送Emits：updateRow更新Parent中的总菜品信息-->
<template>
  <tr>
    <td class="text-left">{{ myRowData.dishID }}</td>
    <td>
      {{ myRowData.dishName }}
      <q-popup-edit
        v-model="myRowData.dishName"
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
      {{ myRowData.dishPrice }}
      <q-popup-edit
        v-model="myRowData.dishPrice"
        v-slot="scope"
        title="更新菜品价格"
        buttons
      >
        <q-input type="number" v-model="scope.value" dense autofocus />
      </q-popup-edit>
    </td>
    <td>
      {{ myRowData.dishAvailableTime }}
      <q-popup-edit
        v-model="myRowData.dishAvailableTime"
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
      {{ myRowData.dishLikes }}
    </td>
    <td>
      {{ myRowData.dishIntro }}
      <q-popup-edit
        v-model="myRowData.dishIntro"
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
        @click="showImageGallery = true"
      />
    </td>
    <td>
      <q-toggle
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        :model-value="Boolean(myRowData.dishStatus)"
        @update:model-value="toggleStatus"
      />
    </td>
  </tr>
  <q-dialog v-model="showImageGallery" full-width persistent>
    <q-card>
      <ImageGallery :images="myRowData.dishImage"/>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="关闭" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { api } from "boot/axios";
import { reactive, ref, watch } from "vue";
import { useQuasar } from "quasar";
import ImageGallery from "components/ImageGallery";

//售卖时间选项
const DISH_AVAILABLE_TIME_OPTIONS = ["早上", "中午", "晚上"];
export default {
  name: "DishesTableRow",
  components: {ImageGallery},
  props: {
    rowData: {
      type: Object,
      required: true,
    },
  },
  emits: ["updateRow"],
  setup(props, context) {
    //showImageGallery: 控制图片库的开关
    //myRowData: 重新复制每行信息，以直接修改
    const $q = useQuasar();
    const showImageGallery = ref(false);
    const myRowData = reactive({ ...props.rowData });

    //输入2个数据：value为新state，evt为pointer event(这里没用到所以放"_")
    //功能：用户要调整激活状态时，会弹出确认窗口，确认后才更改激活状态
    function toggleStatus(value, _) {
      console.log(value);
      $q.dialog({
        title: "确认调整状态",
        message: "您是否确认要调整此菜品状态?",
        ok: { push: true, label: "确认" },
        cancel: { push: true, label: "取消" },
        persistent: true,
      }).onOk(() => {
        myRowData.dishStatus = value;
      });
    }
    //功能：将用户进行的任何修改更新到后端，并显示状态（成功 & 失败）
    function saveChanges(data) {
      const API_LINK = `dishes/${data.dishID}`;
      console.log(API_LINK);
      async function sendData(data) {
        return await api.post("dishes-modify-post", data);
      }
      sendData(data)
        .then((res) => {
          if (res.status === 201) {
            $q.notify({
              type: "success",
              message: "操作成功",
            });
            context.emit("updateRow", data);    // best practice: 更新parent中的数据
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          $q.notify({
            type: "error",
            message: "操作失败，请刷新页面重试",
          });
        });
    }
    //功能：用户一旦进行修改，则自动使用saveChanges函数更新到后端
    watch(
      () => myRowData,
      (newState) => {
        saveChanges({ ...newState });
      },
      { deep: true }
    );
    return {
      DISH_AVAILABLE_TIME_OPTIONS,
      myRowData,
      showImageGallery,
      toggleStatus,
    };
  },
};
</script>

<style scoped></style>
