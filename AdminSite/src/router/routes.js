const routes = [
  {
    path: "/",
    component: () => import("src/layouts/LoginLayout.vue"),
    children: [
      { name: "login", path: "", component: () => import("pages/Login.vue"), alias: "/login" },
      { name: "firstLoginSettings", path: "firstLoginSettings", component: () => import("pages/firstLogin.vue") },

    ],
  },

  {
    path: "/superadmin/",
    component: () => import("src/layouts/superadminLayout.vue"),
    meta: {
      permissions: ['superadmin']
    },
    children: [
      {
        path: "", component: () => import("pages/school/schoolDashboard.vue"),
        meta: {
          permissions: ['superadmin']
        }
      },
      {
        path: "schooladminMaintenance",
        component: () => import("pages/school/schooladminMaintenance.vue"),
        meta: {
          permissions: ['superadmin']
        }
      },
      {
        path: "stallCreation",
        component: () => import("pages/school/stallCreation.vue"),
        meta: {
          permissions: ['superadmin']
        }
      },
      {
        path: "staffMaintenance",
        component: () => import("pages/school/staffMaintenance.vue"),
        meta: {
          permissions: ['superadmin']
        }
      },
      {
        path: "userMaintenance",
        component: () => import("pages/school/userMaintenance.vue"),
        meta: {
          permissions: ['superadmin']
        }
      },
    ],
  },
  {
    path: "/admin/",
    component: () => import("src/layouts/adminLayout.vue"),
    meta: {
      permissions: ['admin']
    },
    children: [
      {
        path: "",
        component: () => import("pages/school/schoolDashboard.vue"),
        meta: {
          permissions: ['admin']
        }
      },
      {
        path: "stallCreation",
        component: () => import("pages/school/stallCreation.vue"),
        meta: {
          permissions: ['admin']
        }
      },
      {
        path: "staffMaintenance",
        component: () => import("pages/school/staffMaintenance.vue"),
        meta: {
          permissions: ['admin']
        }
      },
      {
        path: "userMaintenance",
        component: () => import("pages/school/userMaintenance.vue"),
        meta: {
          permissions: ['admin']
        }
      },
      {
        path: "settings",
        component: () => import("pages/settings.vue"),
        meta: {
          permissions: ['admin']
        }
      },
    ],
  },
  {
    path: "/staff/",
    component: () => import("layouts/StaffLayout.vue"),
    meta: {
      permissions: ['staff']
    },
    children: [
      {
        path: "",
        component: () => import("pages/stall/StallDashboard.vue"),
        meta: {
          permissions: ['staff']
        }
      },
      {
        path: "reviews",
        component: () => import("pages/stall/StallReviews.vue"),
        meta: {
          permissions: ['staff']
        }
      },
      {
        path: "dishes",
        component: () => import("pages/stall/DishManagement.vue"),
        meta: {
          permissions: ['staff']
        }
      },
      {
        path: "settings",
        component: () => import("pages/settings.vue"),
        meta: {
          permissions: ['staff']
        }
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
