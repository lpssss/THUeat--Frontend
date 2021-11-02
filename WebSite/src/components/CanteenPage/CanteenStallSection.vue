<template>
  <div>
    档口
  </div>
  <div class="row q-col-gutter-md">
    <div class="col-3" v-for="eachStall in stall" :key="eachStall.stallID">
      <q-card>
        <img src="https://cdn.quasar.dev/img/parallax2.jpg" alt="test-image">

        <q-list>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="local_bar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{eachStall.stallName}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CanteenStallSection",
  props:{
    stall:{
      type:Array,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
