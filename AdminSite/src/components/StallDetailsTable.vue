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
      <ImageGallery />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="关闭" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive, watch } from "vue";
import ImageGallery from "components/ImageGallery";
import { STAFF_API_LINKS } from "app/api-links";
import { useStore } from "vuex";

const API_LINK = STAFF_API_LINKS.dashboard;

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
    rowsTitle: {
      type: Array,
      required: true,
    },
  },
  emits: ["updateDetailsData", "updateImagesData"],
  setup() {
    //showImageGallery: 控制图片库的开关
    //myStallDetails: 重新复制档口信息，以直接修改档口信息
    const store = useStore();
    const showImageGallery = ref(false);
    const myStallDetails = reactive({
      ...store.state.stallDetails.stallDetailsData,
    });

    const newImage = ref(null);

    function addImages(images) {
      newImage.value = images.value;
      console.log(images.value[0]);
      console.log(newImage.value.length);
    }

    //功能：在任一档口信息有修改后自动POST去后端
    watch(
      () => myStallDetails,
      (newDetails) => {
        store.dispatch("stallDetails/saveDetailsChanges", newDetails);
      },
      { deep: true }
    );
    return {
      STALL_DETAILS_COLUMNS,
      OPERATION_TIME_OPTIONS,
      myStallDetails,
      showImageGallery,
      addImages,
    };
  },
};
</script>

<style scoped></style>
