import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../views/Setup.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/projects",
    name: "Projects",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Projects.vue"),
  },
  {
    path: "/setup",
    name: "setup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Setup.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


export default router;
