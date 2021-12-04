<template>

  <!-- Show admins data -->
  <div
    class="q-pa-md"
    v-if="creatable == false"
  >
    <q-table
      title="普通管理员管理系统"
      :rows="admins"
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
            v-model="props.row.adminStatus"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            @click="confirmChangeStatus(props.row.adminStatus)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <!--   Confirm change status -->
  <q-dialog
    v-model="confirmChangeStatus"
    persistent
  >
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">您是否确定更改状态？</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="取消"
          color="primary"
          @click="postStatusChange"
          v-close-popup
        />
        <q-btn
          flat
          label="确定"
          color="primary"
          @click="postStatusChange"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Create new admin -->
  <div
    class="q-pa-md"
    style="margin-left:10%; margin-right:10%;"
    v-if="creatable == true"
  >
    <h4 style="border-bottom: 0.1px solid;">管理员创建</h4>

    <div
      class="q-gutter-md"
      style="max-width: 100%"
    >
      <q-input
        filled
        v-model="newAdmin.adminVaildName"
        label="管理员姓名"
        stack-label
      />
      <q-input
        filled
        v-model="newAdmin.adminPhone"
        label="管理员联络号码"
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
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useQuasar } from "quasar";
import { api } from 'boot/axios'

// Table columns title
const columns = [
  { name: 'adminVaildName', align: 'left', label: '管理员姓名', field: 'adminVaildName', sortable: true },
  { name: 'adminID', align: 'left', label: '管理员编号', field: 'adminID', sortable: true },
  { name: 'adminPhone', align: 'left', label: '联络号码', field: 'adminPhone' },
  { name: 'status', align: 'left', label: '激活状态', field: 'adminStatus', sortable: true },
]

export default defineComponent({
  setup () {
    const $q = useQuasar();
    const creatable = ref(false);
    const orgAdmin = {
      adminVaildName: null,
      adminPhone: null
    };
    const newAdmin = reactive({ ...orgAdmin });
    const add = () => {
      creatable.value = true;
      Object.assign(newAdmin, orgAdmin)
    };
    const cancel = () => {
      creatable.value = false
    };

    const save = () => {
      creatable.value = false
    };

    const confirmChangeStatus = (status) => {
      // const postStallStatus = () => {
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

    // Get admins data
    const admins = ref([]);
    const getAdminsData = async () => {
      try {
        const response = await api.get("/private/admins");
        admins.value.splice(0, admins.value.length, ...response.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    // Create new admin
    // const saveNewAdmin = () => {
    //   api.post('/private/admins', {
    //     adminVaildName: newAdmin.adminVaildName.value,
    //     adminPhone: newAdmin.adminPhone.value,
    //   }).then((res) => {
    //     if (res.status === 200 && res.data !== undefined) {
    //       getAdminsData();
    //       creatable.value = false;
    //       $q.notify({
    //         color: "green-4",
    //         textColor: "white",
    //         icon: "cloud_done",
    //         message: "创建成功",
    //         timeout: 1000,
    //       });
    //     }
    //     if (res.status === 404) {
    //       $q.notify({
    //         color: "red-5",
    //         textColor: "white",
    //         icon: "warning",
    //         message: "创建失败",
    //         timeout: 1000,
    //       });
    //     }
    //   })
    // }

    // const updateAdminStatus = (item) => {
    // api.post('/private/admins/', , { params: { adminID: item } }).then ((res) => {
    // if (res.status === 200 && res.data !== undefined) {
    //     getAdminsData();
    // }
    // if (res.status === 404){
    //   console.log('error')
    // }
    //  
    // })

    onMounted(() => {
      getAdminsData()
    })

    return {
      columns,
      admins: ref(admins),
      orgAdmin,
      newAdmin,
      creatable,
      add,
      cancel,
      save,
      // saveNewAdmin,
      confirmChangeStatus
    }
  }
})
</script>
