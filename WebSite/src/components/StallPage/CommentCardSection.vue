<template>
  <q-card class="my-card-comment" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <q-img :src="userImage" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ userName }}</q-item-label>
        <q-item-label caption>{{ displayReviewDateTime }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section>
      <div class="ellipsis-2-lines">{{ shortenComment }}</div>
      <span v-if="needDialog">
        <strong>...</strong>
        <q-btn flat color="grey" dense @click="dialog = true">查看完整评论</q-btn>
      </span>
    </q-card-section>

    <q-card-section vertical class="q-pt-none">
      <q-carousel
        v-model="curSlide"
        arrows
        infinite
        animated
        control-color="black"
        height="125px"
        padding
      >
        <q-carousel-slide v-for="idx in reviewImages.length" :name="idx" :key="idx">
          <a :href="reviewImages[idx - 1]" target="_blank">
            <q-img fit="contain" height="100px" :src="reviewImages[idx - 1]" />
          </a>
        </q-carousel-slide>
      </q-carousel>
    </q-card-section>

    <q-separator />
    <q-card-section>
      <div>
        <q-chip v-for="tag in reviewTags" :key="tag">{{ tag }}</q-chip>
      </div>
      <div>
        <q-chip v-for="dish in dishes" :key="dish">{{ dish.dishName }}</q-chip>
      </div>
      <div>
        <q-rating
          v-model="displayRating"
          size="1.5em"
          color="primary"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          readonly
        />
      </div>
    </q-card-section>
    <q-separator />

    <q-card-section class="q-pt-none">
      <q-btn
        v-if="myReviewLike === false"
        size="sm"
        falt
        round
        color="primary"
        icon="thumb_up_off_alt"
        @click="postReviewLikes(reviewID)"
      />
      <q-btn
        v-if="myReviewLike === true"
        size="sm"
        falt
        round
        color="primary"
        icon="thumb_up_alt"
        @click="postReviewLikes(reviewID)"
      />
      <span class="q-px-sm text-caption text-grey">{{ reviewLikes }}</span>

      <q-dialog v-model="dialog" persistent>
        <q-card>
          <q-card-section>
            完整评论内容
            <br />
            <q-item-label caption>{{ displayReviewDateTime }}</q-item-label>
            <q-separator />
            <div class="ellipsis-2-lines">{{ reviewComment }}</div>
          </q-card-section>
          <q-card-section>
            档主回复
            <br />
            <q-item-label caption>{{ displayReplyDateTime }}</q-item-label>
            <q-separator />
            <div class="ellipsis-2-lines">{{ replyComment }}</div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, defineComponent, computed } from "vue";
import { api } from "boot/axios";
import userAppState from "src/store/userAppState";

export default defineComponent({
  setup(props) {
    const shortenComment = computed(() => props.reviewComment.slice(0, 50));
    const needDialog = computed(
      () =>
        props.replyDateTime.length !== 0 ||
        shortenComment.value.length < props.reviewComment.length
    );
    function processDateTime(datetime) {
      const temp = datetime.split("T");
      const temp1 = temp[1].split(":");
      const arr = [];
      arr.push(temp[0]);
      arr.push(temp1[0] + ":" + temp1[1]);
      return arr.join(" ");
    }
    const displayReviewDateTime = computed(() =>
      processDateTime(props.reviewDateTime)
    );
    const displayReplyDateTime = computed(() => {
      if (props.replyDateTime.length === 0) return "";
      else return processDateTime(props.replyDateTime);
    });
    return {
      needDialog,
      shortenComment,
      displayReviewDateTime,
      displayReplyDateTime,
      curSlide: ref(1),
      dialog: ref(false),
      islike: ref(false),
      displayRating: ref(props.rate),
    };
  },

  name: "CommentCardSection",
  props: {
    reviewID: {
      type: Number,
    },
    replyComment: {
      type: String,
      default: "#",
    },
    reviewComment: {
      type: String,
      default: "",
    },
    myReviewLike: {
      type: Boolean,
      require: true
    },
    userImage: {
      type: String,
      default: "#",
    },
    reviewLikes: {
      type: Number,
      default: 5,
    },
    userName: {
      type: String,
      default: "",
    },
    reviewDateTime: {
      type: String,
      default: "",
    },
    replyDateTime: {
      type: String,
      default: "",
    },
    reviewImages: {
      type: Array,
    },
    rate: {
      type: Number,
    },
    reviewTags: {
      type: Array,
    },
    dishes:{
      type:Object
    }
  },
  methods: {
    postReviewLikes(ID){
      console.log(this.myReviewLike)
      var reviewID = ID;
      var API_LINK = `reviews/like/${reviewID}`

      //loginstatus相关
      const { getToken, resetState } = userAppState();
      const loginStatus = computed(() => {
        const token = getToken().value;
        return token !== null;
      });

      console.log(this.islike)
      if(!loginStatus.value){
        this.$router.push('/login')
      }
      else if (this.myReviewLike === false) {
        api.post(API_LINK).then(res => {
          if (res.data.code === 200) {
            this.$emit("likeChange");
            console.log("successfully thumb up");
          } else {
            console.log("error")
          }
        });
      }
      else {
        api.delete(API_LINK).then(res => {
          if (res.data.code === 200) {
            this.$emit("likeChange");
            console.log("successfully delete thumb up");
          } else {
            console.log("error");
          }
        });
      }
    }
  },
});
</script>

<style lang="sass" scoped>
.my-card-comment
  max-width: 250px
</style>
