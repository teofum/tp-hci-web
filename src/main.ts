import { createApp } from 'vue';
import 'vuetify/styles/main.css';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import App from './App.vue';
import router from './router';
import { md3 } from 'vuetify/blueprints';
import { createPinia } from 'pinia';

const vuetify = createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        colors: {
          primary: '#223030',
          secondary: '#714e4a',
          surface: '#efefe9',
          'surface-variant': '#d8d3cd',
          background: '#ece7df',
          error: '#ef3f3f',
          success: '#479451',
        },
      },
    },
  },
  defaults: {
    VTextField: {
      rounded: 'lg',
    },
    VBtn: {
      color: 'primary',
      elevation: 0,
      class: 'text-none px-4',
      style: { letterSpacing: 0 },
    },
    VAlert: {
      variant: 'tonal',
      rounded: 'lg',
    },
    VCard: {
      rounded: 'xl',
    },
    VSelect: {
      hideDetails: true,
    },
    VSwitch: {
      hideDetails: true,
    },
    VCheckBox: {
      hideDetails: true,
    },
    VList: {
      rounded: 'lg',
    },
    VTooltip: {
      contentClass: 'bg-primary',
    },
    VChip: {
      rounded: 'xl',
    },
  },
});

const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).use(router).mount('#app');
