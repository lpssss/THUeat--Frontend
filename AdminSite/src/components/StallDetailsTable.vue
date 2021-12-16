<!--种类：Component -->
<!--功能：档口信息表格，用户可直接在表格中使用popup-edit进行信息修改（编辑图片需打开另外窗口），含自动保存功能-->
<!--所需Component：图片库ImageGallery-->
<!--所需Props：档口信息数据stallDetailsData，档口图片链接stallImages，档口信息表格第一列每行的标题rowsTitle-->
<!--发送Emits: 更新parent数据updateData-->
<template>
  <q-dialog v-model="showImageGallery" full-width persistent>
    <q-card>
      <ImageGallery :my-images="myImages" type="stallDetails" />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="返回" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="modifyTime" persistent>
    <q-card class="my-card">
      <OperationTimeEditor
        :my-stall-details="myStallDetails"
        @changeTime="changeTime"
      />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="返回" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <div class="q-pa-md">
    <q-markup-table separator="cell" wrap-cells style="table-layout: fixed">
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
          <td class="text-center" style="white-space: pre-wrap">
            <template
              v-if="
                rowTitle.engTitle === 'stallName' ||
                rowTitle.engTitle === 'stallFloor' ||
                rowTitle.engTitle === 'canteenName'
              "
            >
              {{ myStallDetails[rowTitle.engTitle] }}
            </template>
            <template v-if="rowTitle.engTitle === 'stallOperationtime'">
              <div
                v-for="time in myStallDetails[rowTitle.engTitle]"
                :key="time.name"
                class="q-py-xs"
              >
                {{ time.name }} {{ time.startTime }} - {{ time.endTime }}
              </div>
            </template>
            <template v-if="rowTitle.engTitle === 'stallDescribe'">
              {{ shortenDescribe }} <strong v-if="shorten">...查看更多</strong>
            </template>
            <template v-if="rowTitle.engTitle === 'stallImages'">
              <q-btn
                color="primary"
                label="查看/编辑图片"
                @click="showImageGallery = true"
              />
            </template>
            <template v-if="rowTitle.modifiable">
              <q-btn
                v-if="rowTitle.engTitle === 'stallOperationtime'"
                color="primary"
                label="修改营业时间"
                @click="modifyTime = true"
              />
              <q-popup-edit
                v-if="rowTitle.engTitle === 'stallDescribe'"
                v-model="myStallDetails[rowTitle.engTitle]"
                title="更新档口简介"
                v-slot="scope"
                auto-save
              >
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  autogrow
                  type="textarea"
                  :rules="[(val) => !!val || '* 不能为空']"
                />
              </q-popup-edit>
            </template>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { ref, reactive, watch, computed } from "vue";
import ImageGallery from "components/ImageGallery";
import { STAFF_API_LINKS } from "app/api-links";
import { useStore } from "vuex";
import OperationTimeEditor from "components/OperationTimeEditor";

const API_LINK = STAFF_API_LINKS.dashboard;

//档口信息表格的column名字
const STALL_DETAILS_COLUMNS = [
  { engTitle: "Attribute Name", title: "档口基本信息" },
  { engTitle: "Attribute", title: "属性" },
];

export default {
  name: "StallDetailsTable",
  components: { OperationTimeEditor, ImageGallery },
  props: {
    rowsTitle: {
      type: Array,
      required: true,
    },
  },
  setup() {
    //showImageGallery: 控制图片库的开关
    //myStallDetails: 重新复制档口信息，以直接修改档口信息
    const store = useStore();
    const showImageGallery = ref(false);
    const modifyTime = ref(false);
    const myStallDetails = reactive({
      ...store.state.stallDetails.stallDetailsData,
    });
    const myImages = computed(() => store.state.stallDetails.stallImagesData);
    const newImage = ref(null);
    const shortenDescribe = computed(() =>
      myStallDetails.stallDescribe.slice(0, 14)
    );
    const shorten = computed(
      () => shortenDescribe.value.length < myStallDetails.stallDescribe.length
    );

    function addImages(images) {
      newImage.value = images.value;
    }

    function changeTime(newStallOperationTime) {
      myStallDetails.stallOperationtime = newStallOperationTime;
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
      myStallDetails,
      showImageGallery,
      modifyTime,
      myImages,
      shortenDescribe,
      shorten,
      addImages,
      changeTime,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
