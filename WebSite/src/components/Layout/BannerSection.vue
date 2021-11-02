<template>
    <q-banner inline-actions class="text-black bg-grey-3">
          {{ content }}  
          <template v-slot:action>
          <q-btn 
          v-if="change"
          flat 
          color="black" 
          label="换一批" 
          />
        </template>
      </q-banner>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: "BannerSection",
    props: {
        change: {
            type: Boolean,
            default: false
        },

        content: {
            type: String,
            default: '',
            require: true
        }
    }
})
</script>

<style>

</style>