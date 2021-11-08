<template>
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img :src="imgSrc"/>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{title}}</q-item-label>
          <q-item-label caption>
            {{subhead}}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-8">
          {{content}}
        </q-card-section>

        <q-separator vertical />

        <q-img
        class="comment_pic"
        :src="imgSrc2"
        />
      </q-card-section>
    </q-card>
</template>
<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: "JudgeCardSection",
    props:{
        content: {
            type:String,
            default:''
        },
        imgSrc: {
            type:String,
            default:'#'
        },
        imgSrc2: {
            type:String,
            default:'#'
        },
        title: {
            type:String,
            default:''
        },
        subhead: {
            type:String,
            default:''
        },
    },
    setup() {

    },
})
</script>

<style lang="sass" scoped>
.comment_pic
  width:40%
</style>
