<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn dense flat icon="menu" round @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-btn flat to="/" label="乐吃" id="main-title" />
        </q-toolbar-title>
        <q-space />
        <q-btn
          v-if="!loginStatus"
          color="secondary"
          label="登入"
          @click="loginBtnClick"
        />
        <template v-else>
          <q-chip v-if="Object.keys(userDetailData.data).length">
            <q-avatar>
              <img :src="userDetailData.data.userImage" alt="userAvatar" />
            </q-avatar>
            {{ userDetailData.data.userName }}
          </q-chip>
          <q-btn-dropdown color="primary">
            <q-list>
              <q-item v-close-popup clickable @click="onItemClick">
                <q-item-section>
                  <q-item-label>设置</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-close-popup clickable @click="loginBtnClick">
                <q-item-section>
                  <q-item-label>登出</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered elevated show-if-above>
      <!-- drawer content -->

      <q-list bordered separator>
        <NavbarFirstOrderItem
          v-for="item in firstOrderTitle"
          :key="item.titleId"
          v-bind="item"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import NavbarFirstOrderItem from "components/Layout/NavbarFirstOrderItem";
import { api } from "boot/axios";
import userAppState from "src/store/userAppState";
import { useQuasar } from "quasar";

const firstOrderTitle = [
  {
    titleId: "t1",
    title: "教工餐厅",
    canteenType: 2,
    icon: "school",
    secondOrderStatus: true,
  },
  {
    titleId: "t2",
    title: "学生餐厅",
    canteenType: 1,
    icon: "face",
    secondOrderStatus: true,
  },
];

export default defineComponent({
  name: "MainLayout",
  components: { NavbarFirstOrderItem },
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const { getToken, resetState } = userAppState();
    const loginStatus = computed(() => {
      const token = getToken().value;
      return token !== null;
    });

    const API_LINK = "users/details";
    const userDetailData = reactive({ data: {} });
    const getUserData = async () => {
      try {
        const response = await api.get(API_LINK);
        userDetailData.data = response.data.data;
      } catch (err) {
        $q.notify({
          type:"error",
          message: "获取个人信息失败，请刷新重试",
        });
      }
    };

    function onItemClick() {
      router.push("/setting");
    }
    if (loginStatus.value) getUserData();

    return {
      userDetailData,
      firstOrderTitle,
      loginStatus,
      leftDrawerOpen,
      onItemClick,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      loginBtnClick() {
        if (!loginStatus.value) router.push("/login");
        else {
          $q.dialog({
            title: "确认登出",
            message: "您是否确认要登出?",
            ok: { push: true, label: "确认" },
            cancel: { push: true, label: "取消" },
            persistent: true,
          }).onOk(() => {
            loginStatus.value=false
            resetState();
            $q.notify({
              type:"success",
              message: "登出成功",
            });
            router.push("/");
          });
        }
      },
    };
  },
});
</script>

<style>
#main-title {
  font-weight: bold;
  font-size: medium;
}
</style>
