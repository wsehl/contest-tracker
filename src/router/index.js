import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Main",
        component: () => import("@/pages/Home.vue"),
        meta: {
          title: "Home",
        },
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/Login.vue"),
        meta: {
          title: "Login",
        },
      },
      {
        path: "/signup",
        name: "Signup",
        component: () => import("@/pages/Signup.vue"),
        meta: {
          title: "Sign Up",
        },
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/layouts/DashboardLayout.vue"),
    meta: {
      title: "Dashboard",
    },
    children: [
      {
        path: "/dashboard",
        component: () => import("@/pages/dashboard/Dash.vue"),
      },
      {
        path: "/dashboard/users",
        component: () => import("@/pages/dashboard/Users.vue"),
      },
    ],
    beforeEnter(to, from, next) {
      if (store.getters.isAdmin) {
        next();
      } else {
        next({
          name: "Login",
        });
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/pages/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

// router.beforeEach((to, from, next) => {
//   if (!store.getters.isLoggedIn) {
//     next({
//       path: "/login",
//       query: {
//         redirectFrom: to.fullPath,
//       },
//     });
//   } else {
//     next();
//   }
// });

export default router;
