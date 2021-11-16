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
import {defineComponent, onMounted, ref} from "vue";
import axios from 'axios'
import NavbarSecondOrderItem from "components/Layout/NavbarSecondOrderItem";


export default defineComponent({
  name: "NavbarFirstOrderItem",
  props: {
    title: {
      type: String,
      required: true
    },
    titleEng: {
      type: String,
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
    //console.log(props.title,props.titleEng,props.secondOrderStatus)
    const secondOrderTitle=ref([])
    const getSecondOrderTitle=async ()=>{
      const response=await axios.get(`http://localhost:3000/canteens?canteenType=${props.titleEng}`)
      secondOrderTitle.value=response.data
      //console.log(secondOrderTitle)
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
