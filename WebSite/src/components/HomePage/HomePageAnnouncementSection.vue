<template>
    <q-carousel-slide :name=noticeTitle :img-src=noticeImage>
        <div class="absolute-bottom custom-caption">
            <div class="text-h5">{{ noticeTitle }}</div>
            <div class="text-subtitle2">{{ noticeWords }}</div>
        </div>
    </q-carousel-slide>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: "HomePageAnnouncementSection",
    props: {
        noticeTitle: {
            type: String,
            default: "first"
        },

        noticeWords: {
            type: String,
            default: ''
        },

        noticeImage: {
            type: String,
            default: '#'
        },
    },
    setup () {}
})
</script>

<style>

</style>