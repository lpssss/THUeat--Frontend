<template>
  <div class="q-pa-md">
    <q-markup-table separator="cell" wrap-cells>
      <thead>
        <tr>
          <th class="text-center" v-for="column in columns" :key="column.name">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rowDetails" :key="row.engName">
          <td class="text-center">{{ row.attributeName }}</td>
          <td class="text-center">
            <template v-if="row.engName !== 'stallImages'">
              {{ row.attribute }}
            </template>
            <template v-else>
              <q-btn
                v-if="row.engName === 'stallImages'"
                color="primary"
                label="查看/编辑图片"
                @click="showPictureEditor = true"
              />
            </template>
            <template v-if="row.modifiable">
              <q-popup-edit
                v-model="row.attribute"
                v-slot="scope"
                auto-save
                v-if="row.engName === 'stallOperationtime'"
              >
                <q-select
                  v-model="scope.value"
                  :options="operationtimeOptions"
                  label="请选择时段"
                />
              </q-popup-edit>
              <q-popup-edit
                v-model="row.attribute"
                v-slot="scope"
                auto-save
                v-if="row.engName === 'stallDescribe'"
                buttons
              >
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
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
        <q-file filled bottom-slots v-model="uploadedPicture" label="图片" counter style="max-width: 300px">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop="uploadedPicture = null" class="cursor-pointer" />
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
import { ref } from "vue";

const columns = [
  {
    name: "attributeName",
    label: "档口基本信息",
  },
  {
    name: "attribute",
    label: "属性",
  },
];

export default {
  name: "StallDetailsTable",
  props: {
    // rows的部分需要从api获取的数据整理
    rows: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    console.log(props.rows);
    return {
      uploadedPicture:ref(null),
      showPictureEditor: ref(false),
      slide: ref(1),
      operationtimeOptions: ["早上", "中午"],
      rowDetails: ref(props.rows),
      columns,
    };
  },
};
</script>

<style scoped></style>
