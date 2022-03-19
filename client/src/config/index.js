export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8889";

export const FIREBASE_STORAGE =
  "https://firebasestorage.googleapis.com/v0/b/contest-tracker-87dc8.appspot.com/o";

export const TABLES = {
  USERS: "users",
  CONTESTS: "contests",
  PROJECTS: "projects",
  CURATORS: "curators",
  EVENTS: "events",
  GRADES: "grades",
  ORGANIZATIONS: "organizations",
  STUDENTS: "students",
  TEACHERS: "teachers",
  SUBJECTS: "subjects",
  WINNERS: "winners",
};
