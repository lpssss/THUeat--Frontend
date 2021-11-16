<template>
    <q-checkbox keep-color v-model="foodLabel" :label="labelName" />
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: "LabelSection",
    props: {
        labelName: {
            type: String,
            required: true
        },

        select: {
            type: Boolean,
            default: false
        }
    },
    setup (props) {
        return {
            foodLabel: ref(props.select)
        }
    }
})
</script>

<style>

</style>