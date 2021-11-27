<template>
  <q-btn color="primary" label="储存修改" @click="saveChanges" />
  <div class="q-pa-md">
    <q-markup-table separator="cell" wrap-cells>
      <thead>
        <tr>
          <th
            class="text-center"
            v-for="column in STALL_DETAILS_COLUMNS"
            :key="column.name"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.engTitle">
          <td class="text-center">{{ row.engTitle }}</td>
          <td class="text-center">
            <template v-if="row.engTitle !== 'stallImages'">
              {{ stallDetails.data[row.engTitle] }}
            </template>
            <template v-else>
              <q-btn
                v-if="row.engTitle === 'stallImages'"
                color="primary"
                label="查看/编辑图片"
                @click="showPictureEditor = true"
              />
            </template>
            <template v-if="row.modifiable">
              <q-popup-edit
                v-if="row.engTitle === 'stallOperationtime'"
                v-model="stallDetails.data[row.engTitle]"
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
                v-if="row.engTitle === 'stallDescribe'"
                v-model="stallDetails.data[row.engTitle]"
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
  <q-dialog v-model="showPictureEditor" full-width persistent>
    <q-card>
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="primary"
        navigation
        padding
        arrows
        height="300px"
        class="bg-grey-1 shadow-2 rounded-borders"
      >
        <q-carousel-slide :name="1" class="column no-wrap">
          <div
            class="
              row
              fit
              justify-start
              items-center
              q-gutter-xs q-col-gutter
              no-wrap
            "
          >
            <q-img
              class="rounded-borders col-6 full-height"
              src="https://cdn.quasar.dev/img/mountains.jpg"
            />
            <q-img
              class="rounded-borders col-6 full-height"
              src="https://cdn.quasar.dev/img/parallax1.jpg"
            />
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap">
          <div
            class="
              row
              fit
              justify-start
              items-center
              q-gutter-xs q-col-gutter
              no-wrap
            "
          >
            <q-img
              class="rounded-borders col-6 full-height"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
            <q-img
              class="rounded-borders col-6 full-height"
              src="https://cdn.quasar.dev/img/quasar.jpg"
            />
          </div>
        </q-carousel-slide>
      </q-carousel>

      <q-card-section>
        <div class="text-h6">上传新图片</div>
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
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const STALL_DETAILS_COLUMNS = [
  {
    name: "attributeName",
    label: "档口基本信息",
  },
  {
    name: "attribute",
    label: "属性",
  },
];
const OPERATION_TIME_OPTIONS = ["早上", "中午", "晚上"];
const API_LINK = "mystall-post";

export default {
  name: "StallDetailsTable",
  props: {
    stallDetailsData: {
      type: Object,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const $q = useQuasar();
    const showPictureEditor = ref(false);
    const stallDetails = reactive({ data: { ...props.stallDetailsData } });
    async function sendData() {
      try {
        return await api.post(API_LINK, stallDetails.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    function saveChanges() {
      sendData().then((response) => {
        console.log(response);
        if (response.status === 201) {
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
    // console.log(props.stallDetailsData);

    return {
      STALL_DETAILS_COLUMNS,
      OPERATION_TIME_OPTIONS,
      stallDetails,
      saveChanges,
      //图片还未处理好
      uploadedPicture: ref(null),
      showPictureEditor,
      slide: ref(1),
    };
  },
};
</script>

<style scoped></style>
