import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

const isAuthenticated = () => store.getters.isLoggedIn;
const isAdmin = () => store.getters.isAdmin;

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Contest Tracker",
    },
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Login",
      authForbidden: true,
    },
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    meta: {
      title: "Sign Up",
      authForbidden: true,
    },
    component: () => import("@/pages/Signup.vue"),
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: "About",
    },
    component: () => import("@/pages/About.vue"),
  },
  {
    path: "/account",
    name: "Account",
    meta: {
      title: "Account",
      authRequired: true,
    },
    component: () => import("@/pages/Account.vue"),
  },
  {
    path: "/help",
    name: "Help",
    meta: {
      title: "Help",
    },
    component: () => import("@/pages/Help.vue"),
  },
  {
    path: "/events",
    name: "Events",
    meta: {
      title: "Events",
    },
    component: () => import("@/pages/Events.vue"),
  },
  {
    path: "/event/:id",
    name: "Event",
    meta: {
      title: "Event",
    },
    component: () => import("@/pages/Event.vue"),
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    redirect: { name: "DashboardUsers" },
    component: () => import("@/pages/dashboard/Dashboard.vue"),
    children: [
      {
        path: "/dashboard/users",
        name: "DashboardUsers",
        component: () => import("@/pages/dashboard/DashboardUsers.vue"),
        meta: {
          title: "Dashboard - Users",
          isAdmin: true,
        },
      },
    ],
  },
  {
    name: "404",
    path: "/:catchAll(.*)",
    meta: {
      title: "Page not found",
    },
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
  if (to.meta.authForbidden) {
    isAuthenticated() ? next({ name: "Home" }) : next();
  } else if (to.meta.authRequired) {
    isAuthenticated() ? next() : next({ name: "Login" });
  } else if (to.meta.isAdmin) {
    isAuthenticated() && isAdmin() ? next() : next({ name: "404" });
  } else {
    next();
  }
});

export default router;
