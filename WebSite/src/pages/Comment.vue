<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="commentBanner"/>
    </div>

    <div class="q-pt-none row justify-center items-center">
      <div class="col-3 q-pa-md" align="right"></div>
      <div class="col-3 q-pa-md " align="left">
        <div style="max-width: 200px">
          <q-select multiple v-model="dishModel" :options="dishOptions" label="您想评价的菜品" />
        </div>
      </div>

      <div class="col-3 q-pa-md" align="right">
        <q-rating
            v-model="ratingModel"
            size="1.5em"
            color="primary"
            icon="star_border"
            icon-selected="star"
          />
      </div>
      <div class="col-3 q-pa-md" align="left"></div>

      <div class="col-3 q-pa-md" align="right"></div>
      <div class="col-6 q-pa-md"  align="center">
        <div style="max-width: 800px">
          <q-input
          v-model="text"
          filled
          type="textarea"
          label="在此输入评价"
        />
        </div>
      </div>
      <div class="col-3 q-pa-md"></div>

      <div class="col-3 q-pa-md" align="right"></div>
      <div class="col-3 q-pa-md " align="left">
        <div class="q-pl-none">
          <div class="q-gutter-sm">
            <!--
            <q-checkbox keep-color v-for="label in labels" :key="label.label" :label="label.label" v-model="foodLabel"/>
            -->
            <LabelSection
            v-for="label in labels"
            v-bind="label"
            :key="label.labelName"/>
          </div>
        </div>
      </div>
      <div class="col-3 q-pa-md" align="right"></div>
      <div class="col-3 q-pa-md" align="left"></div>
    </div>

    <div class="q-pt-none row justify-center items-start">
      <div class="col-3 q-pa-md" align="right"></div>
      <div class="col-3 q-pa-md " align="left">
        <div class="q-pl-none" >
          <q-uploader
              style="max-width: 200px"
              url="http://localhost:4444/upload"
              label="上传图片(png)"
              multiple
              :filter="checkFileType"
              @rejected="onRejected"
          />
        </div>
      </div>
      <div class="col-3 q-pa-md" align="right">
        <q-btn>提交</q-btn>
      </div>
      <div class="col-3 q-pa-md" align="left"></div>
    </div>  
  </q-page>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import BannerSection from "components/Layout/BannerSection";
import LabelSection from "components/CommentPage/LabelSection";


const commentBanner = {
  content: "评价页",
  change: false
}

const dishOptions = [
  '宫保鸡丁', '鱼香茄子', '麻辣香锅', '北京烤鸭'
];

const labels = [
  {
    labelName: '好吃',
  },
  {
    labelName: '太甜了',
  },
  {
    labelName: '太咸了',
  }
];

export default defineComponent({
  name: "Comment",
  components: {     
    BannerSection,
    LabelSection,
  },
  setup () {
    const $q = useQuasar()

    function checkFileType (files) {
      return files.filter(file => file.type === 'image/png')
    }

    function onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      $q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} 个文件上传失败，文件类型不符合要求`
      })
    }

    return {
      checkFileType,
      onRejected,
      text: ref(''),
      dishModel: ref(null),
      ratingModel: ref(0),
      dishOptions: dishOptions,      
      commentBanner: commentBanner,
      labels: labels,
    }
  }
})

</script>