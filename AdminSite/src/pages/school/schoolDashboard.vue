<template>

  <!--  Show Statistics Data -->
  <div
    class="q-pa-md"
    v-if="creatable == false"
  >
    <div class="row q-mb-lg">
      <div class="col-12">
        <div class="row q-gutter-md justify-center">
          <div class="col-12 col-md">
            <q-card class="my-card">
              <q-card-section>
                <div
                  class="text-h6"
                  style="border-bottom: 1px solid; font-weight: bold;"
                >
                  用户人数
                </div>
              </q-card-section>
              <q-card-section
                class="q-pt-none text-h4"
                style="text-align: center;"
              >
                <q-icon name="people" />
                {{ adminStatistics.userNumber }}
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md">
            <q-card class="my-card">
              <q-card-section>
                <div
                  class="text-h6"
                  style="border-bottom: 1px solid; font-weight: bold;"
                >档主数量</div>
              </q-card-section>
              <q-card-section
                class="q-pt-none text-h4"
                style="text-align: center;"
              >
                <q-icon name="badge" />
                {{ adminStatistics.staffNumber }}
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md">
            <q-card class="my-card">
              <q-card-section>
                <div
                  class="text-h6"
                  style="border-bottom: 2px solid; font-weight: bold;"
                >档口数量</div>
              </q-card-section>
              <q-card-section
                class="q-pt-none text-h4"
                style="text-align: center;"
              >
                <q-icon name="restaurant" />
                {{ adminStatistics.stallNumber }}
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md">
            <q-card class="my-card">
              <q-card-section>
                <div
                  class="text-h6"
                  style="border-bottom: 2px solid; font-weight: bold;"
                >用户使用率</div>
              </q-card-section>
              <q-card-section
                class="q-pt-none text-h4"
                style="text-align: center;"
              >
                <q-icon name="trending_up" />
                {{ adminStatistics.userLoginRate }} %
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <q-table
      title="广告或通告管理"
      :rows="notices"
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
            v-model="props.row.status"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-btnDelete="props">
        <q-td :props="props">
          <q-btn
            size="10px"
            outline
            round
            color="red"
            icon="close"
            @click="deleteRecord(props.row.noticeID)"
          />
        </q-td>
      </template>

    </q-table>
  </div>

  <!-- Create new notice -->
  <!-- 在这里加入html的设计 -->
  <div
    class="q-pa-md"
    style="margin-left:10%; margin-right:10%;"
    v-if="creatable == true"
  >
    <h4 style="border-bottom: 0.1px solid;">创建新广告或通告</h4>
    <div
      class="q-gutter-md"
      style="max-width: 100%"
    >

      <q-input
        filled
        v-model="newNotice.noticeTitle"
        label="图片名称"
        stack-label
      />
      <q-input
        filled
        v-model="newNotice.noticeWords"
        label="内容"
        stack-label
      />
      <q-file
        filled
        bottom-slots
        v-model="newNotice.noticeImage"
        label="图片"
        counter
      >
        <template v-slot:prepend>
          <q-icon
            name="cloud_upload"
            @click.stop
            class=""
          />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop="model = null"
            class="cursor-pointer"
          />
        </template>
      </q-file>

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
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useQuasar } from "quasar";
import { api } from 'boot/axios';

// Table columns title
const columns = [
  { name: 'noticeTitle', align: 'left', label: '广告或通告名称', field: 'noticeTitle', sortable: true },
  { name: 'noticeWords', align: 'left', label: '内容', field: 'noticeWords', sortable: true },
  { name: 'noticeImage', align: 'left', label: '图片', field: 'noticeImage', sortable: true },
  { name: 'btnDelete', align: 'left', field: 'delete' }
]

export default defineComponent({
  setup () {
    const creatable = ref(false);
    const orgNotice = {
      noticeTitle: null,
      noticeWords: null,
      noticeImage: null
    };
    const newNotice = reactive({ ...orgNotice });
    const $q = useQuasar();

    const add = () => {
      creatable.value = true;
      Object.assign(newNotice, orgNotice)
    };
    const cancel = () => {
      creatable.value = false
    };
    const save = () => {
      //在这里加post功能
      creatable.value = false;
    };

    //更改档主状态
    const deleteRecord = (id) => {
      api.delete('private/notices/' + id, {
      }).then((res) => {
        if (res.data.code === 200 && res.data !== undefined) {
          getNoticesData()
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "删除成功",
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

    // Get Notices Data
    const notices = ref([]);
    const getNoticesData = async () => {
      try {
        const response = await api.get("/private/notices");
        notices.value.splice(0, notices.value.length, ...response.data.data);
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

    // Get admin Statistics Data
    const adminStatistics = reactive({
      userNumber: null,
      adminNumber: null,
      stallNumber: null,
      userLoginRate: null
    }

    );
    const getAdminStatisticsData = async () => {
      try {
        const response = await api.get("/private/adminStatistics");
        adminStatistics.userNumber = response.data.data.userNumber;
        adminStatistics.staffNumber = response.data.data.staffNumber;
        adminStatistics.stallNumber = response.data.data.stallNumber;
        adminStatistics.userLoginRate = response.data.data.userLoginRate;

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

    onMounted(() => {
      getAdminStatisticsData();
      getNoticesData();
    })

    return {
      columns,
      adminStatistics,
      notices,
      creatable,
      orgNotice,
      newNotice,
      deleteRecord,
      add,
      cancel,
      save
    }
  }
})
</script>
