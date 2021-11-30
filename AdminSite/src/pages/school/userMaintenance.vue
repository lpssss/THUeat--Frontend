<template>
  <div class="q-pa-md">
     <q-table
      title="用户管理系统"
      :rows="usersApi"
      :columns="columns"
      row-key="userName"
      binary-state-sort
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-toggle v-model="props.row.userStatus" 
                    checked-icon="check" 
                    color="green" 
                    unchecked-icon="clear"
                    @update:model-value="
                      (...args) => {
                    doSomething(props.row, ...args);}
              "></q-toggle>
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
</template>

<script>
import { api } from 'boot/axios'
import { defineComponent, ref, onMounted } from 'vue'

const columns = [
  { name: 'userName',  align: 'left', label: '用户姓名', field: 'userName',  sortable: true  },
  { name: 'userID', align: 'left', label: '用户编号', field: 'userID', sortable: true },
  { name: 'userEmail', align: 'left', label: '邮件', field: 'userEmail' },
  { name: 'status', align: 'left', label: '激活', field: 'userStatus', sortable: true },
]

const users = [
  {
    userName: '李先生',
    userID: 'U0001',
    userEmail: 'test1@mail.com',
    userStatus: false
  },
  {
    userName: '黄女士',
    userID: 'U0002',
    userEmail: 'test2@mail.com',
    userStatus: true
  },
  {
    userName: '李先生',
    userID: 'U0003',
    userEmail: 'test3@mail.com',
    userStatus: true
  }
]

export default defineComponent({
  setup () {
    const confirmChangeStatus = ref(false);
    const postStatusChange = () => {
      console.log("confirm");
    };
    function doSomething(a, value, evt) {
      a.dishStatus = value;
      confirmChangeStatus.value = true;
    }

    const usersApi = ref([]);
    const getUsersData = async () => {
      try {
        const response = await api.get("/usertest");
        usersApi.value.splice(0, usersApi.value.length, ...response.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    onMounted(() => {
      getUsersData()
    })

    return {
      columns,
      users: ref(users),
      usersApi,
      confirmChangeStatus,
      postStatusChange,
      doSomething
    }
  }
})
</script>