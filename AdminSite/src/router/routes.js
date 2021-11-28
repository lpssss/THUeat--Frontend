const routes = [
  {
    path: '/superadmin/',
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
    path: '/admin/',
    component: () => import('src/layouts/adminLayout.vue'),
    children: [
      { path: '/admin/', component: () => import('pages/school/schoolDashboard.vue') },
      { path: '/admin/stallCreation', component: () => import('pages/school/stallCreation.vue') },
      { path: '/admin/staffMaintenance', component: () => import('pages/school/staffMaintenance.vue') },
      { path: '/admin/userMaintenance', component: () => import('pages/school/userMaintenance.vue') },
      { path: '/admin/settings', component: () => import('pages/school/settings.vue') }
    ]
  },
  {
    path: '/staff/',
    component: () => import('src/layouts/staffLayout.vue'),
    children: [
      { path: '/staff/', component: () => import('pages/stall/StallDashboard.vue') },
      { path: '/staff/CommentReply', component: () => import('pages/stall/CommentReply.vue') },
      { path: '/staff/DishManagement', component: () => import('pages/stall/DishManagement.vue') },
      // { path: '/staff/settings', component: () => import('pages/stall/Settings.vue') }
    ]
  },
  {
    path: '/login', component: () => import('pages/Login.vue')

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
