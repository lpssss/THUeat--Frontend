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
      <div>
        {{ shortenComment }}
      </div>
      <span
        ><strong>...</strong
        ><q-btn flat color="grey" dense @click="dialog = true"
          >查看完整评论</q-btn
        ></span
      >
    </q-card-section>
    <q-card-section vertical class="q-pt-none">
      <template v-if="reviewImages.length">
        <a :href="reviewImages[0]" target="_blank"
          ><q-img fit="contain" height="100px" :src="reviewImages[0]"
        /></a>
      </template>
      <div v-else class="relative-position" style="height: 100px">
        <div class="absolute-center" style="opacity: 0.5">无图片</div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-btn
        v-if="myReviewLike === null"
        size="sm"
        falt
        round
        color="primary"
        icon="thumb_up_alt"
        @click="postReviewLikes(reviewID)"
      />
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
    </q-card-section>
  </q-card>

  <q-dialog v-model="dialog" full-width persistent>
    <q-card>
      <q-card-section>
        <div class="q-pa-sm">
          <div class="text-h6">评分</div>
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
        <div class="q-pa-sm" v-if="reviewTags!==undefined && reviewTags.length">
          <div class="text-h6">标签</div>
          <q-chip
            v-for="tag in reviewTags"
            :key="tag"
            color="primary"
            text-color="white"
            >{{ tag }}</q-chip
          >
        </div>
        <div class="q-pa-sm" v-if="dishes!== undefined && dishes.length">
          <div class="text-h6">菜品</div>
          <q-chip
            v-for="dish in dishes"
            :key="dish"
            color="teal"
            text-color="white"
            >{{ dish.dishName }}</q-chip
          >
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-sm">
          <div class="text-h5">完整评论内容</div>
          <q-item-label caption>
            {{ displayReviewDateTime }}
          </q-item-label>
          <q-separator />
          <div class="text-body1">
            {{ reviewComment }}
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-pa-sm">
          <div class="text-h5">档主回复</div>
          <q-item-label caption>
            {{ displayReplyDateTime }}
          </q-item-label>
          <q-separator />
          <template v-if="replyComment!==undefined && replyComment.length">
            <div class="text-body1">
              {{ replyComment }}
            </div>
          </template>
          <div v-else style="opacity: 0.5">暂无回复</div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-pa-sm">
          <div class="text-h5">图片</div>
          <q-separator />
          <template v-if="reviewImages.length">
            <div class="row items-start q-gutter-xm">
              <q-card
                v-for="idx in reviewImages.length"
                :key="idx"
                class="my-card-picture"
              >
                <q-card-section>
                  <a :href="reviewImages[idx - 1]" target="_blank"
                    ><q-img
                      fit="contain"
                      height="100px"
                      :src="reviewImages[idx - 1]"
                  /></a>
                </q-card-section>
              </q-card>
            </div>
          </template>
          <div v-else style="opacity: 0.5">无图片</div>
        </div>
      </q-card-section>

      <!-- Notice v-close-popup -->
      <q-card-actions align="right">
        <q-btn flat label="关闭" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {api} from "boot/axios";
import userAppState from "src/store/userAppState";

export default defineComponent({
  emits:["likeChange"],
  setup(props) {
    const shortenComment = computed(() => props.reviewComment.slice(0, 25));

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
    },
    reviewComment: {
      type: String,
      default: "",
    },
    myReviewLike: {
      type: Boolean,
      require: true,
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
    dishes: {
      type: Object,
    },
    reply:{
      type:Boolean
    },
    stallID:{
      type:Number
    },
    stallName:{
      type:String
    }
  },
  methods: {
    postReviewLikes(ID) {
      // console.log(this.myReviewLike);
      let API_LINK = `reviews/like/${ID}`;

      //loginstatus相关
      const { getToken } = userAppState();
      const loginStatus = computed(() => {
        const token = getToken().value;
        return token !== null;
      });

      // console.log(this.islike);
      if (!loginStatus.value) {
        this.$router.push("/login");
      } else if (this.myReviewLike === false) {
        api.post(API_LINK).then((res) => {
          if (res.data.code === 200) {
            this.$emit("likeChange");
            // console.log("successfully thumb up");
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              timeout: 500,
              message: "点赞成功",
            });
          } else {
            // console.log("error");
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "error",
              timeout: 1000,
              message: "点赞失败，请刷新重试",
            });
          }
        });
      } else {
        api.delete(API_LINK).then((res) => {
          if (res.data.code === 200) {
            this.$emit("likeChange");
            // console.log("successfully delete thumb up");
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              timeout: 500,
              message: "取消点赞成功",
            });
          } else {
            // console.log("error");
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "error",
              timeout: 1000,
              message: "取消点赞失败，请刷新重试",
            });
          }
        });
      }
    },
  },
});
</script>

<style lang="sass" scoped>
.my-card-picture
  width: 100%
  max-width: 250px
.my-card-comment
  width: 100%
  max-width: 250px
</style>
