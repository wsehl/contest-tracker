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
      title: "Вход",
      authForbidden: true,
    },
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    meta: {
      title: "Регистрация",
      authForbidden: true,
    },
    component: () => import("@/pages/Signup.vue"),
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: "О проекте",
    },
    component: () => import("@/pages/About.vue"),
  },
  {
    path: "/account",
    name: "Account",
    meta: {
      title: "Аккаунт",
      authRequired: true,
    },
    component: () => import("@/pages/Account.vue"),
  },
  {
    path: "/help",
    name: "Help",
    meta: {
      title: "Помощь",
    },
    component: () => import("@/pages/Help.vue"),
  },
  {
    path: "/events",
    name: "Events",
    meta: {
      title: "Конкурсы",
    },
    component: () => import("@/pages/Events.vue"),
  },
  {
    path: "/event/:id",
    name: "Event",
    meta: {
      title: "Конкурс",
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
          title: "[CRM] Пользователи",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/organizations",
        name: "DashboardOrganizations",
        component: () => import("@/pages/dashboard/DashboardOrganizations.vue"),
        meta: {
          title: "[CRM] Организации",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/events",
        name: "DashboardEvents",
        component: () => import("@/pages/dashboard/DashboardEvents.vue"),
        meta: {
          title: "[CRM] Конкурсы",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/curators",
        name: "DashboardCurators",
        component: () => import("@/pages/dashboard/DashboardCurators.vue"),
        meta: {
          title: "[CRM] Кураторы",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/grades",
        name: "DashboardGrades",
        component: () => import("@/pages/dashboard/DashboardGrades.vue"),
        meta: {
          title: "[CRM] Классы",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/students",
        name: "DashboardStudents",
        component: () => import("@/pages/dashboard/DashboardStudents.vue"),
        meta: {
          title: "[CRM] Ученики",
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
