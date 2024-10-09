import Vue from "vue";
import NewsList from "@/views/NewsList";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{ path: "/*", component: NewsList }];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
