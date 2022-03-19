import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

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
    component: () => import("@/pages/auth/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    meta: {
      title: "Регистрация",
      authForbidden: true,
    },
    component: () => import("@/pages/auth/Register.vue"),
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
    redirect: {
      name: "DashboardEvents",
    },
    component: () => import("@/pages/Dashboard.vue"),
    children: [
      {
        path: "/dashboard/events",
        name: "DashboardEvents",
        component: () => import("@/pages/dashboard/Events.vue"),
        meta: {
          title: "[CRM] Конкурсы",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/projects",
        name: "DashboardProjects",
        component: () => import("@/pages/dashboard/Projects.vue"),
        meta: {
          title: "[CRM] Проекты",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/winners",
        name: "DashboardWinners",
        component: () => import("@/pages/dashboard/Winners.vue"),
        meta: {
          title: "[CRM] Победители",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/users",
        name: "DashboardUsers",
        component: () => import("@/pages/dashboard/Users.vue"),
        meta: {
          title: "[CRM] Пользователи",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/organizations",
        name: "DashboardOrganizations",
        component: () => import("@/pages/dashboard/Organizations.vue"),
        meta: {
          title: "[CRM] Организации",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/curators",
        name: "DashboardCurators",
        component: () => import("@/pages/dashboard/Curators.vue"),
        meta: {
          title: "[CRM] Кураторы",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/grades",
        name: "DashboardGrades",
        component: () => import("@/pages/dashboard/Grades.vue"),
        meta: {
          title: "[CRM] Классы",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/students",
        name: "DashboardStudents",
        component: () => import("@/pages/dashboard/Students.vue"),
        meta: {
          title: "[CRM] Ученики",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/teachers",
        name: "DashboardTeachers",
        component: () => import("@/pages/dashboard/Teachers.vue"),
        meta: {
          title: "[CRM] Учителя",
          isAdmin: true,
        },
      },
      {
        path: "/dashboard/subjects",
        name: "DashboardSubjects",
        component: () => import("@/pages/dashboard/Subjects.vue"),
        meta: {
          title: "[CRM] Предметы",
          isAdmin: true,
        },
      },
    ],
  },
  {
    name: "404",
    path: "/:catchAll(.*)",
    meta: {
      title: "Страница не найдена",
    },
    component: () => import("@/pages/service/404.vue"),
  },
  {
    name: "Restricted",
    path: "/restricted",
    meta: {
      title: "Страница недоступна",
    },
    component: () => import("@/pages/service/Restricted.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  const userStore = useUserStore();

  if (to.meta.authForbidden) {
    userStore.isAuthenticated ? next({ name: "Home" }) : next();
  } else if (to.meta.authRequired) {
    userStore.isAuthenticated ? next() : next({ name: "Login" });
  } else if (to.meta.isAdmin) {
    userStore.isAuthenticated && userStore.isAdmin
      ? next()
      : next({ name: "Restricted" });
  } else {
    next();
  }
});

export default router;
