<!--种类：Component -->
<!--功能：图片上传工具，用户可上传多个图片-->
<!--pending：POST用户upload的图片-->
<template>
  <div class="q-pa-md">
  <div class="text-h6 ">上传图片</div>
  <q-file
    filled
    bottom-slots
    v-model="chosenImages"
    label="图片"
    counter
    multiple
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
  </div>
</template>

<script>
import {ref} from "vue";
import {useQuasar} from "quasar";

export default {
  name: "ImagesUploader",
  setup(){
    const $q = useQuasar()
    const chosenImages=ref(null);
    function uploadImages(){
      console.log(chosenImages)
      // console.log(chosenImages.value[0])
      // const API_LINK="http://127.0.0.1:5000/upload"
      // let data=new FormData()
      // data.append('files',chosenImages.value[0])
      // console.log(data)
      // axios.post(API_LINK,data).then(res=>{
      //   console.log(res)
      // })
    }
    function onRejected () {
      $q.notify({
        type: 'error',
        message: "请上传图片"
      })
    }
    return {
      chosenImages,
      onRejected,
      uploadImages
    }
  }
}
</script>

<style scoped>

</style>
