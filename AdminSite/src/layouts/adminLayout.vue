<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          乐吃 - 管理员系统
        </q-toolbar-title>

        <q-chip>用户名</q-chip>
        <q-btn
          color="red"
          @click="logout"
        >登出</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          导航 Navigaton
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import useAppState from "src/store/userAppState.js";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: '显示面板',
    icon: 'dashboard',
    to: '/admin'
  },
  {
    title: '档口记录',
    icon: 'restaurant',
    to: '/admin/stallCreation'
  },
  {
    title: '档主记录',
    icon: 'badge',
    to: '/admin/staffMaintenance'
  },
  {
    title: '普通用户管理',
    icon: 'person',
    to: '/admin/userMaintenance'
  },
  {
    title: '设置',
    icon: 'settings',
    to: '/admin/settings'
  }
];

export default defineComponent({

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false);
    const { resetState } = useAppState();
    const router = useRouter();
    const logout = () => {
      resetState();
      router.push('/');
    }
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      logout,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  }
})
</script>
