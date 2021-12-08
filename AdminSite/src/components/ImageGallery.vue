<!--种类：Component -->
<!--功能：图片库，用户可浏览或删除图片（上传由ImageUploader控制）-->
<!--所需Component：图片上传工具ImageUploader-->
<!--所需Props：档口图片链接images-->
<!--pending：保存更改（删除图片和上传图片-->
<template>
  <q-carousel
    v-model="curSlide"
    arrows
    navigation
    infinite
    animated
    control-color="primary"
  >
    <q-carousel-slide v-for="idx in myImages.length" :name="idx" :key="idx">
      <a :href="myImages[idx - 1]" target="_blank"
        ><q-img
          class="rounded-borders full-height"
          fit="contain"
          :ratio="4 / 3"
          :src="myImages[idx - 1]"
      /></a>
    </q-carousel-slide>
  </q-carousel>
  <div class="q-pa-md">
    <q-btn
      color="red"
      label="删除"
      @click="confirmDeleteImage(myImages[curSlide - 1])"
    />
  </div>
  <ImagesUploader multiple @addedImages="addImages" ref="imageUploader" />
  <div class="q-pa-md">
    <q-btn color="primary" label="保存修改" @click="saveChanges" />
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useQuasar } from "quasar";
import ImagesUploader from "components/ImagesUploader";
import { useStore } from "vuex";

export default {
  name: "ImageGallery",
  components: { ImagesUploader },
  props:{
    myImages:{
      type:Array,
      required:true
    },
    type:{
      type:String,
      required:true
    },
    args:{
      type:Object
    }
  },
  setup(props) {
    //curSlide：控制图片库滑动窗口的页面号码
    //myStallImages: 重新复制的档口信息，以直接修改images链接
    //imagesCount: 记录图片数量，以此控制滑动窗口页面号码
    //imageUploader: 用来控制ImageUploader(template ref)
    console.log(props.myImages)
    const $q = useQuasar();
    const store = useStore();
    const curSlide = ref(1);
    // const myImages = computed(() => store.state.stallDetails.stallImagesData);
    const imagesCount = computed(() => props.myImages.length);
    const newImages = ref(null);
    const hiddenImages = ref([]);
    const imageUploader = ref(null);
    // console.log({a:"a",...props.args})

    //输入1个数据：需删除的图片Link
    //功能：打开“确认删除图片”窗口，确认后前端会将图片进行隐藏（未保存到后端）
    function confirmDeleteImage(link) {
      $q.dialog({
        title: "确认删除",
        message: "您是否确认要删除此图片?",
        ok: { push: true, label: "确认" },
        cancel: { push: true, label: "取消" },
        persistent: true,
      }).onOk(() => {
        console.log("delete: ", link);
        hiddenImages.value.push(link);
        store.commit(`${props.type}/hideImage`, {link,...props.args});
      });
    }
    function addImages(images) {
      newImages.value = images.value;
    }
    function saveChanges() {
      store.dispatch(`${props.type}/saveImagesChanges`, {
        deleteImages: hiddenImages.value,
        newImages: newImages.value,
        ...props.args
      });
      imageUploader.value.clearInput();
    }

    //功能：根据图片数量进行控制滑动窗口，否则删除最后一个图片时curSlide会出问题，也能跳转到新添加的图片上
    watch(imagesCount, (newVal, preVal) => {
      // console.log(newVal, preVal);
      if (preVal >= newVal)
        curSlide.value === 1 ? (curSlide.value = 1) : (curSlide.value -= 1);
      else curSlide.value = newVal;
    });
    return {
      curSlide,
      imageUploader,
      confirmDeleteImage,
      addImages,
      saveChanges,
    };
  },
};
</script>

<style scoped></style>
