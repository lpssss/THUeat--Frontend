<template>
  <div class="q-pa-md">
    <q-table
      title="档口管理员管理系统"
      :rows="data"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
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
</template>

<script>
import { defineComponent, ref } from 'vue'

const columns = [
  {
    name: 'Username',
    required: true,
    label: '档口管理员姓名',
    align: 'left',
    field: row => row.Username,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Staff_ID', align: 'left', label: '职员编号', field: 'Staff_ID', sortable: true },
  { name: 'stallName', align: 'left', label: '档口名字', field: 'stallName', sortable: true },
  { name: 'canteenName', align: 'left', label: '食堂名字', field: 'canteenName', sortable: true },
  { name: 'stallEmail', align: 'left', label: '邮件', field: 'stallEmail' },
  { name: 'report', align: 'left', label: '投诉', field: 'report', sortable: true },
  { name: 'status', align: 'left', label: '激活', field: 'status', sortable: true },
  { name: 'btnDelete', align: 'left', field: 'delete' }
]

const data = [
  {
    Username: '李先生',
    Staff_ID: 'W0001',
    stallName: '麻辣香锅档',
    canteenName: '紫荆园',
    stallEmail: 'test1@mail.com',
    report: 5,
    status: false
  },
  {
    Username: '黄女士',
    Staff_ID: 'W0002',
    canteenName: '桃李园',
    stallName: '麻辣香锅档',
    stallEmail: 'test2@mail.com',
    report: 2,
    status: true
  },
  {
    Username: '李先生',
    Staff_ID: 'W0003',
    stallName: '鸡饭档',
    canteenName: '桃李园',
    stallEmail: 'test3@mail.com',
    report: 0,
    status: true
  }
]

export default defineComponent({
  setup () {
    return {
      columns,
      data: ref(data)
    }
  }
})
</script>
