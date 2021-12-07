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

      <q-card-section vertical class="q-pt-none" >
        <q-img :src="reviewImage"/>
      </q-card-section>



      <q-card-section class="q-pt-none ">
        <q-btn size="sm" falt round color="primary" icon="thumb_up" @click="PostreviewLikes(reviewID)" />
        <span class="q-px-sm text-caption text-grey"> {{ reviewLikes }} </span>

      <q-btn label="More" flat color="grey"  dense @click="dialog = true" >

          <q-dialog v-model="dialog" persistent>
            <q-card>
              <q-card-section >
                档主回复
              </q-card-section>
              <q-separator />
              <q-card-section class="row items-center">
                <span class="q-ml-sm">{{ replyComment }}</span>
              </q-card-section>


              <!-- Notice v-close-popup -->
              <q-card-actions align="right">
                <q-btn flat label="Close" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

      </q-btn>
      </q-card-section>
    </q-card>
</template>

<script>
import { ref, defineComponent } from 'vue'
import axios from "axios";

export default defineComponent({

    setup () {
    return {
      dialog: ref(false),
      islike: ref(false),
      }
    },

    name: "CommentCardSection",
    props:{
        reviewID: {
            type:String,
            default:'#'
        },
        replyComment: {
            type:String,
            default:'#'
        },
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
     methods:{
      PostreviewLikes(ID){
        var reviewID = ID;
        var API_LINK = `http://localhost:3000/reviews/like/${reviewID}`
        console.log(this.islike)
                    if(!this.$store.state.login.loginStatus){
                      this.$router.push('/login')
                    }
                    else{
                      if(this.islike == true){
                        axios.delete(API_LINK,NaN,{headers:{Authorization:"token 9944b09199c62b4bbdfc6ee4b"}}).then(function(response){
                          console.log(response.data)
                          this.islike = false

                          this.$router.go(0)
                        });
                      }
                      else if(this.islike == false){
                        axios.post(API_LINK,NaN,{headers:{Authorization:"token 9944b09199c62b4bbdfc6ee4b"}}).then(function(response){
                          console.log(response.data)
                          this.islike = true

                          this.$router.go(0)
                        });
                      }
                    }
       
      }
 
    }

})
</script>

<style lang="sass" scoped>
.comment_pic
  width:100%
  max-height:80px
</style>
