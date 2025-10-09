import { createApp } from 'vue';
import 'vuetify/styles/main.css';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import App from './App.vue';
import router from './router';
import { md3 } from 'vuetify/blueprints';

const vuetify = createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        colors: {
          primary: '#223030',
          surface: '#efefe9',
        },
      },
    },
  },
  defaults: {
    VTextField: {
      hideDetails: true,
      rounded: 'lg',
    },
    VBtn: {
      color: 'primary',
      elevation: 0,
      class: 'text-none',
    },
    VAlert: {
      variant: 'tonal',
      rounded: 'lg',
    },
  },
});

createApp(App).use(vuetify).use(router).mount('#app');
