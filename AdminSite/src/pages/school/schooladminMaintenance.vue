<template>
  <div class="q-pa-md" v-if="creatable == false">
    <q-table
      title="普通管理员管理系统"
      :rows="admins"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
    <template v-slot:top-right>
      <q-btn color="primary" @click="add">创建</q-btn>
    </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-toggle v-model="props.row.adminStatus" 
                    checked-icon="check" 
                    color="green" 
                    unchecked-icon="clear"
                    @update:model-value="
                      (...args) => {
                    doSomething(props.row, ...args);}
              "  />
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="confirmChangeStatus" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">您是否确定更改状态？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" @click="postStatusChange" v-close-popup />
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
    

  <div class="q-pa-md" style="margin-left:10%; margin-right:10%;" v-if="creatable == true">
    <h4 style="border-bottom: 0.1px solid;">管理员创建</h4>

    <div class="q-gutter-md" style="max-width: 100%">
      <q-input filled v-model="newAdmin.adminVaildName" label="管理员姓名" stack-label 
                lazy-rules :rules="[(val) => (val && val.length > 0) || '管理员不能为空']" />

      <q-input filled v-model="newAdmin.adminPhone" label="管理员联络号码" stack-label 
                lazy-rules :rules="[(val) => (val && val.length > 0) || '联络号码不能为空']"/>

      <div style="margin-left:45%;">
        <q-btn style="margin-right:10px;" color="red" @click="cancel()">取消</q-btn>
        <q-btn color="green" @click="saveNewAdmin()">创建</q-btn>   
      </div>   
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { api } from 'boot/axios'

const columns = [
  { name: 'adminVaildName', align: 'left', label: '管理员姓名', field: 'adminVaildName', sortable: true },
  { name: 'adminID', align: 'left', label: '管理员编号', field: 'adminID', sortable: true },
  { name: 'adminPhone', align: 'left', label: '联络号码', field: 'adminPhone' },
  { name: 'status', align: 'left', label: '激活状态', field: 'adminStatus', sortable: true },
]

export default defineComponent({
  setup () {
    const creatable = ref(false);

    const orgAdmin = {
        adminVaildName: null,
        adminPhone: null
      };

    const newAdmin = reactive({...orgAdmin});

    const add = () => {
      creatable.value = true;
      Object.assign(newAdmin, orgAdmin)
    };
    const cancel = () => {
      creatable.value = false
    };    

    // const save = () => {
    //   creatable.value = false
    // };
    
    const confirmChangeStatus = ref(false);
    const postStatusChange = () => {
      console.log("confirm");
    };

    function doSomething(a, value, evt) {
      a.dishStatus = value;
      confirmChangeStatus.value = true;
    };

    const admins = ref([]);
    const getAdminsData = async () => {
      try {
        const response = await api.get("/admins");
        admins.value.splice(0, admins.value.length, ...response.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    const saveNewAdmin = () => {
      creatable.value = false
      api.post('Api_Link', {
        adminVaildName: newAdmin.adminVaildName.value,
        adminPhone: newAdmin.adminPhone.value,
      }).then ((res) => {
        if (res.status === 200 && res.data !== undefined) {
            updateToken(res.data.token);
        }
        if (res.status === 404){
          console.log('error')
        }
      })
    }

    // const updateAdminStatus = () => {
    // api.post('Api_Link', {
    //   adminStatus: admins.adminStatus.value,
    // }).then ((res) => {
      // if (res.status === 200 && res.data !== undefined) {
      //     updateToken(res.data.token);
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
      saveNewAdmin,
      confirmChangeStatus,
      postStatusChange,
      doSomething
    }
  }
})
</script>
