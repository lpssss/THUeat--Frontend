import useAppState from "src/store/userAppState.js";

const { getType, getFirstLogin } = useAppState();
const userType = getType().value;
//const isFirstLogin = getFirstLogin().value;

const routes = [
  {
    path: "/",
    component: () => import("src/layouts/LoginLayout.vue"),
    children: [
      { name: "login", path: "", component: () => import("pages/Login.vue"), alias: "/login" },
      { path: "firstLoginSettings", component: () => import("pages/firstLogin.vue") },

    ],
  },

  {
    path: "/superadmin/",
    component: () => import("src/layouts/superadminLayout.vue"),
    meta: {
      permissions: ['super']
    },
    children: [
      {
        path: "", component: () => import("pages/school/schoolDashboard.vue"),
        meta: {
          permissions: ['super']
        }
      },
      {
        path: "schooladminMaintenance",
        component: () => import("pages/school/schooladminMaintenance.vue"),
        meta: {
          permissions: ['super']
        }
      },
      {
        path: "stallCreation",
        component: () => import("pages/school/stallCreation.vue"),
        meta: {
          permissions: ['super']
        }
      },
      {
        path: "staffMaintenance",
        component: () => import("pages/school/staffMaintenance.vue"),
        meta: {
          permissions: ['super']
        }
      },
      {
        path: "userMaintenance",
        component: () => import("pages/school/userMaintenance.vue"),
        meta: {
          permissions: ['super']
        }
      },
      {
        path: "settings",
        component: () => import("pages/school/settings.vue"),
        meta: {
          permissions: ['super']
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
        component: () => import("pages/school/settings.vue"),
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
        component: () => import("pages/stall/StaffSettings.vue"),
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

// const routes = [
//   {
//     path: "/",
//     component: () => import("src/layouts/LoginLayout.vue"),
//     children: [
//       { path: "", component: () => import("pages/Login.vue"), alias: "/login" },
//       { path: "firstLoginSettings", component: () => import("pages/firstLogin.vue") },

//     ],
//   },

//   {
//     path: "/superadmin/",
//     component: () => import("src/layouts/superadminLayout.vue"),
//     children: [
//       { path: "", component: () => import("pages/school/schoolDashboard.vue") },
//       {
//         path: "schooladminMaintenance",
//         component: () => import("pages/school/schooladminMaintenance.vue"),
//       },
//       {
//         path: "stallCreation",
//         component: () => import("pages/school/stallCreation.vue"),
//       },
//       {
//         path: "staffMaintenance",
//         component: () => import("pages/school/staffMaintenance.vue"),
//       },
//       {
//         path: "userMaintenance",
//         component: () => import("pages/school/userMaintenance.vue"),
//       },
//       {
//         path: "settings",
//         component: () => import("pages/school/settings.vue"),
//       },
//     ],
//   },
//   {
//     path: "/admin/",
//     component: () => import("src/layouts/adminLayout.vue"),
//     children: [
//       {
//         path: "",
//         component: () => import("pages/school/schoolDashboard.vue"),
//       },
//       {
//         path: "stallCreation",
//         component: () => import("pages/school/stallCreation.vue"),
//       },
//       {
//         path: "staffMaintenance",
//         component: () => import("pages/school/staffMaintenance.vue"),
//       },
//       {
//         path: "userMaintenance",
//         component: () => import("pages/school/userMaintenance.vue"),
//       },
//       {
//         path: "settings",
//         component: () => import("pages/school/settings.vue"),
//       },
//     ],
//   },
//   {
//     path: "/staff/",
//     component: () => import("layouts/StaffLayout.vue"),
//     children: [
//       {
//         path: "",
//         component: () => import("pages/stall/StallDashboard.vue"),
//       },
//       {
//         path: "reviews",
//         component: () => import("pages/stall/StallReviews.vue"),
//       },
//       {
//         path: "dishes",
//         component: () => import("pages/stall/DishManagement.vue"),
//       },
//       {
//         path: "settings",
//         component: () => import("pages/stall/StaffSettings.vue"),
//       },
//     ],
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: "/:catchAll(.*)*",
//     component: () => import("pages/Error404.vue"),
//   },
// ];

// export default routes;
