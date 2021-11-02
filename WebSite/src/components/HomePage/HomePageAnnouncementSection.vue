<template>
    <q-carousel-slide :name="name" :img-src="imgSrc">
        <div class="absolute-bottom custom-caption">
            <div class="text-h4">{{ title }}</div>
            <div class="text-subtitle1">{{ content }}</div>
        </div>
    </q-carousel-slide>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: "HomePageAnnouncementSection",
    props: {
        name: {
            type: String,
            required: true
        },

        title: {
            type: String,
            default: ''
        },

        content: {
            type: String,
            default: ''
        },

        imgSrc: {
            type: String,
            default: '#'
        },
    },
    setup () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
})
</script>

<style>

</style>