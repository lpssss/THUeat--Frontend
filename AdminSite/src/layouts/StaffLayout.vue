<template>
  <q-layout view="hHh LpR fFf">
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
          乐吃 - 档口管理系统
        </q-toolbar-title>

        <q-chip>{{ name }}</q-chip>
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
import {useQuasar} from "quasar";


const { getName } = useAppState();
const name = getName();

const linksList = [
  {
    title: '显示面板',
    icon: 'dashboard',
    to: '/staff/'
  },
  {
    title: '评论回复',
    icon: 'question_answer',
    to: '/staff/reviews'
  },
  {
    title: '菜品记录',
    icon: 'restaurant',
    to: '/staff/dishes'
  },
  {
    title: '设置',
    icon: 'settings',
    to: '/staff/settings'
  }
];

export default defineComponent({

  components: {
    EssentialLink
  },

  setup () {
    const $q=useQuasar()
    const leftDrawerOpen = ref(false);
    const { resetState } = useAppState();
    const router = useRouter();
    const logout = () => {
      $q.dialog({
        title: "确认登出",
        message: "您是否确认要登出?",
        ok: { push: true, label: "确认" },
        cancel: { push: true, label: "取消" },
        persistent: true,
      }).onOk(() => {
        resetState();
        router.push('/');
      });
    }
    return {
      name,
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
