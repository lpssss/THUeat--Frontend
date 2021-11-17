const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { 
        path: "", 
        name: "Home", 
        component: () => import("pages/Index.vue") 
      },
      {
        path: "canteen",
        name: "Canteen",
        component: () => import("pages/PublicCanteen.vue"),
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("pages/Setting.vue"),
      },
      {
        path: "comment",
        name: "Comment",
        component: () => import("pages/Comment.vue"),
      },
      {
        path: "dish",
        name: "Dish",
        component: () => import("pages/Dish.vue"),
      },
      {
        path: "stall",
        name: "Stall",
        component: () => import("pages/Stall.vue"),
      },
      { 
        path: "main", 
        name: "Main", 
        component: () => import("pages/Main.vue") 
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Login.vue"),
        meta: {
          isPublic: true,
        },
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Register.vue"),
        meta: {
          isPublic: true,
        },
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
