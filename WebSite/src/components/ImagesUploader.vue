<!--种类：Component -->
<!--功能：图片上传工具，用户可上传多个图片-->
<!--pending：POST用户upload的图片-->
<template>
  <div class="q-pa-md">
    <q-file
      filled
      bottom-slots
      v-model="chosenImages"
      label="上传图片"
      counter
      :multiple="multiple"
      append
      clearable
      accept="image/*"
      @rejected="onRejected"
      style="max-width: 300px"
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" @click.stop />
      </template>
    </q-file>
    <q-btn
      v-if="uploadButton"
      label="上传"
      color="primary"
      @click="uploadImages"
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useQuasar } from "quasar";

export default {
  name: "ImagesUploader",
  props: {
    multiple: {
      type: Boolean,
    },
    uploadButton: {
      type: Boolean,
    },
  },
  emits:["addedImages","uploadImages"],
  setup(props, context) {
    const $q = useQuasar();
    const chosenImages = ref(null);
    function onRejected() {
      $q.notify({
        type: "error",
        message: "请上传图片",
      });
    }
    function clearInput() {
      chosenImages.value = null;
    }
    function uploadImages() {
      context.emit("uploadImages", chosenImages);
    }
    watch(
      () => chosenImages,
      (images) => context.emit("addedImages", images),
      { deep: true }
    );
    return {
      chosenImages,
      onRejected,
      uploadImages,
      clearInput,
    };
  },
};
</script>

<style scoped></style>
