<!--种类：Component -->
<!--功能：档口信息表格，用户可直接在表格中使用popup-edit进行信息修改（编辑图片需打开另外窗口），含自动保存功能-->
<!--所需Component：图片库ImageGallery-->
<!--所需Props：档口信息数据stallDetailsData，档口图片链接stallImages，档口信息表格第一列每行的标题rowsTitle-->
<!--发送Emits: 更新parent数据updateData-->
<template>
  <div class="q-pa-md">
    <q-markup-table separator="cell" wrap-cells>
      <thead>
        <tr>
          <th
            class="text-center"
            v-for="column in STALL_DETAILS_COLUMNS"
            :key="column.engTitle"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rowTitle in rowsTitle" :key="rowTitle.engTitle">
          <td class="text-center">{{ rowTitle.title }}</td>
          <td class="text-center">
            <template v-if="rowTitle.engTitle !== 'stallImages'">
              {{ myStallDetails[rowTitle.engTitle] }}
            </template>
            <template v-else>
              <q-btn
                v-if="rowTitle.engTitle === 'stallImages'"
                color="primary"
                label="查看/编辑图片"
                @click="showImageGallery = true"
              />
            </template>
            <template v-if="rowTitle.modifiable">
              <q-popup-edit
                v-if="rowTitle.engTitle === 'stallOperationtime'"
                v-model="myStallDetails[rowTitle.engTitle]"
                v-slot="scope"
                auto-save
              >
                <q-select
                  v-model="scope.value"
                  :options="OPERATION_TIME_OPTIONS"
                  label="请选择时段"
                />
              </q-popup-edit>
              <q-popup-edit
                v-if="rowTitle.engTitle === 'stallDescribe'"
                v-model="myStallDetails[rowTitle.engTitle]"
                v-slot="scope"
                auto-save
                buttons
              >
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  autogrow
                />
              </q-popup-edit>
            </template>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  <q-dialog v-model="showImageGallery" full-width persistent>
    <q-card>
      <ImageGallery :images="stallImages" />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="关闭" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "boot/axios";
import { ref, reactive, watch } from "vue";
import { useQuasar } from "quasar";
import ImageGallery from "components/ImageGallery";

//档口信息表格的column名字
const STALL_DETAILS_COLUMNS = [
  { engTitle: "Attribute Name", title: "档口基本信息" },
  { engTitle: "Attribute", title: "属性" },
];
//档口运营时间选项
const OPERATION_TIME_OPTIONS = ["早上", "中午", "晚上"];

export default {
  name: "StallDetailsTable",
  components: { ImageGallery },
  props: {
    stallDetailsData: {
      type: Object,
      required: true,
    },
    stallImages: {
      type: Array,
      required: true,
    },
    rowsTitle: {
      type: Array,
      required: true,
    },
  },
  emits:["updateData"],
  setup(props,context) {
    //showImageGallery: 控制图片库的开关
    //myStallDetails: 重新复制档口信息，以直接修改档口信息
    const $q = useQuasar();
    const showImageGallery= ref(false);
    const myStallDetails = reactive( {...props.stallDetailsData} );

    //输入1个数据：需要POST去后端的档口信息（不包括上传和删除的图片），Object
    //输出1个数据：后端的回应，Object
    //功能：POST 数据去后端
    async function postData(data) {
      const API_LINK = "mystall-post";
      return await api.post(API_LINK, data);
    }
    //输入1个数据：需要POST去后端的档口信息（包括修改后的信息和删减后的图片，不包括上传的图片），Object
    //功能：运行POST函数，并显示后端操作结果（成功 & 失败）
    function saveChanges(data) {
      console.log(data);
      postData(data)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            $q.notify({
              type: "success",
              message: "修改成功",
            });
            context.emit("updateData",data)
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          $q.notify({
            type: "error",
            message: "修改失败，请刷新页面重试",
          });
        });
    }
    //功能：在任一档口信息有修改后自动POST去后端
    watch(
      () => myStallDetails,
      (newState) => {
        saveChanges({ ...newState });
      },
      { deep: true }
    );

    return {
      STALL_DETAILS_COLUMNS,
      OPERATION_TIME_OPTIONS,
      myStallDetails,
      showImageGallery,
      saveChanges,
    };
  },
};
</script>

<style scoped></style>
