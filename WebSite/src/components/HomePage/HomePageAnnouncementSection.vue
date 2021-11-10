<template>
    <q-carousel-slide :name="name" :img-src="imgSrc">
        <div class="absolute-bottom custom-caption">
            <div class="text-h5">{{ title }}</div>
            <div class="text-subtitle2">{{ content }}</div>
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
            default: "first"
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
    setup () {}
})
</script>

<style>

</style>