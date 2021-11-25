<template>
  <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">   <!--需要判断获取数据是否完成-->
    <StallCommentCard
      v-for="review in reviews"
      v-bind="review"
      :key="review.reviewID"
    />
  </div>
</template>

<script>
const reviews=[
  {
    "reviewID": "1",
    "reviewComment": "很好吃，就是每次中午下课后排队要排很久，有时候刚到食堂就发现这道菜已经卖完了。这种受欢迎的菜品可以多做一些。",
    "userName": "小明",
    "reviewDateTime": "2021-11-11 14:20",
    "userImage": "https://cdn.quasar.dev/img/avatar.png",
    "reviewImage": "https://cdn.quasar.dev/img/parallax2.jpg",
    "reviewTags": ["a", "b", "c"],
    "reviewLikes": 100,
    "myReviewLike": true,
    "reply": true,
    "replyDateTime": "string",
    "replyComment": "string",
    "dishes": [
      {
        "dishID": "string",
        "dishName": "string"
      },
      {
        "dishID": "string",
        "dishName": "string"
      }
    ]
  },
  {
    "reviewID": "2",
    "reviewComment": "菜品味道不错，分量很足，如果能再淡一些就更好了。",
    "userName": "小红",
    "reviewDateTime": "2021-11-1 14:20",
    "userImage": "https://cdn.quasar.dev/img/avatar.png",
    "reviewImage": "https://cdn.quasar.dev/img/parallax2.jpg",
    "reviewTags": ["a", "b", "c"],
    "reviewLikes": 10,
    "myReviewLike": true,
    "reply": true,
    "replyDateTime": "string",
    "replyComment": "string",
    "dishes": [
      {
        "dishID": "string",
        "dishName": "string"
      },
      {
        "dishID": "string",
        "dishName": "string"
      }
    ]
  }
];
import StallCommentCard from "components/StallCommentCard";
export default {
  name: "CommentReply",
  components: {StallCommentCard},
  setup(){
    // const API_LINK = "http://localhost:3000/"; // 之后放真正的API
    // const reviewsData = {};
    // const getReviesData = async () => {
    //   try {
    //     const response = await axios.get(API_LINK);
    //     reviewsData = response.data[0];
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // };
    return {
      reviews
    }
  }
}
</script>

<style scoped>

</style>
