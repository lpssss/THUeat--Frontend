<template>
  <div class="q-pa-md">
    <q-table
      title="用户管理系统"
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
    label: '用户姓名',
    align: 'left',
    field: row => row.Username,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'User_ID', align: 'left', label: '用户编号', field: 'User_ID', sortable: true },
  { name: 'userEmail', align: 'left', label: '邮件', field: 'stallEmail' },
  { name: 'report', align: 'left', label: '投诉', field: 'report', sortable: true },
  { name: 'status', align: 'left', label: '激活', field: 'status', sortable: true },
  { name: 'btnDelete', align: 'left', field: 'delete' }
]

const data = [
  {
    Username: '李先生',
    User_ID: 'U0001',
    stallEmail: 'test1@mail.com',
    report: 5,
    status: false
  },
  {
    Username: '黄女士',
    User_ID: 'U0002',
    stallEmail: 'test2@mail.com',
    report: 2,
    status: true
  },
  {
    Username: '李先生',
    User_ID: 'U0003',
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
