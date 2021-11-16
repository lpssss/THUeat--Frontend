<template>
  <div class="q-pa-md" v-if="editable == false">
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

      <q-table
          title="广告或通告管理"
          :rows="data"
          :columns="columns"
          row-key="name"
          binary-state-sort
        >
          <template v-slot:top-right>
            <q-btn color="primary" @click="addAdv">创建</q-btn>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-toggle v-model="props.row.status" checked-icon="check" color="green" unchecked-icon="clear" />
            </q-td>
          </template>

          <template v-slot:body-cell-btnDelete="props">
            <q-td :props="props">
                <q-btn size="10px" outline round color="red" icon="close" />
            </q-td>
          </template>

      </q-table>
    </div>

  <div class="q-pa-md" v-if="editable == true">
    <h4 style="border-bottom: 0.1px solid;">创建新广告或通告</h4>

    <div class="q-gutter-md" style="max-width: 100%">
      <q-input filled v-model="text" label="图片名称" stack-label />
      <q-input filled v-model="text" label="创建者 - XXX"  disable />
      <q-file filled bottom-slots v-model="model" label="图片" counter>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop="model = null" class="cursor-pointer" />
        </template>
      </q-file>
      <div style="margin-left:45%;">
        <q-btn style="margin-right:10px;" color="red" @click="saveAdv()">取消</q-btn>
        <q-btn color="green" @click="saveAdv()">创建</q-btn>   
      </div>   
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

const columns = [
  {
    name: 'Username',
    required: true,
    label: '广告或通告名称',
    align: 'left',
    field: row => row.Username,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Staff_ID', align: 'left', label: '创建者', field: 'Staff_ID', sortable: true },
  { name: 'image', align: 'left', label: '图片', field: 'image', sortable: true },
  { name: 'btnDelete', align: 'left', field: 'delete' }
]

const data = [
  {
    Username: '图片一',
    Staff_ID: '管理员一',
    image: 'test'
  },
  {
    Username: '图片二',
    Staff_ID: '管理员二',
    image: 'test'
  },
  {
    Username: '图片三',
    Staff_ID: '管理员三',
    image: 'test'
  }
]
export default defineComponent({
    setup () {
      const editable = ref(false);
      const addAdv = () => {
          editable.value = true
      };
      const saveAdv = () => {
          editable.value = false
      };
    return {
      columns,
      data: ref(data),
      editable,
      addAdv,
      saveAdv,
      text: ref(''),
      model: ref(null)
    }
  }
})
</script>
