<template>

  <!-- Show stalls data -->
  <div
    class="q-pa-md"
    v-if="creatable == false"
  >
    <q-table
      title="档口创建系统"
      :rows="stalls"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          @click="add"
        >创建</q-btn>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.stallStatus"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            @click="confirmChangeStatus(props.row.stallStatus)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <!-- Create new stall -->
  <div
    class="q-pa-md"
    style="margin-left:10%; margin-right:10%;"
    v-if="creatable == true"
  >
    <h4 style="border-bottom: 0.1px solid;">档口创建</h4>

    <div
      class="q-gutter-md"
      style="max-width: 100%"
    >
      <q-select
        filled
        v-model="newStall.canteenName"
        :options="canteen"
        label="食堂"
      />
      <q-select
        filled
        v-model="newStall.stallFloor"
        :options="floor"
        label="楼层"
      />
      <q-input
        filled
        v-model="newStall.stallName"
        label="档口名字"
        stack-label
      />
      <div style="margin-left:45%;">
        <q-btn
          style="margin-right:10px;"
          color="red"
          @click="cancel()"
        >取消</q-btn>
        <q-btn
          color="green"
          @click="save()"
        >创建</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useQuasar } from "quasar";
import { api } from 'boot/axios'

// Table columns title
const columns = [
  { name: 'stallName', label: '档口名字', align: 'left', field: 'stallName', sortable: true },
  { name: 'canteenName', align: 'left', label: '食堂名字', field: 'canteenName', sortable: true },
  { name: 'stallFloor', align: 'left', label: '楼层', field: 'stallFloor', sortable: true },
  { name: 'status', align: 'left', label: '激活状态', field: 'stallStatus', sortable: true }
]

const stalls = [
  {
    stallName: '麻辣香锅',
    canteenName: '紫荆园',
    stallFloor: 1,
    stallStatus: false
  },
  {
    stallName: '麻辣香锅',
    canteenName: '桃李园',
    stallFloor: 2,
    stallStatus: true
  },
  {
    stallName: '鸡饭档',
    canteenName: '桃李园',
    stallFloor: 3,
    stallStatus: true
  }
]

export default defineComponent({
  setup () {
    const $q = useQuasar();
    const creatable = ref(false);
    const orgStall = {
      stallName: null,
      canteenName: null,
      stallFloor: null
    };
    const newStall = reactive({ ...orgStall });
    const add = () => {
      creatable.value = true;
      Object.assign(newStall, orgStall)
    };
    const cancel = () => {
      creatable.value = false
    };
    const confirmChangeStatus = (status) => {
      // const postStallStatus = () => {
      // api.post('Api_Link', {
      //   stallStatus: status,
      // }).then ((res) => {
      // if (res.status === 200 && res.data !== undefined) {
      // getstallsData,
      //   $q.notify({
      // color: "green-4",
      // textColor: "white",
      // icon: "cloud_done",
      // message: "修改成功",
      // timeout: 1000,
      //  });
      // }
      // if (res.status === 404){
      //   console.log('error')
      // }
      //  
      // }) 
    };
    const save = () => {
      creatable.value = false
    };

    // Get stalls data
    // const stalls = ref([]);
    // const getstallsData = async () => {
    //   try {
    //     const response = await api.get("/private/stalls");
    //     stalls.value.splice(0, stalls.value.length, ...response.data);
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // }

    // Get canteens, floors, stalls data
    // const canteens = ref([]);
    // const getstallsData = async () => {
    //   try {
    //     const response = await api.get("/private/canteens");
    //     stalls.value.splice(0, stalls.value.length, ...response.data);
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // }

    // const postNewStall = () => {
    // api.post('Api_Link', {
    //   stallName: newStall.stallName.value,
    //   stallFloor: newStall.stallFloor.value, 
    //   canteenId: newStall.canteenId.value，
    // }).then ((res) => {
    // if (res.status === 200 && res.data !== undefined) {
    //     updateToken(res.data.token);
    // }
    // if (res.status === 404){
    //   console.log('error')
    // }
    //  
    // })


    // onMounted(() => {
    //   getstallsData()
    // })

    return {
      columns,
      orgStall,
      newStall,
      stalls: ref(stalls),
      confirmChangeStatus,
      // getstallsData,
      canteen: [
        '桃李园', '紫荆园', '桃李园', '万人食堂'
      ],
      floor: [
        1, 2, 3, 4
      ],
      creatable,
      add,
      cancel,
      save,
    }
  }
})
</script>
