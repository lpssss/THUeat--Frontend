<!-- Pending task: Styling, Button Click routing-->

<template>
  <q-layout view="hHh LpR fFf">

    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn dense flat icon="menu" round @click="toggleLeftDrawer"/>

        <q-toolbar-title id="main-title">
          乐吃
        </q-toolbar-title>
        <q-space/>
        <q-btn v-if="!loginStatus" color="secondary" label="登入" @click="loginBtnClick"/>
        <template v-else>
          <q-chip>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="userAvatar">
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
        <NavbarFirstOrderItem v-for="item in firstOrderTitle" :key="item.titleId" v-bind="item"/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import NavbarFirstOrderItem from "components/Layout/NavbarFirstOrderItem";

const firstOrderTitle = [
  {
    titleId: 'f1',
    title: "教工餐厅",
    titleEng: "teacher-canteen",
    secondOrderStatus: true
  },
  {
    titleId: 'f2',
    title: "学生餐厅",
    titleEng: "student-canteen",
    secondOrderStatus: true
  },
  {
    titleId: 'f3',
    title: "某页面",
    titleEng: "Some page",
    secondOrderStatus: false
  }
]


export default defineComponent({
  name: 'MainLayout',
  components: {NavbarFirstOrderItem},
  setup() {
    const leftDrawerOpen = ref(false)
    const loginStatus = ref(false)

    return {
      firstOrderTitle,
      loginStatus,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      loginBtnClick() {
        loginStatus.value = !loginStatus.value
      }
    }
  }
})
</script>

<style>
#main-title {
  font-weight: bold;
}
</style>
