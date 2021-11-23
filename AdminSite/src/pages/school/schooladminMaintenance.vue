<template>
  <div class="q-pa-md" v-if="creatable == false">
    <q-table
      title="普通管理员管理系统"
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

  <div class="q-pa-md" style="margin-left:10%; margin-right:10%;" v-if="creatable == true">
    <h4 style="border-bottom: 0.1px solid;">管理员创建</h4>

    <div class="q-gutter-md" style="max-width: 100%">
      <q-input filled v-model="text" label="管理员姓名" stack-label />
      <q-input filled v-model="text" label="管理员联络号码" stack-label />

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
    label: '管理员姓名',
    align: 'left',
    field: row => row.Username,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Staff_ID', align: 'left', label: '管理员编号', field: 'Staff_ID', sortable: true },
  { name: 'phoneNumber', align: 'left', label: '联络号码', field: 'phoneNumber' },
  { name: 'status', align: 'left', label: '激活状态', field: 'status', sortable: true },
]

const data = [
  {
    Username: '李先生',
    Staff_ID: 'W0001',
    phoneNumber: 'test1@mail.com',
    status: false
  },
  {
    Username: '黄女士',
    Staff_ID: 'W0002',
    phoneNumber: 'test2@mail.com',
    status: true
  },
  {
    Username: '李先生',
    Staff_ID: 'W0003',
    phoneNumber: 'test3@mail.com',
    status: true
  }
]

export default defineComponent({
  setup () {
    const creatable = ref(false);
    const addAdv = () => {
      creatable.value = true
    };
    const saveAdv = () => {
      creatable.value = false
    };
    return {
      columns,
      data: ref(data),
      text: ref(''),
      model: ref(null),
      creatable,
      addAdv,
      saveAdv,
    }
  }
})
</script>
