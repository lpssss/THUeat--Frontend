<template>
  <div class="q-pa-md" v-if="creatable == false">
    <q-table
      title="档口创建系统"
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
    <h4 style="border-bottom: 0.1px solid;">档口创建</h4>

    <div class="q-gutter-md" style="max-width: 100%">
      <q-select filled v-model="model" :options="options" label="食堂" />
      <q-select filled v-model="model" :options="options" label="楼层" />
      <q-select filled v-model="model" :options="options" label="档口" />
      <q-input filled v-model="text" label="档口名字" stack-label />
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
    name: 'stallName',
    required: true,
    label: '档口名字',
    align: 'left',
    field: row => row.stallName,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'canteenName', align: 'left', label: '食堂名字', field: 'canteenName', sortable: true },
  { name: 'canteenLevel', align: 'left', label: '楼层', field: 'canteenLevel', sortable: true },
  { name: 'status', align: 'left', label: '激活状态', field: 'status', sortable: true },
]

const data = [
 {
    stallName: '麻辣香锅',
    canteenName: '紫荆园',
    canteenLevel: '第一层',
    status: false
  },
  {
    stallName: '麻辣香锅',
    canteenName: '桃李园',
    canteenLevel: '第二层',
    status: true
  },
  {
    stallName: '鸡饭档',
    canteenName: '桃李园',
    canteenLevel: '第三层',
    status: true
  }
]

export default defineComponent({
  setup () {
    const creatable = ref(false);
    const addAdv = () => {
        console.log("test");
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
      options: [
        '桃李园', '紫荆园', '桃李园', '万人食堂'
      ],
      creatable,
      addAdv,
      saveAdv,
    }
  }
})
</script>
