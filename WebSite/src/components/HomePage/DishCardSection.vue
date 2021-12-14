<template>
    <q-card class="my-card">
        <q-img :src="dishImages" :alt="dishName" class="q-card-img"/>

        <q-card-section class="q-pb-none">
          <div class="text-h6"><router-link :to="{path:'/dish',query:{dishID:dishID}}">{{ dishName }}</router-link></div>
          <div class="text-subtitle2"> {{ canteenName }} </div>
          价格：{{dishPrice}} <br/>售卖时间：{{ dishAvailableTime }}
        </q-card-section>

        <q-card-section>
          <div class="ellipsis-2-lines" >
              {{ dishBestComment }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn size="sm" falt round color="primary" icon="thumb_up" @click="PostdishLikes(dishID)" />
          <span class="q-px-sm text-caption text-grey"> {{ dishLikes }} </span>
        </q-card-section>
    </q-card>
</template>

<script>
import { ref, defineComponent } from 'vue'
import axios from "axios";
import { api } from "boot/axios";
export default defineComponent({
    setup () {
    return {
      isDishLike: ref(false),
      code:"",
      }
    },
    name: "DishCardSection",
    props: {
        dishID: {
          type: Number,
          required: true
        },
        dishName: {
            type: String,
            required: true
        },

        canteenName: {
            type: String,
            default: ''
        },

        dishLikes: {
            type: Number,
            default: 5
        },

        dishPrice: {
            type: Number,
            default: 1
        },
        dishAvailableTime: {
            type:String,
            default:'#'
        },
        dishBestComment: {
            type: String,
            default: 'No comment.'
        },

        dishImages: {
            type: String,
            default: '#'
        },
    },
    methods:{
      PostdishLikes(ID){
        var dishID = ID;
        var API_LINK = `dishes/${dishID}`

        var that=this;
        if(!this.$store.state.login.loginStatus){
          this.$router.push('/login')
        }
        else{
          var req; 
          api.post(API_LINK,NaN).then(function(response){
            that.code = response.data.code;
            console.log("post ,Get data:"+that.code);
          });

          if(that.code == "400"){
            api.delete(API_LINK,NaN).then(function(response){
              console.log("Delete ,Get data:"+response.data.code)
            });
          }
        }
       
      }
 
    }
})
</script>

<style>

</style>
