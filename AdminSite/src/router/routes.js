const routes = [
  {
    path: "/",
    component: () => import("src/layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Login.vue"), alias: "/login" },
      { path: "firstLoginSettings", component: () => import("pages/firstLogin.vue") },

    ],
  },
  {
    path: "/superadmin/",
    component: () => import("src/layouts/superadminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/school/schoolDashboard.vue") },
      {
        path: "schooladminMaintenance",
        component: () => import("pages/school/schooladminMaintenance.vue"),
      },
      {
        path: "stallCreation",
        component: () => import("pages/school/stallCreation.vue"),
      },
      {
        path: "staffMaintenance",
        component: () => import("pages/school/staffMaintenance.vue"),
      },
      {
        path: "userMaintenance",
        component: () => import("pages/school/userMaintenance.vue"),
      },
      {
        path: "settings",
        component: () => import("pages/school/settings.vue"),
      },
    ],
  },
  {
    path: "/admin/",
    component: () => import("src/layouts/adminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/school/schoolDashboard.vue"),
      },
      {
        path: "stallCreation",
        component: () => import("pages/school/stallCreation.vue"),
      },
      {
        path: "staffMaintenance",
        component: () => import("pages/school/staffMaintenance.vue"),
      },
      {
        path: "userMaintenance",
        component: () => import("pages/school/userMaintenance.vue"),
      },
      {
        path: "settings",
        component: () => import("pages/school/settings.vue"),
      },
    ],
  },
  {
    path: "/staff/",
    component: () => import("layouts/StaffLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/stall/StallDashboard.vue"),
      },
      {
        path: "reviews",
        component: () => import("pages/stall/StallReviews.vue"),
      },
      {
        path: "dishes",
        component: () => import("pages/stall/DishManagement.vue"),
      },
      {
        path: "settings",
        component: () => import("pages/stall/StaffSettings.vue"),
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
