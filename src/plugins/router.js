import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsList from '@/views/NewsList'
import Profile from '@/views/Profile'
import TopicsAdmin from '@/views/TopicsAdmin'

Vue.use(VueRouter)

const routes = [
  // { path: '/:action/:target', component: NewsList },
  { path: '/admin/topics', component: TopicsAdmin },
  { path: '/profile', component: Profile },
  { path: '/*', component: NewsList }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
