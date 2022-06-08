import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  // theme: { dark: true },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#F44',
      },
    },
},
});
