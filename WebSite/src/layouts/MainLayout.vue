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
            用户名
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
    titleId: "f1",
    title: "教工餐厅",
    titleEng: 2,
    icon: "school",
    secondOrderStatus: true,
  },
  {
    titleId: "f2",
    title: "学生餐厅",
    titleEng: 1,
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
    console.log(loginStatus.value);
    const API_LINK = "users/details";
    const userDetailData = reactive({ data: {} });
    const getUserData = async () => {
      try {
        const response = await api.get(API_LINK);
        userDetailData.data = response.data.data;
      } catch (err) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "获取个人信息失败，请刷新重试",
          timeout: 1000,
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
            resetState();
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
