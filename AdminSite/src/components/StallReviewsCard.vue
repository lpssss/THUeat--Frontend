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
          {{ reviewDateTime }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section>
      <div class="ellipsis-2-lines">
        {{ reviewComment }}
      </div>
    </q-card-section>

    <q-card-section vertical class="q-pt-none">
      <q-img :src="reviewImage" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-btn size="sm" falt round color="primary" icon="thumb_up" />
      <span class="q-px-sm text-caption text-grey"> {{ reviewLikes }} </span>
      <q-btn color="primary" label="回复" @click="expanded = !expanded" />
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
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <div>
              <q-btn label="回复" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
import { api } from "boot/axios";
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  name: "StallReviewsCard",
  props: {
    reviewID: {
      type: String,
      required: true,
    },
    reviewComment: {
      type: String,
      default: "",
    },
    userImage: {
      type: String,
    },
    reviewLikes: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
      default: "",
    },
    reviewDateTime: {
      type: String,
      default: "",
    },
    reviewImage: {
      type: String,
    },
  },
  setup(props) {
    //reply: 回复内容
    //expanded: 控制回复框的开关
    const $q = useQuasar();
    const reply = ref("");
    const expanded = ref(false);

    //功能：将回复内容更新到后端，并显示状态（成功 & 失败）
    function replyReview() {
      async function sendData() {
        const API_LINK = `reviews/${props.reviewID}`;
        console.log(props.reviewID);
        return await api.post("reviews-post", { replyComment: reply.value });
      }
      sendData().then((res) => {
        if (res.status === 201) {
          $q.notify({
            type:"success",
            message: "回复成功",
          });
        }
      }).catch(err=>{
        console.log(err)
        $q.notify({
          type:"error",
          message: "回复失败，请重新回复",
        });
      })
    }
    return {
      expanded,
      reply,
      replyReview,
    };
  },
};
</script>

<style scoped></style>
