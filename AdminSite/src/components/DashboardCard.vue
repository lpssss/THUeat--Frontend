<!--种类：Component -->
<!--功能：统计数据卡片，显示统计数据-->
<!--所需Props：标题title，小标题subhead（显示所属食堂数据用到）,卡片图案iconName,数据displayedData-->
<template>
  <div class="col-12 col-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6" style="border-bottom: 1px solid; font-weight: bold;">
          {{title}}
          <q-item-label caption v-if="subhead">
            {{ subhead }}
          </q-item-label>
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
    title:{
      type:String,
    },
    subhead:{
      type:String,
    },
    iconName:{
      type:String,
    },
    displayedData:{
      type:[String,Number],
    }
  }
}
</script>

<style scoped>

</style>
