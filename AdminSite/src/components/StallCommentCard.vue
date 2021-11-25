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
        <q-card-section class="text-subitle2">
          <q-form @submit="onSubmit">
            <q-input
              filled
              v-model="name"
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

export default {
  name: "StallCommentCard",
  props: {
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
  setup() {
    return {
      expanded: ref(false),
    };
  },
};
</script>

<style scoped></style>
