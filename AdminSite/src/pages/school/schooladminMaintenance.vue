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
            @click="updateAdminStatus(props.row.adminID, props.row.adminStatus)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

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
        v-model="newAdmin.adminValidName"
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
          @click="cancel"
        >取消</q-btn>
        <q-btn
          color="green"
          @click="save"
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
  { name: 'adminVaildName', align: 'left', label: '管理员姓名', field: 'adminValidName', sortable: true },
  { name: 'adminID', align: 'left', label: '管理员编号', field: 'adminID', sortable: true },
  { name: 'adminPhone', align: 'left', label: '联络号码', field: 'adminPhone' },
  { name: 'status', align: 'left', label: '激活状态', field: 'adminStatus', sortable: true },
]

export default defineComponent({
  setup () {
    const $q = useQuasar();
    const creatable = ref(false);
    const orgAdmin = {
      adminValidName: '',
      adminPhone: ''
    };
    const newAdmin = reactive({ ...orgAdmin });

    const add = () => {
      creatable.value = true;
      Object.assign(newAdmin, orgAdmin)
    };

    const cancel = () => {
      creatable.value = false
    };

    //上传功能
    const save = () => {
      checkInput();
      if (readySubmit === true) {
        createNewAdmin();
        getAdminsData();
        creatable.value = false;
      }
    };

    //获取管理员资料
    const admins = ref([]);
    const getAdminsData = async () => {
      try {
        const response = await api.get("/private/admins");
        admins.value.splice(0, admins.value.length, ...response.data.data);
      } catch (err) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: err.message,
          timeout: 1000,
        });
      }
    }

    //判断资料输入不为空
    let readySubmit = false;
    const checkInput = () => {
      if (newAdmin.adminValidName.length > 0) {
        readySubmit = true
      } else {

        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "姓名不能为空",
          timeout: 1000,
        });
      }
      if (readySubmit === true) {
        if (newAdmin.adminPhone.length > 0) {
          readySubmit = true
        } else {
          readySubmit = false;
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "联络方式不能为空",
            timeout: 1000,
          });
        }
      }
    }

    //创建新管理员
    const createNewAdmin = () => {
      api.post('/private/admins', {
        adminValidName: newAdmin.adminValidName,
        adminPhone: newAdmin.adminPhone
      }).then((res) => {
        if (res.data.code === 200 && res.data !== undefined) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "创建成功",
            timeout: 1000,
          });
        }
        if (res.status === 404) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
            timeout: 1000,
          });
        }
      })
    }

    //更改管理员的状态
    const updateAdminStatus = (id, status) => {
      api.post('/private/admins/' + id, {
        adminStatus: status
      }).then((res) => {
        if (res.data.code === 200 && res.data !== undefined) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "修改状态成功",
            timeout: 1000,
          });
        }
        if (res.data.code !== 200) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.message,
            timeout: 1000,
          });
        }
      })
    }

    onMounted(() => {
      getAdminsData()
    })

    return {
      columns,
      admins,
      orgAdmin,
      newAdmin,
      creatable,
      add,
      cancel,
      save,
      readySubmit,
      checkInput,
      updateAdminStatus
    }
  }
})
</script>
