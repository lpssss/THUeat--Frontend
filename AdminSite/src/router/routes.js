const routes = [
  {
    path: '/school/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/school/schoolDashboard.vue') },
      { path: '/stallMaintenance', component: () => import('pages/school/stallMaintenance.vue') },
      { path: '/userMaintenance', component: () => import('pages/school/userMaintenance.vue') },
      { path: '/schooladminMaintenance', component: () => import('pages/school/schooladminMaintenance.vue') },
      { path: '/settings', component: () => import('pages/school/settings.vue') }
    ]
  },
  {
    path: '/stall/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/Dashboard', component: () => import('pages/stall/stallDashboard.vue') },
    ]
  },
  {
    path: '/Login', component: () => import('pages/Login.vue')

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
