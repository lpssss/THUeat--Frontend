<template>
    <q-card class="my-card-comment" flat bordered >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img :src="userImage"/>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{userName}}</q-item-label>
          <q-item-label caption>
            {{ reviewDateTime }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator/>
      
      <q-card-section>
        <div class="ellipsis-2-lines" >
            {{ reviewComment }}
        </div>
      </q-card-section>
      
      <q-card-section vertical class="q-pt-none">
        <q-img :src="reviewImage"/>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-btn size="sm" falt round color="primary" icon="thumb_up" />
        <span class="q-px-sm text-caption text-grey"> {{ reviewLikes }} </span>
      </q-card-section>
      
    </q-card>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: "CommentCardSection",
    props:{
        reviewComment: {
            type:String,
            default:''
        },
        userImage: {
            type:String,
            default:'#'
        },
        reviewLikes: {
            type: Number,
            default: 5
        },
        userName: {
            type:String,
            default:''
        },
        reviewDateTime: {
            type:String,
            default:''
        },
        reviewImage: {
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
