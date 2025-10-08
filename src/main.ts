import { createApp } from 'vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';

import App from './App.vue';
import router from './router';

const vuetify = createVuetify();

createApp(App).use(vuetify).use(router).mount('#app');
