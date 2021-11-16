<template>
  <div class="col-12 col-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6" style="border-bottom: 1px solid; font-weight: bold;">
          {{titleName}}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none text-h4" style="text-align: center;">
        <q-icon :name="iconName"/>
        {{displayedData}}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "DashboardCard",
  props:{
    titleName:{
      type:String,
      required:true
    },
    iconName:{
      type:String,
      required:true
    },
    displayedData:{
      type:String,
      required:true
    }
  }
}
</script>

<style scoped>

</style>
