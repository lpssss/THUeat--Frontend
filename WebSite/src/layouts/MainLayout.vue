<template>
  <q-layout view="lHh Lpr lFf">
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
          <q-btn flat to='/' label='主页'/>
        </q-toolbar-title>

        <div>v1.0 
          <q-btn to='/settings' class="flat" label='登陆/注册' />
        </div>
        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          导航栏
        </q-item-label>
        <q-expansion-item
          expand-separator
          icon="face"
          label="学生食堂"
          :content-inset-level="1"
        >
        <EssentialLink
          v-for="link in studentCanteenLists"
          :key="link.title"
          v-bind="link"
        />
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="school"
          label="教工餐厅"
          :content-inset-level="1"
        >
        <EssentialLink
          v-for="link in staffCanteenLists"
          :key="link.title"
          v-bind="link"
        />
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="star_rate"
          label="特色餐厅"
          :content-inset-level="1"
        >
        <EssentialLink
          v-for="link in specialCanteenLists"
          :key="link.title"
          v-bind="link"
        />
        </q-expansion-item>
        
      </q-list>
    </q-drawer>
    
    
    <q-page-container>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </q-page-container>
  </q-layout>
  
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { ref, defineComponent} from 'vue'

const studentCanteens = [
  {
    title: '清芬园',
    //caption: 'quasar.dev',
    icon: 'list',
    link: '/'
  },
  {
    title: '桃李园',
    //caption: 'github.com/quasarframework',
    icon: 'list',
    //link: 'https://github.com/quasarframework'
  },
  {
    title: '紫荆园',
    //caption: 'chat.quasar.dev',
    icon: 'list',
    //link: 'https://chat.quasar.dev'
  },
  {
    title: '查看更多...',
    icon: 'list'
  }
];

const staffCanteens = [
  {
    title: '清芬园三层',
    //caption: 'quasar.dev',
    icon: 'list',
    link: '/'
  },
  {
    title: '澜园',
    //caption: 'github.com/quasarframework',
    icon: 'list',
    //link: 'https://github.com/quasarframework'
  },
  {
    title: '荷园',
    //caption: 'chat.quasar.dev',
    icon: 'list',
    //link: 'https://chat.quasar.dev'
  },
  {
    title: '查看更多...',
    icon: 'list'
  }
];

const specialCanteens = [
  {
    title: '清青快餐',
    //caption: 'quasar.dev',
    icon: 'list',
    link: '/'
  },
  {
    title: '清青休闲餐厅',
    //caption: 'github.com/quasarframework',
    icon: 'list',
    //link: 'https://github.com/quasarframework'
  },
  {
    title: '清青牛拉',
    //caption: 'chat.quasar.dev',
    icon: 'list',
    //link: 'https://chat.quasar.dev'
  },
  {
    title: '查看更多...',
    icon: 'list'
  }
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      studentCanteenLists: studentCanteens,
      staffCanteenLists: staffCanteens,
      specialCanteenLists: specialCanteens,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      slide: ref('first'),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
})
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)


</style>