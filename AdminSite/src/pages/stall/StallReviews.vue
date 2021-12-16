<!--种类：页面 "/staff/reviews"--->
<!--功能：档主菜品管理页面，将菜品管理页面所有Components整合一起，获取页面所需数据并整理分配到旗下Components-->
<!--所需Components：评论卡片StallReviewsCard-->
<!--备注：由于API fetch有延时，因此为了避免warning，使用v-if在获得数据后才开始render-->
<template>
  <div
    class="q-pa-md row items-start q-gutter-md justify-center col-md-4"
    v-if="!isLoading"
  >
    <template v-if="reviewsData.length">
      <StallReviewsCard
        v-for="review in reviewsData"
        v-bind="review"
        :key="review.reviewID"
        @addReplyComment="addReplyComment"
      />
    </template>
    <h5 v-else class="absolute-center" style="opacity: 0.5">暂无评论</h5>
  </div>
</template>

<script>
import { staffapi } from "boot/axios";
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import StallReviewsCard from "components/StallReviewsCard";
import { STAFF_API_LINKS } from "app/api-links";

const API_LINK = STAFF_API_LINKS.reviews;

export default {
  name: "StallReviews",
  components: { StallReviewsCard },
  setup() {
    //reviewsData: 所有档口相关的评论数据
    const $q = useQuasar();
    const reviewsData = ref([]);
    const isLoading = ref(true);
    $q.loading.show({
      message: "页面加载中",
    });

    //功能：获取档口相关所有评论信息，失败会显示错误信息
    async function getReviewsData() {
      try {
        const response = await staffapi.get(API_LINK);
        reviewsData.value = response.data.data;
        isLoading.value = false;
      } catch (err) {
        $q.notify({
          type: "error",
          message: "获取数据失败，请刷新页面重试",
        });
        isLoading.value = false;
      }
    }
    function addReplyComment({ reviewID, replyComment, replyDateTime }) {
      for (let i = 0; i < reviewsData.value.length; i++) {
        if (reviewsData.value[i].reviewID === reviewID) {
          reviewsData.value[i].replyComment = replyComment;
          reviewsData.value[i].replyDateTime = replyDateTime;
          break;
        }
      }
    }
    watch(isLoading, (newState, _) => {
      if (newState) {
        $q.loading.show({
          message: "页面加载中",
        });
      } else {
        $q.loading.hide();
      }
    });
    //运行获取评论信息
    getReviewsData();

    return {
      isLoading,
      reviewsData,
      addReplyComment,
    };
  },
};
</script>

<style scoped></style>
