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
            @click="updateUserStatus(props.row.userID, props.row.userStatus)"
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
import {ADMIN_API_LINKS} from "app/api-links";

//Table column title
const columns = [
  { name: 'userName', align: 'left', label: '用户姓名', field: 'userName', sortable: true },
  { name: 'userID', align: 'left', label: '用户编号', field: 'userID', sortable: true },
  { name: 'userEmail', align: 'left', label: '邮件', field: 'userEmail' },
  { name: 'status', align: 'left', label: '激活', field: 'userStatus', sortable: true },
]

export default defineComponent({
  setup () {
    const $q = useQuasar();
    const USER_LINK=ADMIN_API_LINKS.users

    //更改用户状态
    const updateUserStatus = (id, status) => {
      api.post(USER_LINK + '/' + id, {
        userStatus: status,
      }).then((res) => {
        if (res.data !== undefined && res.data.code === 200) {
          getUsersData()
            $q.notify({
              type:"success",
              message: "修改状态成功",
            });

        }
        if (res.status === 404) {
          $q.notify({
            type:"error",
            message: "修改失败",
          });
        }
      })
    };

    //获取普通用户资料
    const users = ref([]);
    const getUsersData = async () => {
      try {
        const response = await api.get(USER_LINK);
        users.value.splice(0, users.value.length, ...response.data.data);
      } catch (err) {
        $q.notify({
          type:"error",
          message: err.message,
        });
      }
    }

    onMounted(() => {
      getUsersData()
    })

    return {
      columns,
      users,
      updateUserStatus,
    }
  }
})
</script>
