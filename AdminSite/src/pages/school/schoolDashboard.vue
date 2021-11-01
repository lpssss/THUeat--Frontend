<template>
<div class="q-pa-md">
  <h4 style="border-bottom: 0.1px solid;">Dashboard</h4>
  <div class="row q-mb-lg">
    <div class="col-12">
      <div class="row q-gutter-md justify-center">
        <div class="col-12 col-md">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6" style="border-bottom: 1px solid; font-weight: bold;">
                用户人数 User
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none text-h4" style="text-align: center;">
              <q-icon name="people"/>
              1234567
            </q-card-section>
          </q-card>
        </div>

         <div class="col-12 col-md">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6" style="border-bottom: 1px solid; font-weight: bold;">档口管理员 Stall Admin</div>
            </q-card-section>
            <q-card-section class="q-pt-none text-h4"  style="text-align: center;">
              <q-icon name="build"/>
              1234456
            </q-card-section>
          </q-card>
        </div>

         <div class="col-12 col-md">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6" style="border-bottom: 2px solid; font-weight: bold;">今日热菜 Top Sale</div>
            </q-card-section>
            <q-card-section class="q-pt-none text-h4"  style="text-align: center;">
              <q-icon name="favorite"/>
              麻辣香锅
            </q-card-section>
          </q-card>
        </div>

         <div class="col-12 col-md">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6" style="border-bottom: 2px solid; font-weight: bold;">用户使用率 Usage Rate</div>
            </q-card-section>
            <q-card-section class="q-pt-none text-h4"  style="text-align: center;">
              <q-icon name="trending_up"/>
              50%
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard'
})
</script>
