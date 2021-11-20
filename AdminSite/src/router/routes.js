const routes = [
  {
    path: '/school/',
    component: () => import('src/layouts/superadminLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/school/schoolDashboard.vue') },
      { path: '/schooladminMaintenance', component: () => import('pages/school/schooladminMaintenance.vue') },
      { path: '/stallCreation', component: () => import('pages/school/stallCreation.vue') },
      { path: '/staffMaintenance', component: () => import('pages/school/staffMaintenance.vue') },
      { path: '/userMaintenance', component: () => import('pages/school/userMaintenance.vue') },
      { path: '/settings', component: () => import('pages/school/settings.vue') }
    ]
  },
  {
    path: '/stall',
    component: () => import('src/layouts/superadminLayout.vue'),
    children: [
      { path: '/stall/', component: () => import('pages/stall/stallDashboard.vue') }
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
