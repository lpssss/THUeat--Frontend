<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="commentBanner" />
    </div>

    <div class="q-pa-md row justify-center items-center">
      <div class="col-6 q-pa-md text-left">
        <div style="max-width: 200px">
          <q-select
            multiple
            v-model="dishModel"
            :options="dishes.data"
            label="您想评价的菜品"
          />
        </div>
      </div>

      <div class="col-6 q-pa-md text-right">
        <q-rating
          v-model="ratingModel"
          size="1.5em"
          color="primary"
          icon="star_border"
          icon-selected="star"
        />
      </div>

      <div class="col-12 q-pa-md text-center">
        <q-input v-model="text" filled type="textarea" label="在此输入评价" />
      </div>

      <div class="col-6 q-pa-md text-left">
        <q-option-group :options="options" type="checkbox" v-model="group" />
      </div>
      <div class="col-6 q-pa-md text-right">
        <q-btn @click="onComment">提交</q-btn>
      </div>
      <div class="col-12 q-pt-none text-left">
        <ImagesUploader ref="imageUploader" @addedImages="addImages" multiple />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useQuasar } from "quasar";
import BannerSection from "components/Layout/BannerSection";
import { useRouter, useRoute } from "vue-router";
import { api } from "boot/axios";
import ImagesUploader from "components/ImagesUploader";
import userAppState from "src/store/userAppState";

const commentBanner = {
  content: "评价页",
  change: false,
};

const dishOptions = ["宫保鸡丁", "鱼香茄子", "麻辣香锅", "北京烤鸭"];

const options = [
  { label: "好吃", value: "好吃" },
  { label: "不好吃", value: "不好吃" },
  { label: "一般般", value: "一般般" },
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
    const router = useRouter();

    const dishModel = ref(null);
    const ratingModel = ref(0);
    const text = ref();
    const group = ref([]);

    const route = useRoute();
    let stall_id=route.query.stallID

    //Image Uploader 相关
    const imageUploader = ref(null);
    const newImages = ref(null);
    const addImages = (images) => {
      newImages.value = images.value;
    };

    //loginstatus相关
    const { getToken } = userAppState();
    const loginStatus = computed(() => {
      const token = getToken().value;
      return token !== null;
    });

    watch(
      () => route.query,
      () => {
        stall_id=route.query.stallID
        // console.log("watch", route.query);
      },
      {
        immediate: true,
      }
    );

    //获取stall的所有菜品数据
    //let STALL_API_LINK = `stalls/${stall_id}`;
    const dishes = reactive({
      data: [],
      getID: {},
    });
    const stallDishesData = reactive({ data: {} });
    const getStallData = async () => {
      try {
        const response2 = await api.get(`stalls/${stall_id}`);
        stallDishesData.data = response2.data.data.dishes;
        for (let key in stallDishesData.data) {
          dishes.data.push(stallDishesData.data[key].dishName);
          dishes.getID[stallDishesData.data[key].dishName] =
            stallDishesData.data[key].dishID;
        }
      } catch (err) {
        $q.notify({
          type:"error",
          message: "获取数据失败，请刷新重试",
        });
      }
    };
    getStallData();

    //点击提交评论按钮后确认是否是登录状态，如果不是，跳转到登陆页面
    function onComment() {
      if (!loginStatus.value) {
        router.push("/login");
      } else {
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

          //生成form data
          let formData = new FormData();
          formData.append("reviewDateTime", date);
          formData.append("rate", ratingModel.value);
          formData.append("reviewComment", text.value);

          if (group.value !== null && group.value.length !== 0) {
            let selectTags = [];
            for (let key in group.value) {
              selectTags.push(group.value[key]);
            }
            // tag传一个array
            formData.append("reviewTags", selectTags);
          } else {
            formData.append("reviewTags", "");
          }

          if (dishModel.value !== null && dishModel.value.length !== 0) {
            dishModel.value.forEach(
              (item) => formData.append("dishID", dishes.getID[item])
              //console.log(dishes.getID[item])
            );
          } else {
            formData.append("dishID", "");
          }

          //添加图片进form data
          if (newImages.value !== null && newImages.value.length !== 0) {
            newImages.value.forEach((item) =>
              formData.append("reviewImages", item)
            );
          } else {
            formData.append("reviewImages", "");
          }

          // console.log("*** formdata content ***");
          // for (let pair of formData.entries()) {
          //   console.log(pair[0] + ", " + pair[1]);
          // }

          //console.log(stall_id)
          api.post(`reviews?stallID=${stall_id}`, formData).then((res) => {
            if (res.data.code === 200) {
              //updateToken(res.data.token);
              $q.notify({
                type: "success",
                message: "评论成功",
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                timeout: 500,
              });
              router.push(`/stall?stallID=${stall_id}`);
            }
            if (res.data.code !== 200) {
              console.log(res.data);
              $q.notify({
                type: "error",
                message: res.data.message,
                color: "red-5",
                textColor: "white",
                icon: "warning",
                timeout: 1000,
              });
            }
          });
        }
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
      dishes: dishes,
      //stallData,
    };
  },
});
</script>
