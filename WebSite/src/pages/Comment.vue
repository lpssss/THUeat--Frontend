<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="commentBanner" />
    </div>

    <div class="q-pt-none row justify-center items-center">
      <div class="col-3 q-pa-md" align="right"></div>
      <div class="col-3 q-pa-md" align="left">
        <div style="max-width: 200px">
          <q-select
            multiple
            v-model="dishModel"
            :options="dishOptions"
            label="您想评价的菜品"
          />
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
      <div class="col-6 q-pa-md" align="center">
        <div style="max-width: 800px">
          <q-input v-model="text" filled type="textarea" label="在此输入评价" />
        </div>
      </div>
      <div class="col-3 q-pa-md"></div>

      <div class="col-3 q-pa-md" align="right"></div>
      <div class="col-3 q-pa-md" align="left">
        <div class="q-pl-none">
          <div class="q-gutter-sm">
            <!--
            <q-checkbox keep-color v-for="label in labels" :key="label.label" :label="label.label" v-model="foodLabel"/>
            -->
            <!--
            <LabelSection
              v-for="label in labels"
              v-bind="label"
              :key="label.labelName"
              @selectLabel="updateTags"
            />
            -->
            <q-option-group
              :options="options"
              type="checkbox"
              v-model="group"
            />
          </div>
        </div>
      </div>
      <div class="col-3 q-pa-md" align="right"></div>
      <div class="col-3 q-pa-md" align="left"></div>
    </div>

    <div class="q-pt-none row justify-center items-start">
      <div class="col-3 q-pa-md" align="right"></div>
      <div class="col-3 q-pa-md" align="left">
        <div class="q-pl-none">
          <ImagesUploader
            ref="imageUploader"
            @addedImages="addImages"
            multiple
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
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import BannerSection from "components/Layout/BannerSection";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { api } from "boot/axios";
import ImagesUploader from "components/ImagesUploader";

const commentBanner = {
  content: "评价页",
  change: false,
};

const dishOptions = ["宫保鸡丁", "鱼香茄子", "麻辣香锅", "北京烤鸭"];

const options = [
  { label: "好吃", value: "好吃" },
  { label: "太甜了", value: "太甜了" },
  { label: "太咸了", value: "太咸了" },
];

export default defineComponent({
  name: "Comment",
  components: {
    ImagesUploader,
    BannerSection,
    //LabelSection
  },

  data() {
    return {
      acceptclause: false,
    };
  },

  methods: {
    updateTags: function (data) {
      console.log(data);
    },
  },

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();

    const dishModel = ref(null);
    const ratingModel = ref(0);
    const text = ref();
    const group = ref([]);

    const route = useRoute();
    let name = route.query.stallName;
    //let API_LINK = `stallData/?stallName=${name}`; // 之后放真正的API

    //Image Uploader 相关
    const imageUploader = ref(null);
    const newImages = ref(null);
    const addImages = (images) => {
      newImages.value = images.value;
    };

    watch(
      () => route.query,
      () => {
        name = route.query.stallName;
        //API_LINK=`stallData/?stallName=${name}`
        console.log("watch", route.query.stallName);
      },
      {
        immediate: true,
      }
    );

    //点击提交评论按钮后确认是否是登录状态，如果不是，跳转到登陆页面
    function onComment() {
      console.log(store._state.data.login.loginStatus);
      if (!store._state.data.login.loginStatus) {
        router.push("/login");
      }
      if (ratingModel.value === 0) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请先对档口进行打分",
          timeout: 500,
        });
      } else {
        const date = new Date();
        console.log("submit successfully");
        console.log(group.value);
        console.log(date);
        //生成form data
        let formData = new FormData();
        formData.append("reviewDateTime", date);
        formData.append("rate", ratingModel.value);
        formData.append("reviewComment", text.value);
        // TODO 这个标签是string还是array？和后端确认一下
        formData.append("reviewTags");
        // TODO 这个所选择的菜品是array？如果是array，可以直接使用下面图片的写法，把newImages改成”所选择菜品的array“，reviewImages改成dishID即可
        formData.append("dishID");

        //添加图片进form data
        if (newImages.value !== null && newImages.value.length !== 0) {
          newImages.value.forEach((item) =>
            formData.append("reviewImages", item)
          );
        } else {
          formData.append("reviewImages", "");
        }
        // TODO POST 的API记得改，然后response要怎么处理记得加上
        api.post("users/password", formData).then((res) => {
          if (res.status === 200) {
            updateToken(res.data.token);
          }
          if (res.status === 404) {
            console.log("error");
          }
        });
      }
    }

    return {
      onComment,
      addImages,
      imageUploader,
      text,
      dishModel,
      ratingModel,
      dishOptions: dishOptions,
      commentBanner: commentBanner,
      group,
      options: options,
    };
  },
});
</script>
