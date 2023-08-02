import 'roboto-fontface/css/roboto/roboto-fontface.css';

import { createApp } from 'vue';

import App from './App.vue';
import { i18n, vuetify } from './plugins';

const app = createApp(App);

app.use(vuetify);
app.use(i18n);

app.mount('#app');
