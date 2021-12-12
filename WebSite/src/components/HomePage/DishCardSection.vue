<template>
    <q-card class="my-card">
        <q-img :src="dishImages" :alt="dishName" class="q-card-img"/>

        <q-card-section class="q-pb-none">
          <div class="text-h6"><router-link :to="{path:'/dish',query:{dishID:dishID}}">{{ dishName }}</router-link></div>
          <div class="text-subtitle2"> {{ canteenName }} </div>
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

export default defineComponent({
    setup () {
    return {
      isDishLike: ref(false),
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

        dishBestComment: {
            type: String,
            default: ''
        },

        dishImages: {
            type: String,
            default: '#'
        },
    },
    methods:{
      PostdishLikes(ID){
        var dishID = ID;
        var API_LINK = `http://localhost:3000/dishes/${dishID}`
        console.log(this.isDishLike)
                    if(!this.$store.state.login.loginStatus){
                      this.$router.push('/login')
                    }
                    else{
                      if(this.isDishLike == true){
                        axios.delete(API_LINK,NaN,{headers:{Authorization:"token 9944b09199c62b4bbdfc6ee4b"}}).then(function(response){
                          console.log(response.data)
                          this.isDishLike = false
                          this.$router.go(0)
                        });
                      }
                      else if(this.isDishLike == false){
                        axios.post(API_LINK,NaN,{headers:{Authorization:"token 9944b09199c62b4bbdfc6ee4b"}}).then(function(response){
                          console.log(response.data)
                          this.isDishLike = true
                          this.$router.go(0)
                        });
                      }
                    }
       
      }
 
    }
})
</script>

<style>

</style>
