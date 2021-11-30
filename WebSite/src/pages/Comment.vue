<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="commentBanner"/>
    </div>

    <div class="q-pt-none row justify-center items-center">
      <q-form @submit="onSubmit" class="q-gutter-md">
      </q-form>
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
        <q-btn @click="onComment">提交</q-btn>
      </div>
      <div class="col-3 q-pa-md" align="left"></div>
    </div>
  </q-page>

</template>

<script>
import {defineComponent, ref, reactive, computed} from 'vue';
import { useQuasar } from 'quasar';
import axios from "axios";
import BannerSection from "components/Layout/BannerSection";
import LabelSection from "components/CommentPage/LabelSection";
import {useStore} from "vuex";
import {useRouter} from "vue-router";


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

  data() {
    return {
      acceptclause: false,
    }
  },

  setup () {
    const $q = useQuasar()
    const store=useStore()
    const router=useRouter()

    function checkFileType (files) {
      return files.filter(file => file.type === 'image/*')
    }

    function onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      $q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} 个文件上传失败`
      })
    }
    //点击提交评论按钮后确认是否是登录状态，如果不是，跳转到登陆页面
    function onComment(){
      console.log(store._state.data.login.loginStatus)
      if(!store._state.data.login.loginStatus){
        router.push('/login')
      }
      if (ref(this.ratingModel) === 0) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请先对档口进行打分",
          timeout: 500,
        });
      }
      else{
        console.log('submit successfully')
      }
    }



    return {
      checkFileType,
      onRejected,
      onComment,
      text: ref(''),
      dishModel: ref(null),
      ratingModel: ref(0),
      dishOptions: dishOptions,
      commentBanner: commentBanner,
      labels: labels,
    }
  },
})

</script>
