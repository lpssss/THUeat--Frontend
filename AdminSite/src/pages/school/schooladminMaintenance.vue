<template>

  <!-- Show admins data -->
  <div
    class="q-pa-md"
    v-if="creatable === false"
  >
    <q-table
      title="普通管理员管理系统"
      :rows="admins"
      :columns="columns"
      row-key="name"
      :loading="loading"
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
    v-if="creatable === true"
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
        v-on:keypress="isPhoneNumber($event)"
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
import { defineComponent, ref, reactive, onMounted, watch } from 'vue';
import { useQuasar } from "quasar";
import { api } from 'boot/axios'
import { ADMIN_API_LINKS } from "app/api-links";

// Table columns title
const columns = [
  { name: 'adminVaildName', align: 'left', label: '管理员姓名', field: 'adminValidName', sortable: true },
  { name: 'adminID', align: 'left', label: '管理员编号', field: 'adminID', sortable: true },
  { name: 'adminPhone', align: 'left', label: '联络号码', field: 'adminPhone' },
  { name: 'status', align: 'left', label: '激活状态', field: 'adminStatus' },
]

export default defineComponent({
  setup () {
    const loading = ref(false)
    const $q = useQuasar();
    const creatable = ref(false);
    const orgAdmin = {
      adminValidName: '',
      adminPhone: ''
    };
    const newAdmin = reactive({ ...orgAdmin });
    const ADMIN_LINK = ADMIN_API_LINKS.admins

    const add = () => {
      creatable.value = true;
      Object.assign(newAdmin, orgAdmin)
    };

    const cancel = () => {
      creatable.value = false
    };

    //检查输入是否是数字
    const isPhoneNumber = (e) => {
      let char = String.fromCharCode(e.keyCode);
      if (/^[+\d](?:.*\d)?$/.test(char)) return true;
      else e.preventDefault();
    }

    watch(newAdmin, (currentValue) => {
      let output = ''
      for (var i = 0; i < currentValue.adminPhone.length; i++) {
        if (i == 0) {
          if (currentValue.adminPhone[0] == '+') {
            output = output + currentValue.adminPhone[0]
          }
        }
        if (currentValue.adminPhone[i] >= '0' && currentValue.adminPhone[i] <= '9') {
          output = output + currentValue.adminPhone[i]
        }
      }
      newAdmin.adminPhone = output
    },
      { deep: true });

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
        loading.value = true;
        const response = await api.get(ADMIN_LINK);
        admins.value.splice(0, admins.value.length, ...response.data.data);
        loading.value = false;
      } catch (err) {
        loading.value = false;
        $q.notify({
          type: "error",
          message: err.message,
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
          type: "error",
          message: "姓名不能为空",
        });
      }
      if (readySubmit === true) {
        if (newAdmin.adminPhone.length > 0) {
          readySubmit = true
        } else {
          readySubmit = false;
          $q.notify({
            type: "error",
            message: "联络方式不能为空",
          });
        }
      }
    }

    //创建新管理员
    const createNewAdmin = () => {
      api.post(ADMIN_LINK, {
        adminValidName: newAdmin.adminValidName,
        adminPhone: newAdmin.adminPhone
      }).then((res) => {
        if (res.data !== undefined && res.data.code === 200) {
          $q.notify({
            type: "success",
            message: "创建成功",
          });
        }
        if (res.status === 404) {
          $q.notify({
            type: "error",
            message: res.data.message,
          });
        }
      })
    }

    //更改管理员的状态
    const updateAdminStatus = (id, status) => {
      $q.dialog({
        title: "确认调整状态",
        message: "您是否确认要调整此状态?",
        ok: { push: true, label: "确认" },
        cancel: { push: true, label: "取消" },
        persistent: true,
      }).onOk(() => {
        api.post(ADMIN_LINK + '/' + id, {
          adminStatus: status
        }).then((res) => {
          if (res.data !== undefined && res.data.code === 200) {
            getAdminsData()
            $q.notify({
              type: "success",
              message: "修改状态成功",
            });
          }
          if (res.data.code !== 200) {
            $q.notify({
              type: "error",
              message: res.data.message,
            });
          }
        })
      }).onCancel(() => {
        getAdminsData()
      })
    }

    onMounted(() => {
      getAdminsData()
    })

    return {
      isPhoneNumber,
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
      updateAdminStatus,
      loading
    }
  }
})
</script>
