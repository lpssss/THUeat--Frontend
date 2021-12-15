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
      <div class="ellipsis-2-lines">
        {{ shortenComment }}
      </div>
      <span v-if="needDialog"
        ><strong>...</strong
        ><q-btn flat color="grey" dense @click="dialog = true"
          >查看完整评论</q-btn
        ></span
      >
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
        <q-carousel-slide
          v-for="idx in reviewImages.length"
          :name="idx"
          :key="idx"
        >
          <a :href="reviewImages[idx - 1]" target="_blank"
            ><q-img fit="contain" height="100px" :src="reviewImages[idx - 1]"
          /></a>
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

  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section>
        完整评论内容<br />
        <q-item-label caption>
          {{ displayReviewDateTime }}
        </q-item-label>
        <q-separator />
        <div class="ellipsis-2-lines">
          {{ reviewComment }}
        </div>
      </q-card-section>
      <q-card-section>
        档主回复<br />
        <q-item-label caption>
          {{ displayReplyDateTime }}
        </q-item-label>
        <q-separator />
        <div class="ellipsis-2-lines">
          {{ replyComment }}
        </div>
      </q-card-section>

      <!-- Notice v-close-popup -->
      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
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
    dishes:{
      type:Object
    }
  },
  emits: ["addReplyComment"],
  setup(props, context) {
    //reply: 回复内容
    //expanded: 控制回复框的开关
    const $q = useQuasar();
    const curSlide = ref(1);
    const reply = ref("");
    const expanded = ref(false);
    const dialog = ref(false);
    const displayRating = ref(props.rate);
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
              replyDateTime: res.data.data.replyDateTime
            });
            reply.value = "";
            expanded.value=false
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
      needDialog,
      shortenComment,
      displayReviewDateTime,
      displayReplyDateTime,
      expanded,
      reply,
      dialog,
      curSlide,
      replyReview,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card-comment
  width: 100%
  max-width: 250px
</style>
