import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "@/components/views/HomeView.vue";
// import JobResultsView from "@/components/views/JobResultsView.vue";
// import JobView from "@/components/views/JobView.vue";

const HomeView = () => import("@/components/views/HomeView.vue");
const JobResultsView = () =>
  import(
    /* webpackChunkName: "jobs" */ "@/components/views/JobResultsView.vue"
  );
const JobView = () =>
  import(/* webpackChunkName: "jobs" */ "@/components/views/JobView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobResultsView,
  },

  {
    path: "/jobs/results/:id",
    name: "JobListing",
    component: JobView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
