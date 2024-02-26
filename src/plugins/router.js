import Vue from "vue";
import Profile from "@/views/Profile";
import Briefing from "@/views/Briefing";
import NewsList from "@/views/NewsList";
import VueRouter from "vue-router";
import SearchList from "@/views/SearchList";
import TopicsAdmin from "@/views/TopicsAdmin";

Vue.use(VueRouter);

const routes = [
  // { path: '/:action/:target', component: NewsList },
  { path: "/search", component: SearchList },
  { path: "/admin/topics", component: TopicsAdmin },
  { path: "/briefing", component: Briefing },
  { path: "/profile", component: Profile },
  { path: "/*", component: NewsList },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
