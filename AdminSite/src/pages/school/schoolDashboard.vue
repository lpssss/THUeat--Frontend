<template>
  <div class="q-pa-md" v-if="creatable == false">
    <div class="row q-mb-lg">
      <div class="col-12">
        <div class="row q-gutter-md justify-center">
          <div class="col-12 col-md">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6" style="border-bottom: 1px solid; font-weight: bold;">
                  用户人数 Users
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none text-h4" style="text-align: center;">
                <q-icon name="people"/>
                {{ data.userNumber }}
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6" style="border-bottom: 1px solid; font-weight: bold;">档主数量 Staff Admin</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-h4"  style="text-align: center;">
                <q-icon name="badge"/>
                {{ data.adminNumber }}
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6" style="border-bottom: 2px solid; font-weight: bold;">档口数量</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-h4"  style="text-align: center;">
                <q-icon name="restaurant"/>
                {{ data.stallNumber }}
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md">
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6" style="border-bottom: 2px solid; font-weight: bold;">用户使用率 Usage Rate</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-h4"  style="text-align: center;">
                <q-icon name="trending_up"/>
                {{ data.userLoginRate }}
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
            <q-btn color="primary" @click="add">创建</q-btn>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-toggle v-model="props.row.status" checked-icon="check" color="green" unchecked-icon="clear" />
            </q-td>
          </template>

          <template v-slot:body-cell-btnDelete="props">
            <q-td :props="props">
                <q-btn size="10px" outline round color="red" icon="close" @click="deleteRecord(props.row.noticeId)" />
            </q-td>
          </template>

      </q-table>
    </div>

  <div class="q-pa-md" style="margin-left:10%; margin-right:10%;" v-if="creatable == true">
    <h4 style="border-bottom: 0.1px solid;">创建新广告或通告</h4>

    <div class="q-gutter-md" style="max-width: 100%">
      <q-input filled v-model="newNotice.noticeTitle" label="图片名称" stack-label />
      <q-input filled v-model="newNotice.noticeWords" label="内容" stack-label />
      <q-file filled bottom-slots v-model="newNotice.noticeImage" label="图片" counter>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop="model = null" class="cursor-pointer" />
        </template>
      </q-file>
      <div style="margin-left:45%;">
        <q-btn style="margin-right:10px;" color="red" @click="cancel()">取消</q-btn>
        <q-btn color="green" @click="save()">创建</q-btn>   
      </div>   
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
// import { api } from 'boot/axios'

const columns = [
  { name: 'noticeTitle', align: 'left', label: '广告或通告名称', field: 'noticeTitle', sortable: true},
  { name: 'noticeWords', align: 'left', label: '内容', field: 'noticeWords', sortable: true },
  { name: 'noticeImage', align: 'left', label: '图片', field: 'noticeImage', sortable: true },
  { name: 'btnDelete', align: 'left', field: 'delete' }
]

const data ={
  userNumber: 123,
  adminNumber: 1234,
  stallNumber: 12345,
  userLoginRate: 0.8*100 + '%'
}

const notices = [
  {
    noticeTitle: '图片一',
    noticeId: '123',
    noticeWords: '内容一',
    noticeImage: 'test'
  },
  {
    noticeTitle: '图片二',
    noticeId: '1234',
    noticeWords: '内容二',
    noticeImage: 'test'
  },
  {
    noticeTitle: '图片三',
    noticeId: '12345',
    noticeWords: '内容三',
    noticeImage: 'test'
  }
]
export default defineComponent({
    setup () {
      const creatable = ref(false);

      const orgNotice = {
        noticeTitle: null,
        noticeWords: null,
        noticeImage: null
      };

      const newNotice = reactive({...orgNotice});

      const add = () => {
          creatable.value = true;
          Object.assign(newNotice, orgNotice)
      }; 
      const cancel = () => {
          creatable.value = false
      };
      const save = () => {
          creatable.value = false;
      };

      const deleteRecord = (item) => {
        console.log(item)

         try {
         api.delete("link", {params: {noticeID : item }});


       } catch (err) {
         console.log(err.message);
       }

      }

    // const notices = ref([]);
    // const getNoticesData = async () => {
    //   try {
    //     const response = await api.get("link");
    //     notices.value.splice(0, notices.value.length, ...response.data);
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // }

    // const adminStatistics = ref([]);
    // const getAdminStatisticsData = async () => {
    //   try {
    //     const response = await api.get("link");
    //     adminStatistics.value.splice(0, adminStatistics.value.length, ...response.data);
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // }

    // const postNewNotice = () => {
    // api.post('Api_Link', {
    //   noticeTitle: newNotice.noticeTitle.value,
    //   noticeWords: newNotice.noticeWords.value,
    //   noticeImage: newNotice.noticeImage.value,
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
    //   getNoticesData()
    // })

    return {
      columns,
       // usersApi,
       data,
      notices: ref(notices),
      creatable,
      orgNotice,
      newNotice,
      deleteRecord,
      add,
      cancel,
      save,
      model: ref(null)
    }
  }
})
</script>
