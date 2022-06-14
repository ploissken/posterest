import Vue from 'vue'
import App from './App.vue'
import dayjs from '@/plugins/dayjs'
import router from '@/plugins/router'
import vuetify from '@/plugins/vuetify'

Vue.use(dayjs)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
