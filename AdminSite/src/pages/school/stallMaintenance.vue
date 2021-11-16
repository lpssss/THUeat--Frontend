<template>
  <div class="q-pa-md" v-if="editable == false">
    <q-table
      title="档主管理系统"
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
    <h4 style="border-bottom: 0.1px solid;">档主创建</h4>

    <div class="q-gutter-md" style="max-width: 100%">
      <q-input filled v-model="text" label="档主姓名" stack-label />
      <q-input filled v-model="text" label="档主联络号码" stack-label />
      <q-select filled v-model="model" :options="options" label="食堂" />
      <q-select filled v-model="model" :options="options" label="楼层" />
      <q-select filled v-model="model" :options="options" label="档口" />
      <q-input filled v-model="text" label="创建者 - XXX"  disable />
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
    label: '档主姓名',
    align: 'left',
    field: row => row.Username,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Staff_ID', align: 'left', label: '职员编号', field: 'Staff_ID', sortable: true },
  { name: 'stallName', align: 'left', label: '档口名字', field: 'stallName', sortable: true },
  { name: 'canteenName', align: 'left', label: '食堂名字', field: 'canteenName', sortable: true },
  { name: 'stallEmail', align: 'left', label: '联络号码', field: 'stallEmail' },
  { name: 'creator', align: 'left', label: '创建者', field: 'creator', sortable: true },
  { name: 'status', align: 'left', label: '激活状态', field: 'status', sortable: true },
]

const data = [
  {
    Username: '李先生',
    Staff_ID: 'W0001',
    stallName: '麻辣香锅档',
    canteenName: '紫荆园',
    stallEmail: 'test1@mail.com',
    creator: "管理员一",
    status: false
  },
  {
    Username: '黄女士',
    Staff_ID: 'W0002',
    canteenName: '桃李园',
    stallName: '麻辣香锅档',
    stallEmail: 'test2@mail.com',
    creator: "管理员二",
    status: true
  },
  {
    Username: '李先生',
    Staff_ID: 'W0003',
    stallName: '鸡饭档',
    canteenName: '桃李园',
    stallEmail: 'test3@mail.com',
    creator: "管理员三",
    status: true
  }
]

export default defineComponent({
  setup () {
    const editable = ref(false);
    const addAdv = () => {
        console.log("test");
        editable.value = true
    };
    const saveAdv = () => {
        editable.value = false
    };
    return {
      columns,
      data: ref(data),
      text: ref(''),
      model: ref(null),
      options: [
        '桃李园', '紫荆园', '桃李园', '万人食堂'
      ],
      editable,
      addAdv,
      saveAdv,
    }
  }
})
</script>
