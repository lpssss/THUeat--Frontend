<template>
    <div class="q-pa-lg flex flex-center">
        <q-pagination
            v-model="current"
            :max="5"
            input
        />
    </div>
</template>
<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {
            current: 1,
        }
    },
})
</script>
