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
          <q-form @submit="onSubmit">
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
import { ref } from "vue";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
export default {
  name: "StallCommentCard",
  props: {
    reviewID:{
      type:String,
      required:true
    },
    reviewComment: {
      type: String,
      default: "菜品味道不错，分量很足，如果能再淡一些就更好了",
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
    reviewImage: {
      type: String,
      default: "#",
    },
  },
  setup(props) {
    console.log(props)
    const $q=useQuasar()
    const reply=ref("");
    const expanded=ref(false);
    function onSubmit(){
      async function sendData() {
        try {
          const API_LINK=`reviews/${props.reviewID}`
          console.log(props.reviewID)
          return await api.post("reviews-post", {replyComment:reply.value});
        } catch (error) {
          console.log(error.response.data);
        }
      }
      sendData().then((res) => {
        if (res.status === 201) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "回复成功",
            timeout: 500,
          });
        }
      });
    }
    return {
      expanded,
      reply,
      onSubmit
    };
  },
};
</script>

<style scoped></style>
