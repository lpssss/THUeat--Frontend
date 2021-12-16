<!--种类：Component -->
<!--功能：评论卡片，显示用户评论，档主可回复评论-->
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
        <q-item-label caption>
          {{ displayReviewDateTime }}
        </q-item-label>
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
      <q-btn size="sm" round color="primary" icon="thumb_up" />
      <span class="q-px-sm text-caption text-grey"> {{ reviewLikes }} </span>
      <span class="q-pl-sm">
        <template v-if="!expanded">
          <q-btn
            v-if="replyDateTime.length"
            color="primary"
            label="重新回复"
            @click="expanded = true"
          />
          <q-btn
            v-else
            color="primary"
            label="首次回复"
            @click="expanded = true"
          />
        </template>
        <q-btn v-else color="primary" label="收起" @click="expanded = false" />
      </span>
    </q-card-section>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subtitle2">
          <q-form @submit="replyReview">
            <q-input
              filled
              v-model="reply"
              label="回复内容"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '请输入回复']"
            />
            <div>
              <q-btn label="回复" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </div>
    </q-slide-transition>
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
        <div class="q-pa-sm" v-if="reviewTags.length">
          <div class="text-h6">标签</div>
          <q-chip
            v-for="tag in reviewTags"
            :key="tag"
            color="primary"
            text-color="white"
            >{{ tag }}</q-chip
          >
        </div>
        <div class="q-pa-sm" v-if="dishes.length">
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
          <template v-if="replyComment.length">
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
import { staffapi } from "boot/axios";
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
export default {
  name: "StallReviewsCard",
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
  },
  emits: ["addReplyComment"],
  setup(props, context) {
    //reply: 回复内容
    //expanded: 控制回复框的开关
    const $q = useQuasar();
    const reply = ref("");
    const expanded = ref(false);
    const dialog = ref(false);
    const displayRating = ref(props.rate);
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

    //功能：将回复内容更新到后端，并显示状态（成功 & 失败）
    function replyReview() {
      async function sendData() {
        const API_LINK = `reviews/${props.reviewID}`;
        return await staffapi.post(API_LINK, { replyComment: reply.value });
      }
      sendData()
        .then((res) => {
          if (res.data.code === 200) {
            $q.notify({
              type: "success",
              message: "回复成功",
            });
            context.emit("addReplyComment", {
              reviewID: props.reviewID,
              replyComment: reply.value,
              replyDateTime: res.data.data.replyDateTime,
            });
            expanded.value = false;
            reply.value = "";
          } else {
            $q.notify({
              type: "error",
              message: res.data.message,
            });
          }
        })
        .catch((_) => {
          $q.notify({
            type: "error",
            message: "回复失败，请重新回复",
          });
        });
    }
    return {
      displayRating,
      shortenComment,
      displayReviewDateTime,
      displayReplyDateTime,
      expanded,
      reply,
      dialog,
      replyReview,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card-picture
  width: 100%
  max-width: 250px
.my-card-comment
  width: 100%
  max-width: 250px
</style>
