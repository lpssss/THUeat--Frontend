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
          乐吃 - 超级管理员系统
        </q-toolbar-title>

        <q-chip>用户名</q-chip>
        <q-btn color="red">登出</q-btn>
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

const linksList = [
  {
    title: '显示面板',
    icon: 'dashboard',
    to: '/'
  },
  {
    title: '普通管理员记录',
    icon: 'admin_panel_settings',
    to: '/schooladminMaintenance'
  },
  {
    title: '档口记录',
    icon: 'restaurant',
    to: '/stallCreation'
  },
  {
    title: '档主记录',
    icon: 'badge',
    to: '/staffMaintenance'
  },
  {
    title: '普通用户管理',
    icon: 'person',
    to: '/userMaintenance'
  },
  {
    title: '设置',
    icon: 'settings',
    to: '/settings'
  },
];

export default defineComponent({

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
