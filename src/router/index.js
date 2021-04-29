import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    redirect: { name: "Home" },
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/pages/Home.vue"),
        meta: {
          title: "Contest Tracker",
        },
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/Login.vue"),
        meta: {
          title: "Login",
        },
        beforeEnter(to, from, next) {
          if (store.getters.isLoggedIn) {
            next({ name: "Home" });
          } else {
            next();
          }
        },
      },
      {
        path: "/signup",
        name: "Signup",
        component: () => import("@/pages/Signup.vue"),
        meta: {
          title: "Sign Up",
        },
        beforeEnter(to, from, next) {
          if (store.getters.isLoggedIn) {
            next({ name: "Home" });
          } else {
            next();
          }
        },
      },
      {
        path: "/about",
        name: "About",
        // component: () => import("@/pages/About.vue"),
        meta: {
          title: "About",
        },
      },
      {
        path: "/Archive",
        name: "Archive",
        // component: () => import("@/pages/Archive.vue"),
        meta: {
          title: "Archive",
        },
      },
      {
        path: "/Events",
        name: "Events",
        // component: () => import("@/pages/events.vue"),
        meta: {
          title: "Events",
        },
      },
      {
        path: "/event/:id",
        name: "Event",
        component: () => import("@/pages/Event.vue"),
        meta: {
          title: "Event",
        },
      },
    ],
  },
  {
    path: "/dash",
    name: "Dash",
    redirect: { name: "Dashboard" },
    component: () => import("@/layouts/DashboardLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/pages/dashboard/Dash.vue"),
        meta: {
          title: "Dashboard",
        },
      },
      {
        path: "/dashboard/users",
        component: () => import("@/pages/dashboard/Users.vue"),
        meta: {
          title: "Dashboard - Users",
        },
      },
    ],
    beforeEnter(to, from, next) {
      if (store.getters.isAdmin) {
        next();
      } else {
        next({
          name: "Login",
          query: {
            redirectFrom: to.fullPath,
          },
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

export default router;
