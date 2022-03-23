import { TABLES, ROLES } from "~shared/config";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8889";

const FIREBASE_STORAGE =
  "https://firebasestorage.googleapis.com/v0/b/contest-tracker-87dc8.appspot.com/o";

const storeVar = (variable) => `ct_${variable}`;

export { BACKEND_URL, FIREBASE_STORAGE, storeVar, TABLES, ROLES };
