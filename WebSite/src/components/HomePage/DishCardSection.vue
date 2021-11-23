<template>
    <q-card class="my-card">
        <q-img :src="dishImage" :alt="dishName" class="q-card-img"/>

        <q-card-section class="q-pb-none">
          <div class="text-h6"><router-link :to="{path:'/dish',query:{dishName:dishName}}">{{ dishName }}</router-link></div>
          <div class="text-subtitle2"> {{ canteenName }} </div>
        </q-card-section>

        <q-card-section>
          <div class="ellipsis-2-lines" >
              {{ dishBestComment }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn size="sm" falt round color="primary" icon="thumb_up" />
          <span class="q-px-sm text-caption text-grey"> {{ dishLikes }} </span>
        </q-card-section>
    </q-card>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: "DishCardSection",
    props: {
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

        dishImage: {
            type: String,
            default: '#'
        },
    }
})
</script>

<style>

</style>
