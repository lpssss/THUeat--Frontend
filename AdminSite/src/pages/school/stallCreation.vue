<template>

  <!-- Show stalls data -->
  <div>
    <div
      class="q-pa-md"
      v-if="creatable === false"
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
              @click="updateStallStatus(props.row.stallID ,props.row.stallStatus)"
            />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Create new stall -->
    <div
      class="q-pa-md"
      style="margin-left:10%; margin-right:10%;"
      v-if="creatable === true"
    >
      <h4 style="border-bottom: 0.1px solid;">档口创建</h4>

      <div
        class="q-gutter-md"
        style="max-width: 100%"
      >

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
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { useQuasar } from "quasar";
import { api } from 'boot/axios'

// Table columns title
const columns = [
  { name: 'stallName', label: '档口名字', align: 'left', field: 'stallName', sortable: true },
  { name: 'stallID', align: 'left', label: '档口编号', field: 'stallID', sortable: true },
  { name: 'canteenName', align: 'left', label: '食堂名字', field: 'canteenName', sortable: true },
  { name: 'stallFloor', align: 'left', label: '楼层', field: 'stallFloor', sortable: true },
  { name: 'status', align: 'left', label: '激活状态', field: 'stallStatus', sortable: true }
]

export default defineComponent({
  setup () {
    const $q = useQuasar();

    const creatable = ref(false);

    const orgStall = {
      stallName: '',
      canteenName: '',
      stallFloor: '',
      canteenID: ''
    };

    const newStall = reactive({ ...orgStall });

    const selectedCanteen = ref(null);
    const selectedFloor = ref(null);
    const canteens = ref([]);

    watch(selectedCanteen, (currentValue, oldValue) => {
      if (currentValue != null) {
        if (oldValue != currentValue) {
          newStall.canteenID = currentValue.canteenID
          selectedFloor.value = null
        }
      }
    });


    watch(selectedFloor, (currentValue, oldValue) => {
      if (currentValue != null) {
        if (oldValue != currentValue) {
          newStall.stallFloor = currentValue.stallFloor
        }
      }
    });

    //判断资料输入不为空
    let readySubmit = false;
    const checkInput = () => {
      if (newStall.canteenID !== '') {
        readySubmit = true
      } else {

        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "食堂名字不能为空",
          timeout: 1000,
        });
      }
      if (readySubmit === true) {
        if (newStall.stallFloor !== '') {
          readySubmit = true
        } else {
          readySubmit = false;
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "楼层不能为空",
            timeout: 1000,
          });
        }
      }
      if (readySubmit === true) {
        if (newStall.stallName.length > 0) {
          readySubmit = true
        } else {
          readySubmit = false;
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "档口名字不能为空",
            timeout: 1000,
          });
        }
      }
    }

    const add = () => {
      creatable.value = true;
      selectedCanteen.value = null;
      selectedFloor.value = null;
      Object.assign(newStall, orgStall)
    };

    const cancel = () => {
      creatable.value = false
    };

    //更改管理员的状态
    const updateStallStatus = (id, status) => {
      api.post('/private/stalls/' + id, {
        stallStatus: status
      }).then((res) => {
        if (res.data.code === 200 && res.data !== undefined) {
          getstallsData();
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "修改状态成功",
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

    //上传功能
    const save = () => {
      checkInput();
      if (readySubmit === true) {
        postNewStall();
        getstallsData();
        creatable.value = false
      }
    };

    //获取已创建并整理好的档口基本信息
    const stalls = ref([]);
    const getstallsData = async () => {
      try {
        const response = await api.get("/private/stalls");
        stalls.value.splice(0, stalls.value.length, ...response.data.data);
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

    //获取全校食堂、楼层、档口信息
    const getCanteenData = async () => {
      try {
        const response = await api.get("/private/canteens");
        canteens.value = response.data.data;
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

    //Post 功能
    const postNewStall = () => {

      api.post('/private/stalls', {
        stallName: newStall.stallName,
        stallFloor: newStall.stallFloor,
        canteenID: newStall.canteenID
      }).then((res) => {
        if (res.data.code === 200 && res.data !== undefined) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "创建档口成功",
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
      getstallsData();
      getCanteenData();
    })

    return {
      columns,
      canteens,
      stalls,
      newStall,
      selectedCanteen,
      selectedFloor,
      creatable,
      add,
      cancel,
      save,
      updateStallStatus
    }

  }
})
</script>
