import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import { routes } from "./routes.js";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  const userStore = useUserStore();

  // check if user is authenticated before each route is accessed

  if (to.meta.authForbidden) {
    userStore.isAuthenticated ? next({ name: "Home" }) : next();
  } else if (to.meta.authRequired) {
    // redirect to login page if not
    userStore.isAuthenticated ? next() : next({ name: "Login" });
  } else if (to.meta.isAdmin) {
    // redirect to a special page to show an error if user is not admin
    userStore.isAuthenticated && userStore.isAdmin
      ? next()
      : next({ name: "Restricted" });
  } else {
    next();
  }
});

export default router;
