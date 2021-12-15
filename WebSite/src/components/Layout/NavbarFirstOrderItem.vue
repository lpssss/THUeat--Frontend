<template>
  <q-expansion-item
    :icon="icon"
    :label="title"
    v-if="secondOrderStatus"
    :content-inset-level="1"
  >
    <q-list separator>
      <NavbarSecondOrderItem v-for="item in secondOrderTitle" v-bind="item" :key="item.canteenID"/>
    </q-list>
  </q-expansion-item>

  <div v-else>
    <q-item clickable v-ripple>
      <q-item-section>
          {{title}}
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import { api } from "boot/axios";
import NavbarSecondOrderItem from "components/Layout/NavbarSecondOrderItem";


export default defineComponent({
  name: "NavbarFirstOrderItem",
  props: {
    title: {
      type: String,
      required: true
    },
    canteenType: {
      type: Number,
      required: true
    },
    secondOrderStatus: {
      type: Boolean,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  components: {NavbarSecondOrderItem},

  setup(props) {

    const secondOrderTitle = ref([])
    const getSecondOrderTitle=async ()=>{
      const API_LINK = 'navigations'
      const response = await api.get(API_LINK)
      let responseData = []
      for (let key in response.data.data) {
        if (response.data.data[key].canteenType === props.canteenType) {
          responseData.push(response.data.data[key])
        }
      }

      secondOrderTitle.value = responseData;

    }
    if(props.secondOrderStatus)
      getSecondOrderTitle()

    return {
      secondOrderTitle,
    }
  }
})
</script>

<style scoped>

</style>
