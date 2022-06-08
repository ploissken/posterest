import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import dayjs from '@/plugins/dayjs'

Vue.use(dayjs)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
