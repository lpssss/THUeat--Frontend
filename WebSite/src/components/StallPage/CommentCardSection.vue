<template>
    <q-card class="my-card" flat bordered >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img :src="imgSrc"/>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{title}}</q-item-label>
          <q-item-label caption>
            {{ subhead }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      
        <q-card-section>
          <div class="ellipsis-2-lines" >
              {{ content }}
          </div>
        </q-card-section>
        
        <q-card-section vertical >
          <q-img :src="commentImgSrc1"/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn size="sm" falt round color="primary" icon="thumb_up" />
          <span class="q-px-sm text-caption text-grey"> {{ thumb }} </span>
        </q-card-section>
        
        

      
    </q-card>
</template>


  

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: "CommentCardSection",
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
        thumb: {
            type: Number,
            default: 5
        },
        title: {
            type:String,
            default:''
        },
        subhead: {
            type:String,
            default:''
        },
        commentImgSrc1: {
            type:String,
            default:'#'
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
