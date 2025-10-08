import { createApp } from 'vue';
import 'vuetify/styles/main.css';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import App from './App.vue';
import router from './router';

const vuetify = createVuetify({
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
      variant: 'solo',
      bgColor: 'surface',
      hideDetails: true,
    },
    VBtn: {
      color: 'primary',
      elevation: 0,
    },
  },
});

createApp(App).use(vuetify).use(router).mount('#app');
