<template>
  <div>
    <!-- Show staffs data -->
    <div
      class="q-pa-md"
      v-if="creatable === false"
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
              @click="updateStaffStatus(props.row.staffID ,props.row.staffStatus)"
            />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Create new staff -->
    <div
      class="q-pa-md"
      style="margin-left:10%; margin-right:10%;"
      v-if="creatable === true"
    >
      <h4 style="border-bottom: 0.1px solid;">档主创建</h4>

      <div
        class="q-gutter-md"
        style="max-width: 100%"
      >
        <q-input
          filled
          v-model="newStaff.staffValidName"
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
          outlined
          v-model="selectedCanteen"
          :options="canteens"
          option-label="canteenName"
          label="食堂"
        >
        </q-select>

        <div v-if="selectedCanteen != null">
          <q-select
            outlined
            v-model="selectedFloor"
            :options="selectedCanteen.canteenFloors"
            option-label="stallFloor"
            label="楼层"
          >
          </q-select>
        </div>

        <div v-if="selectedFloor != null">
          <q-select
            outlined
            v-model="selectedStall"
            :options="selectedFloor.stalls"
            option-label="stallName"
            label="档口"
          >
          </q-select>
        </div>

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
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, watch } from 'vue';
import { useQuasar } from "quasar";
import { api } from 'boot/axios'
import {ADMIN_API_LINKS} from "app/api-links";

const columns = [
  { name: 'staffVaildName', align: 'left', label: '档主姓名', field: 'staffValidName', sortable: true },
  { name: 'staffID', align: 'left', label: '职员编号', field: 'staffID', sortable: true },
  { name: 'canteenName', align: 'left', label: '食堂名字', field: 'canteenName', sortable: true },
  { name: 'stallFloor', align: 'left', label: '楼层', field: 'stallFloor', sortable: true },
  { name: 'stallName', align: 'left', label: '档口名字', field: 'stallName', sortable: true },
  { name: 'staffPhone', align: 'left', label: '联络号码', field: 'staffPhone' },
  { name: 'status', align: 'left', label: '激活状态', field: 'staffStatus', sortable: true },
]

export default defineComponent({
  setup () {
    const $q = useQuasar();
    const creatable = ref(false);
    const orgStaff = {
      staffValidName: '',
      staffPhone: '',
      canteenID: '',
      stallFloor: '',
      stallID: ''
    };

    const newStaff = reactive({ ...orgStaff });
    const STAFF_LINK=ADMIN_API_LINKS.staffs
    const CANTEEN_LINK=ADMIN_API_LINKS.canteens

    const selectedCanteen = ref(null);
    const selectedFloor = ref(null);
    const selectedStall = ref(null);
    const canteens = ref([]);

    watch(selectedCanteen, (currentValue, oldValue) => {
      if (currentValue != null) {
        if (oldValue !== currentValue) {
          newStaff.canteenID = currentValue.canteenID
          selectedFloor.value = null
          selectedStall.value = null
        }
      }
    });

    watch(selectedFloor, (currentValue, oldValue) => {
      if (currentValue != null) {
        if (oldValue !== currentValue) {
          newStaff.stallFloor = currentValue.stallFloor
          selectedStall.value = null
        }
      }

    });

    watch(selectedStall, (currentValue, oldValue) => {
      if (currentValue != null) {
        if (oldValue !== currentValue) {
          newStaff.stallID = currentValue.stallID
        }
      }
    });

    //判断资料输入不为空
    let readySubmit = false;
    const checkInput = () => {
      if (newStaff.staffValidName.length > 0) {
        readySubmit = true
      } else {
        readySubmit = false;
        $q.notify({
          type:"error",
          message: "档主名字不能为空",
        });
      }
      if (readySubmit === true) {
        if (newStaff.staffPhone.length > 0) {
          readySubmit = true
        } else {
          readySubmit = false;
          $q.notify({
            type:"error",
            message: "档主联络号码不能为空",
          });
        }
      }
      if (readySubmit === true) {
        if (newStaff.canteenID !== '') {
          readySubmit = true
        } else {
          readySubmit = false;
          $q.notify({
            type:"error",
            message: "食堂名字不能为空",
          });
        }
      }
      if (readySubmit === true) {
        if (newStaff.stallFloor !== '') {
          readySubmit = true
        } else {
          readySubmit = false;
          $q.notify({
            type:"error",
            message: "楼层不能为空",
          });
        }
      }
      if (readySubmit === true) {
        if (newStaff.stallName !== '') {
          readySubmit = true
        } else {
          readySubmit = false;
          $q.notify({
            type:"error",
            message: "档口不能为空",
          });
        }
      }

    }

    const add = () => {
      creatable.value = true;
      selectedCanteen.value = null;
      selectedFloor.value = null;
      selectedStall.value = null;
      Object.assign(newStaff, orgStaff)
    };

    const cancel = () => {
      creatable.value = false
    };

    //上传功能
    const save = () => {
      checkInput();
      if (readySubmit === true) {
        postNewStaff();
        getstaffsData();
        creatable.value = false
      }
    };

    //更改档主状态
    const updateStaffStatus = (id, status) => {
      api.post(STAFF_LINK+'/' + id, {
        staffStatus: status,
      }).then((res) => {
        if (res.data !== undefined && res.data.code === 200) {
          getstaffsData()
          $q.notify({
            type:"success",
            message: "修改状态成功",
          });

        }
        if (res.data.code !== 200) {
          $q.notify({
            type:"error",
            message: res.data.data.message,
          });
        }
      })
    }

    //获取已创建并整理好的档主基本信息
    const staffs = ref([]);
    const getstaffsData = async () => {
      try {
        const response = await api.get(STAFF_LINK);
        staffs.value.splice(0, staffs.value.length, ...response.data.data);
      } catch (err) {
        $q.notify({
          type:"error",
          message: err.message,
        });
      }
    }

    //获取全校食堂、楼层、档口信息
    const getCanteenData = async () => {
      try {
        const response = await api.get(CANTEEN_LINK);
        canteens.value = response.data.data;
      } catch (err) {
        $q.notify({
          type:"error",
          message: err.message,
        });
      }
    }

    //Post 功能
    const postNewStaff = () => {
      api.post(STAFF_LINK, {
        staffValidName: newStaff.staffValidName,
        staffPhone: newStaff.staffPhone,
        staffStallID: newStaff.stallID

      }).then((res) => {
        if (res.data !== undefined && res.data.code === 200) {
          $q.notify({
            type:"success",
            message: "档主创建成功",
          });
        }
        if (res.data.code !== 200) {
          $q.notify({
            type:"error",
            message: res.data.message,
          });
        }

      })
    }


    onMounted(() => {
      getstaffsData();
      getCanteenData()
    })

    return {
      columns,
      staffs,
      orgStaff,
      newStaff,
      selectedCanteen,
      selectedFloor,
      selectedStall,
      canteens,
      creatable,
      updateStaffStatus,
      add,
      cancel,
      save,
    }
  }
})
</script>
