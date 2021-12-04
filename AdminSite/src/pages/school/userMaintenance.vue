<template>
  <div class="q-pa-md">
    <q-table
      title="用户管理系统"
      :rows="users"
      :columns="columns"
      row-key="userName"
      binary-state-sort
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.userStatus"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            @click="confirmChangeStatus(props.row.userStatus)"
          ></q-toggle>
        </q-td>
      </template>
    </q-table>
  </div>

</template>

<script>
import { api } from 'boot/axios'
import { useQuasar } from "quasar";
import { defineComponent, ref, onMounted } from 'vue'

const columns = [
  { name: 'userName', align: 'left', label: '用户姓名', field: 'userName', sortable: true },
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

    const confirmChangeStatus = (status) => {
      // const postStallStatus = () => {
      // api.post('Api_Link', {
      //   userStatus: status,
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


    // const usersApi = ref([]);
    // const getUsersData = async () => {
    //   try {
    //     const response = await api.get("/usertest");
    //     usersApi.value.splice(0, usersApi.value.length, ...response.data);
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // }

    // onMounted(() => {
    //   getUsersData()
    // })

    return {
      columns,
      users: ref(users),
      confirmChangeStatus,
    }
  }
})
</script>