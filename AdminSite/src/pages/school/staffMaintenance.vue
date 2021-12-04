<template>

  <!-- Show staffs data -->
  <div
    class="q-pa-md"
    v-if="editable == false"
  >
    <q-table
      title="档主管理系统"
      :rows="staffs"
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
            v-model="props.row.staffStatus"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            @click="confirmChangeStatus(props.row.staffStatus)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <!-- Create new staff -->
  <div
    class="q-pa-md"
    style="margin-left:10%; margin-right:10%;"
    v-if="editable == true"
  >
    <h4 style="border-bottom: 0.1px solid;">档主创建</h4>

    <div
      class="q-gutter-md"
      style="max-width: 100%"
    >
      <q-input
        filled
        v-model="newStaff.staffVaildName"
        label="档主姓名"
        stack-label
      />
      <q-input
        filled
        v-model="newStaff.staffPhone"
        label="档主联络号码"
        stack-label
      />
      <q-select
        filled
        v-model="newStaff.canteenName"
        :options="canteen"
        label="食堂"
      />
      <q-select
        filled
        v-model="newStaff.stallFloor"
        :options="floor"
        label="楼层"
      />
      <q-select
        filled
        v-model="newStaff.stallName"
        :options="stall"
        label="档口"
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
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useQuasar } from "quasar";
// import { api } from 'boot/axios'

const columns = [
  { name: 'staffVaildName', align: 'left', label: '档主姓名', field: 'staffVaildName', sortable: true },
  { name: 'staffID', align: 'left', label: '职员编号', field: 'staffID', sortable: true },
  { name: 'canteenName', align: 'left', label: '食堂名字', field: 'canteenName', sortable: true },
  { name: 'stallFloor', align: 'left', label: '楼层', field: 'stallFloor', sortable: true },
  { name: 'stallName', align: 'left', label: '档口名字', field: 'stallName', sortable: true },
  { name: 'staffPhone', align: 'left', label: '联络号码', field: 'staffPhone' },
  { name: 'status', align: 'left', label: '激活状态', field: 'staffStatus', sortable: true },
]

const staffs = [
  {
    staffVaildName: '李先生',
    staffID: 'W0001',
    stallName: '麻辣香锅档',
    canteenName: '紫荆园',
    stallFloor: 1,
    staffPhone: '12345',
    staffStatus: false
  },
  {
    staffVaildName: '黄女士',
    staffID: 'W0002',
    canteenName: '桃李园',
    stallName: '麻辣香锅档',
    stallFloor: 2,
    staffPhone: '12345',
    staffStatus: true
  },
  {
    staffVaildName: '李先生',
    staffID: 'W0003',
    stallName: '鸡饭档',
    canteenName: '桃李园',
    stallFloor: 3,
    staffPhone: '12345',
    staffStatus: true
  }
]

export default defineComponent({
  setup () {
    const editable = ref(false);
    const orgStaff = {
      staffVaildName: null,
      staffPhone: null,
      canteenName: null,
      stallFloor: null,
      stallName: null
    };

    const newStaff = reactive({ ...orgStaff });

    const add = () => {
      editable.value = true;
      Object.assign(newStaff, orgStaff)
    };
    const cancel = () => {
      editable.value = false
    };
    const save = () => {
      editable.value = false
    };

    const confirmChangeStatus = (status) => {
      // const postStaffStatus = () => {
      // api.post('Api_Link', {
      //   stallStatus: status,
      // }).then ((res) => {
      // if (res.status === 200 && res.data !== undefined) {
      // getAdminsData,
      //      $q.notify({
      //   color: "green-4",
      //   textColor: "white",
      //   icon: "cloud_done",
      //   message: "修改成功",
      //   timeout: 1000,
      // });

      // }
      // if (res.status === 404){
      //   console.log('error')
      // }
      //  
      // })
    };


    // const staffs = ref([]);
    // const getstaffsData = async () => {
    //   try {
    //     const response = await api.get("/private/staffs");
    //     staffs.value.splice(0, staffs.value.length, ...response.data);
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // }

    // const postNewStaff = () => {
    // api.post('Api_Link', {
    //   staffVaildName: newStaff.staffVaildName.value,
    //   staffPhone: newStaff.staffPhone.value, 
    //   canteenId: newStaff.canteenId.value，
    //   stallFloor: newStaff.stallFloor.value，
    //   stallId: newStaff.stallId.value，

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
    //   getstaffsData()
    // })

    return {
      columns,
      staffs: ref(staffs),
      orgStaff,
      newStaff,
      canteen: [
        '桃李园', '紫荆园', '桃李园', '万人食堂'
      ],
      floor: [
        1, 2, 3, 4
      ],
      stall: [
        '档口1', '档口2', '档口3'
      ],
      editable,
      confirmChangeStatus,
      add,
      cancel,
      save,
    }
  }
})
</script>
