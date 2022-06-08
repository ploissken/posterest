import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  install (Vue) {
    Vue.prototype.$dayjs = dayjs
  }
};
